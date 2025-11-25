"use client";

import { useState } from "react";
import Image from "next/image";
import { SignupOrGoRequest } from "../models/req/SignupOrGoRequest";
import DoctorOhImage from "@/assets/images/doctor_oh.png";
import ButtonBigBlue from "@/assets/images/button_big_blue.png";

interface AuthFormProps {
  onSubmit: (req: SignupOrGoRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function AuthForm({ onSubmit, isLoading, error }: AuthFormProps) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ nickname, password });
  };

  // 픽셀 아트 스타일 입력 필드 SVG
  const InputFieldSVG = () => (
    <svg width="100%" height="49" viewBox="0 0 202 49" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M6.07815 0H195.261V3.03907H6.07815V0Z" fill="black"/>
      <path d="M3.03907 3.03907H6.07815V6.07815H3.03907V3.03907Z" fill="black"/>
      <path d="M195.261 3.03907H198.3V6.07815H195.261V3.03907Z" fill="black"/>
      <path d="M3.03907 42.5471H6.07815V45.5861H3.03907V42.5471Z" fill="black"/>
      <path d="M195.261 42.5471H198.3V45.5861H195.261V42.5471Z" fill="black"/>
      <path d="M6.07815 45.5861H195.261V48.6252H6.07815V45.5861Z" fill="black"/>
      <path d="M0 6.07815H3.03907V42.5471H0V6.07815Z" fill="black"/>
      <path d="M198.3 6.07815H201.339V42.5471H198.3V6.07815Z" fill="black"/>
      <rect x="13.1563" y="36.4689" width="22.7931" height="3.03907" fill="black"/>
    </svg>
  );

  return (
    <div className="flex-1 bg-[#F7F7F7] flex flex-col items-center px-[94px]">
      {/* Doctor Oh 이미지 */}
      <div className="mt-[115px] mb-[64px]">
        <Image
          src={DoctorOhImage}
          alt="Doctor Oh"
          width={90}
          height={120}
          className="object-contain"
        />
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        {/* 아이디 입력 */}
        <div className="mb-[15px]">
          <p className="text-black text-base font-bold mb-2 text-center">
            당신의 트리 이름은?
          </p>
          <div className="relative w-full">
            <InputFieldSVG />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder=""
              className="absolute top-0 left-0 w-full h-[49px] bg-transparent border-none text-black text-center text-base font-normal outline-none px-4"
            />
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-[26px]">
          <p className="text-black text-base font-bold mb-2 text-center">
            비밀번호 (4자리)
          </p>
          <div className="relative w-full">
            <InputFieldSVG />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="absolute top-0 left-0 w-full h-[49px] bg-transparent border-none text-black text-center text-base font-normal outline-none px-4"
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
            <p className="text-red-700 text-sm text-center">{error}</p>
          </div>
        )}

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full disabled:opacity-50"
        >
          <Image
            src={ButtonBigBlue}
            alt="button background"
            width={201}
            height={70}
            className="w-full h-[70px]"
          />
          <span className="absolute inset-0 flex items-center justify-center text-black text-2xl font-bold">
            {isLoading ? "로딩중..." : "입력 완료"}
          </span>
        </button>
      </form>
    </div>
  );
}

