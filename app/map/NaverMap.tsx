"use client";

import { useEffect, useRef } from "react";

type Place = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  hours: string;
  price_info: string;
};

type Props = {
  places: Place[];
  activeCategory: string;
};

const CATEGORY_COLOR: Record<string, string> = {
  hospital: "#EF4444",
  hotel: "#3B82F6",
  cafe: "#22C55E",
  park: "#EAB308",
};

const CATEGORY_LABEL: Record<string, string> = {
  hospital: "병원",
  hotel: "호텔",
  cafe: "카페",
  park: "산책",
};

export default function NaverMap({ places, activeCategory }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.9780),
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
    });
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    if (infoWindowRef.current) infoWindowRef.current.close();

    const filtered = activeCategory === "all"
      ? places
      : places.filter((p) => p.category === activeCategory);

    filtered.forEach((place) => {
      const color = CATEGORY_COLOR[place.category] ?? "#6B7280";
      const label = CATEGORY_LABEL[place.category] ?? place.category;

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(place.lat, place.lng),
        map: mapInstanceRef.current!,
        icon: {
          content: `
            <div style="
              background:${color};
              color:white;
              font-size:11px;
              font-weight:bold;
              padding:4px 8px;
              border-radius:20px;
              white-space:nowrap;
              box-shadow:0 2px 6px rgba(0,0,0,0.3);
              border:2px solid white;
            ">${label}</div>
          `,
          anchor: new naver.maps.Point(20, 16),
        },
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="
            padding:10px 14px;
            font-family:sans-serif;
            min-width:160px;
          ">
            <div style="font-weight:bold;font-size:14px;margin-bottom:4px;">${place.name}</div>
            <div style="font-size:12px;color:#666;margin-bottom:2px;">${place.address ?? ""}</div>
            <div style="font-size:12px;color:#666;margin-bottom:2px;">${place.hours ?? ""}</div>
            <div style="font-size:12px;color:#f59e0b;font-weight:600;">${place.price_info ?? ""}</div>
          </div>
        `,
        borderWidth: 0,
        backgroundColor: "white",
        anchorSize: new naver.maps.Size(10, 10),
      });

      marker.addListener("click", () => {
        if (infoWindowRef.current) infoWindowRef.current.close();
        infoWindow.open(mapInstanceRef.current!, marker);
        infoWindowRef.current = infoWindow;
      });

      markersRef.current.push(marker);
    });
  }, [places, activeCategory]);

  return <div ref={mapRef} className="w-full h-full" />;
}
