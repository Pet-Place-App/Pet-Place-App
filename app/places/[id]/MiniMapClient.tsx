"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type Props = { lat: number; lng: number; name: string };

export default function MiniMapClient({ lat, lng, name }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? "";

  const initMap = () => {
    if (!mapRef.current || !(window as any).naver) return;

    const position = new (window as any).naver.maps.LatLng(lat, lng);
    const map = new (window as any).naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 15,
      zoomControl: false,
      scaleControl: false,
      mapDataControl: false,
    });

    new (window as any).naver.maps.Marker({
      position,
      map,
      icon: {
        content: `<div style="background:#F97316;color:white;font-size:11px;font-weight:bold;padding:5px 10px;border-radius:20px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white;">${name}</div>`,
        anchor: new (window as any).naver.maps.Point(30, 16),
      },
    });
  };

  useEffect(() => {
    if ((window as any).naver) initMap();
  }, [lat, lng]);

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <div ref={mapRef} style={{ width: "100%", height: "200px" }} />
    </>
  );
}
