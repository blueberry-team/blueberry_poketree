"use client";

import { useState } from "react";
import Image from "next/image";
import { SignupOrGoRequest } from "../models/req/SignupOrGoRequest";
import DoctorOhImage from "@/assets/images/signuporgo/doctor_oh.webp";
import ButtonBigBlue from "@/assets/images/components/button_big_blue.webp";
import PixelInputField from "@/assets/images/signuporgo/pixel_inputfield.svg";
import MonsterBallBasic from "@/assets/images/components/monster_ball_basic.png";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { trackEvent } from "@/features/shared/utils/analytics/analytics";

const MIN_NICKNAME_LENGTH = 2;
const MAX_NICKNAME_LENGTH = 6;
const PASSWORD_LENGTH = 4;

interface AuthFormProps {
  onSubmit: (req: SignupOrGoRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  title?: string;
  isLogin?: boolean;
}

export function AuthForm({ onSubmit, isLoading, error, title }: AuthFormProps) {
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
    <div className="flex-1 bg-[#F7F7F7] flex flex-col">
      {/* 좌상단 타이틀 */}
      {title && (
        <div className="w-full text-left mt-4 px-4">
          <span className="text-black text-base font-extrabold">{title}</span>
        </div>
      )}
      <div className="flex flex-col items-center px-8 sm:px-[94px] bg-center justify-center flex-1">
      {/* Doctor Oh 이미지 */}
      <div className={title ? "mt-[15px] mb-8" : "mt-[25px] mb-8"}>
        <Image
          src={DoctorOhImage}
          alt="Doctor Oh"
          width={88}
          className="object-contain"
        />
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        {/* 아이디 입력 */}
        <div className="mb-[15px]">
          <p className="text-black text-base font-extrabold mb-2 text-center">
            {translate("auth.yourTree")}
          </p>
          <div className="relative w-full">
            <Image
              src={PixelInputField}
              alt="input field"
              width={202}
              height={49}
              className="w-full h-[42px] sm:h-[49px]"
            />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder=""
              maxLength={MAX_NICKNAME_LENGTH}
              className="absolute top-0 left-0 w-full h-[42px] sm:h-[49px] bg-transparent border-none text-transparent text-center text-base font-extrabold outline-none px-4 caret-black"
            />
            <div className="absolute top-0 left-0 w-full h-[42px] sm:h-[49px] flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="text-black text-base font-extrabold text-center">{nickname}</span>
            </div>
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
          <p className="text-black text-base font-extrabold mb-2 text-center">
            {translate("auth.password")}
          </p>
          <div className="relative w-full">
            <Image
              src={PixelInputField}
              alt="input field"
              width={202}
              height={49}
              className="w-full h-[42px] sm:h-[49px]"
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
          <p className="text-red-500 text-sm font-bold text-center mb-2">{error}</p>
        )}

        {/* 입력 버튼 */}
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="relative w-[208px] mx-auto disabled:opacity-50"
        >
          <Image
            src={ButtonBigBlue}
            alt="button background"
            width={201}
            height={70}
            className="w-full h-[60px] sm:h-[70px]"
          />
          <span className="absolute inset-0 flex items-center justify-center text-black text-2xl font-extrabold">
            {isLoading ? "로딩중 .." : translate("auth.confirmInput")}
          </span>
        </button>

        {/* 설명 문구 */}
        <div className="mt-4 flex flex-col gap-2 w-[208px] mx-auto">
          <div className="flex items-start gap-2">
            <Image src={MonsterBallBasic} alt="" width={14} height={14} className="shrink-0 mt-0.5" />
            <span className="text-black text-[14px] font-bold">회원가입·로그인 화면은 동일해요!</span>
          </div>
          <div className="flex items-start gap-2">
            <Image src={MonsterBallBasic} alt="" width={14} height={14} className="shrink-0 mt-0.5" />
            <span className="text-black text-[14px] font-bold">트리는 2~6글자, 비밀번호는 숫자 4자리로 설정해주세요!</span>
          </div>
          <div className="flex items-start gap-2">
            <Image src={MonsterBallBasic} alt="" width={14} height={14} className="shrink-0 mt-0.5" />
            <span className="text-black text-[14px] font-bold">처음 설정한 트리 이름은 이후 변경할 수 없으니 신중히 입력해주세요!</span>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

