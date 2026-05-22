import Script from "next/script";
import { supabase } from "@/lib/supabase";
import MapPage from "./map/MapPage";

export default async function Home() {
  const { data: places } = await supabase
    .from("places")
    .select("*");

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="beforeInteractive"
      />
      <MapPage places={places ?? []} />
    </>
  );
}
