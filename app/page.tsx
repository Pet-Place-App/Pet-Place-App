import { supabase } from "@/lib/supabase";
import MapPage from "./map/MapPage";

export const revalidate = 0;

export default async function Home() {
  const { data: places } = await supabase
    .from("places")
    .select("*");

  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  return <MapPage places={places ?? []} naverClientId={clientId ?? ""} />;
}
