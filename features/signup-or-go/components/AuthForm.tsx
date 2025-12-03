"use client";

import { useState } from "react";
import Image from "next/image";
import { SignupOrGoRequest } from "../models/req/SignupOrGoRequest";
import DoctorOhImage from "@/assets/images/signuporgo/doctor_oh.png";
import ButtonBigBlue from "@/assets/images/components/button_big_blue.png";
import PixelInputField from "@/assets/images/signuporgo/pixel_inputfield.svg";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { trackEvent } from "@/features/shared/utils/analytics/analytics";

const MIN_NICKNAME_LENGTH = 2;
const MAX_NICKNAME_LENGTH = 6;
const PASSWORD_LENGTH = 4;

interface AuthFormProps {
  onSubmit: (req: SignupOrGoRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function AuthForm({ onSubmit, isLoading, error }: AuthFormProps) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const { translate } = useTranslation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Analytics 이벤트 전송
    trackEvent("button_click_auth_submit", {
      tree_name: nickname,
      tree_name_length: nickname.length,
    });

    await onSubmit({ nickname, password });
  };

  // 버튼 활성화 여부 체크
  const isButtonDisabled =
    isLoading ||
    nickname.trim().length < MIN_NICKNAME_LENGTH ||
    nickname.trim().length > MAX_NICKNAME_LENGTH ||
    password.length !== PASSWORD_LENGTH;

  return (
    <div className="flex-1 bg-[#F7F7F7] flex flex-col items-center px-[94px]">
      {/* Doctor Oh 이미지 */}
      <div className="mt-[53px] mb-16">
        <Image
          src={DoctorOhImage}
          alt="Doctor Oh"
          width={122}
          className="object-contain"
        />
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        {/* 아이디 입력 */}
        <div className="mb-[15px]">
          <p className="text-black text-base font-bold mb-2 text-center">
            {translate("auth.yourTree")}
          </p>
          <div className="relative w-full">
            <Image
              src={PixelInputField}
              alt="input field"
              width={202}
              height={49}
              className="w-full h-[49px]"
            />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder=""
              maxLength={MAX_NICKNAME_LENGTH}
              className="absolute top-0 left-0 w-full h-[49px] bg-transparent border-none text-black text-center text-base font-normal outline-none px-4"
            />
          </div>
          <div className="text-center mt-1">
            <span className="text-gray-600 text-xs">
              {translate("auth.charCount")
                .replace("{current}", nickname.length.toString())
                .replace("{max}", MAX_NICKNAME_LENGTH.toString())}
            </span>
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-[26px]">
          <p className="text-black text-base font-bold mb-2 text-center">
            {translate("auth.password")}
          </p>
          <div className="relative w-full">
            <Image
              src={PixelInputField}
              alt="input field"
              width={202}
              height={49}
              className="w-full h-[49px]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              maxLength={PASSWORD_LENGTH}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="new-password"
              className="absolute top-0 left-0 w-full h-[49px] bg-transparent border-none text-black text-center text-base font-normal outline-none px-4"
            />
          </div>
          <div className="text-center mt-1">
            <span className="text-gray-600 text-xs">
              {translate("auth.passwordLength")
                .replace("{current}", password.length.toString())
                .replace("{max}", PASSWORD_LENGTH.toString())}
            </span>
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
          disabled={isButtonDisabled}
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
            {isLoading ? "로딩중 .." : translate("auth.confirmInput")}
          </span>
        </button>
      </form>
    </div>
  );
}

