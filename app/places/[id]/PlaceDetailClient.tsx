"use client";

import { useState } from "react";

export default function PlaceDetailClient({ placeId }: { placeId: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center transition-all hover:scale-110"
    >
      <span className={`text-[20px] ${liked ? "text-red-500" : "text-gray-300"}`}>
        {liked ? "♥" : "♡"}
      </span>
    </button>
  );
}
