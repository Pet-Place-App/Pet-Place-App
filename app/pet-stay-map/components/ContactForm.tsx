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
      <p className="text-center text-green-400 py-8">
        요청이 접수되었습니다. 확인 후 반영하겠습니다.
      </p>
    );
  }

  const inputClass =
    "w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder:text-gray-500";

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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
      >
        요청 보내기
      </button>
    </form>
  );
}
