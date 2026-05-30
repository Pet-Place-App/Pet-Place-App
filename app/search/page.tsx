import { supabase } from "@/lib/supabase";
import SearchClient from "./SearchClient";

export const revalidate = 0;

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const { data: places } = await supabase.from("places").select("*").order("name");
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? "";

  return (
    <SearchClient
      places={places ?? []}
      naverClientId={clientId}
      initialQuery={params.q ?? ""}
      initialCategory={params.category ?? "all"}
    />
  );
}
