"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("https://formspree.io/f/mvzbbwjo", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-3">🐾</div>
        <p className="text-amber-500 font-semibold text-lg">요청이 접수되었습니다!</p>
        <p className="text-gray-400 text-sm mt-1">확인 후 반영하겠습니다.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white border border-amber-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-lg mx-auto">
      <input type="text" name="name" placeholder="이름" required className={inputClass} />
      <input type="email" name="email" placeholder="이메일" required className={inputClass} />
      <textarea
        name="message"
        placeholder="호텔명, 지역, 1박 가격, 객실 옵션, 예약 링크를 적어주세요"
        rows={5}
        required
        className={inputClass + " resize-none"}
      />
      <button
        type="submit"
        className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 rounded-xl shadow-md transition-colors"
      >
        🐶 요청 보내기
      </button>
    </form>
  );
}
