"use client";

import { useState } from "react";
import Image from "next/image";
import HumanIcon from "@/assets/icon/humanIcon.svg";
import LockIcon from "@/assets/icon/lockIcon.svg";
import { SignupOrGoRequest } from "../models/req/SignupOrGoRequest";

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

  return (
    <div className="flex-1 bg-[#E7E9EB] flex flex-col items-center">
      {/* 메인 타이틀 */}
      <div className="mt-[95px] flex flex-col items-center">
        <h1 className="text-black text-xl font-normal mb-2.5">PokeTree</h1>
        <p className="text-black text-xs font-normal">
          간단 로그인 후 나만의 포켓트리를꾸며보세요!
        </p>
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="mt-9 w-full px-10">
        {/* 아이디 입력 */}
        <div className="relative mb-5">
          <div className="w-full h-[43px] bg-white rounded border-none flex items-center px-[13px]">
            {/* 사용자 아이콘 */}
            <Image src={HumanIcon} alt="사용자" width={13} height={13} className="mr-3" />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="아이디"
              className="flex-1 bg-transparent border-none outline-none text-[#828282] text-base font-normal placeholder:text-[#828282]"
            />
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className="relative mb-5">
          <div className="w-full h-[43px] bg-white rounded border-none flex items-center px-[13px]">
            {/* 잠금 아이콘 */}
            <Image src={LockIcon} alt="비밀번호" width={12} height={16} className="mr-3" />
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호(네글자 이상)"
              className="flex-1 bg-transparent border-none outline-none text-[#828282] text-base font-normal placeholder:text-[#828282]"
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#FF7373] rounded-lg flex items-center justify-center mb-3 disabled:opacity-50"
        >
          <span className="text-white text-2xl font-normal">
            {isLoading ? "로딩중..." : "로그인"}
          </span>
        </button>
        
        {/* 에러 메시지 */}
        {error && (
          <div className="mb-3 p-3 bg-red-100 border border-red-400 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

