import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const KAKAO_KEY = process.env.KAKAO_REST_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const SEARCHES = [
  { query: "서울 동물병원", category: "hospital" },
  { query: "서울 펫호텔", category: "hotel" },
  { query: "서울 반려동물 호텔", category: "hotel" },
  { query: "서울 애견카페", category: "cafe" },
  { query: "서울 펫카페", category: "cafe" },
  { query: "서울 애견 산책 공원", category: "park" },
  { query: "서울 반려동물 공원", category: "park" },
];

async function searchKakao(query, category) {
  const results = [];

  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=15&page=${page}`,
      { headers: { Authorization: `KakaoAK ${KAKAO_KEY}` } }
    );
    const data = await res.json();

    if (!data.documents || data.documents.length === 0) break;

    for (const doc of data.documents) {
      const lat = parseFloat(doc.y);
      const lng = parseFloat(doc.x);
      if (!lat || !lng) continue;

      results.push({
        name: doc.place_name,
        category,
        lat,
        lng,
        address: doc.road_address_name || doc.address_name || "",
        phone: doc.phone || "",
        hours: "",
        price_info: "",
      });
    }

    if (data.meta && data.meta.is_end) break;
    await new Promise((r) => setTimeout(r, 300));
  }

  return results;
}

async function insertToSupabase(places) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/places`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": "resolution=ignore-duplicates",
    },
    body: JSON.stringify(places),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase 오류: ${err}`);
  }
}

async function main() {
  console.log("카카오 로컬 API로 장소 수집 시작...\n");

  const allPlaces = [];
  const seen = new Set();

  for (const { query, category } of SEARCHES) {
    console.log(`검색 중: ${query}`);
    const places = await searchKakao(query, category);

    for (const p of places) {
      const key = `${p.name}|${p.lat}|${p.lng}`;
      if (!seen.has(key)) {
        seen.add(key);
        allPlaces.push(p);
      }
    }

    console.log(`  → ${places.length}개 수집 (누적: ${allPlaces.length}개)`);
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n총 ${allPlaces.length}개 장소 수집 완료`);
  console.log("Supabase에 삽입 중...");

  const chunkSize = 50;
  for (let i = 0; i < allPlaces.length; i += chunkSize) {
    const chunk = allPlaces.slice(i, i + chunkSize);
    await insertToSupabase(chunk);
    console.log(`  ${i + chunk.length}/${allPlaces.length} 삽입 완료`);
  }

  console.log("\n완료!");
}

main().catch(console.error);
