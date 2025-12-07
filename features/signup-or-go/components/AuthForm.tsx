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
    <div className="flex-1 flex flex-col bg-[#F7F7F7] min-h-0">
      {/* 메인 콘텐츠 영역 */}
      <div className="w-full bg-[#F9F9F9] flex flex-col items-center pt-[2vh] pb-[10vh] flex-1 justify-center min-h-[calc(100vh-70px)]">
      {title && (
        <div className="w-full text-left px-4">
          <span className="text-black text-base font-extrabold">{title}</span>
        </div>
      )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col pt-[4vh] items-center">
          {/* Doctor Oh 이미지 */}
          <div className="mb-[4vh]">
            <Image
              src={DoctorOhImage}
              alt="Doctor Oh"
              width={0}
              height={0}
              className="w-[23vw] h-auto max-w-[90px] object-contain"
            />
          </div>

          {/* 당신의 트리이름은? */}
          <p className="text-black text-base font-extrabold mb-2 text-center">
            {translate("auth.yourTree")}
          </p>

          {/* 닉네임 입력 필드 */}
          <div className="relative mb-[3vh]">
            <Image
              src={PixelInputField}
              alt="input field"
              className="w-[51vw] h-auto max-w-[200px]"
            />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder=""
              maxLength={MAX_NICKNAME_LENGTH}
              className="absolute inset-0 w-full h-full bg-transparent px-[4vw] text-center text-black font-extrabold focus:outline-none"
            />
          </div>

          {/* 비밀번호 (4자리) */}
          <p className="text-black text-base font-extrabold mb-2 text-center">
            {translate("auth.password")}
          </p>

          {/* 비밀번호 입력 필드 */}
          <div className="relative mb-[3vh]">
            <Image
              src={PixelInputField}
              alt="input field"
              width={0}
              height={0}
              className="w-[51vw] h-auto max-w-[200px]"
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
              className="absolute inset-0 w-full h-full bg-transparent px-[4vw] text-center text-black font-extrabold focus:outline-none"
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className="text-red-500 text-sm font-bold mb-[2vh]">{error}</p>
          )}

          {/* 제출버튼 */}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="relative disabled:opacity-50 my-[2vh]"
          >
            <Image
              src={ButtonBigBlue}
              alt="button background"
              className="w-[51.5vw] h-auto max-w-[201px]"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-black font-extrabold text-2xl">
              {isLoading ? translate("auth.loading") : translate("auth.confirmInput")}
            </span>
          </button>

          {/* 설명 3개 */}
            <div className="mt-4 mb-6 flex flex-col gap-2 w-[208px] mx-auto">
            <div className="flex items-start gap-2">
                <Image src={MonsterBallBasic} alt="" width={14} height={14} className="shrink-0 mt-0.5" />
                <span className="text-black text-[14px] font-bold">{translate("auth.sameScreen")}</span>
            </div>
            <div className="flex items-start gap-2">
                <Image src={MonsterBallBasic} alt="" width={14} height={14} className="shrink-0 mt-0.5" />
                <span className="text-black text-[14px] font-bold">{translate("auth.treePasswordRule")}</span>
            </div>
            <div className="flex items-start gap-2">
                <Image src={MonsterBallBasic} alt="" width={14} height={14} className="shrink-0 mt-0.5" />
                <span className="text-black text-[14px] font-bold">{translate("auth.treeNameWarning")}</span>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
}

