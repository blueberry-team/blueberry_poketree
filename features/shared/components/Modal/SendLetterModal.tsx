"use client";

import Image from "next/image";
import { useState } from "react";
import { sendLetter } from "@/features/my-tree/usecases/sendLetter";
import CloseIcon from "@/assets/icon/closeIcon.png";
import TrainerIcon from "@/assets/icon/trainerIcon.png";
import ButtonLargeGreen from "@/assets/images/components/button_large_green.png";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

const MAX_CONTENT_LENGTH = 300;
const MIN_CONTENT_LENGTH = 4;
const MIN_SENDER_NAME_LENGTH = 1;
const MAX_SENDER_NAME_LENGTH = 6;

/**
 * SendLetterModal - 편지 작성 모달
 * - 방문자가 트리 주인에게 편지를 보낼 때 사용
 */

interface SendLetterModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  receiverId: string;
  receiverName: string;
  onSuccess?: () => void;
}

export default function SendLetterModal({
  isModalOpen,
  onClose,
  receiverId,
  receiverName,
  onSuccess,
}: SendLetterModalProps) {
  const { translate } = useTranslation();
  const [senderName, setSenderName] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 모달 닫기 및 초기화
  const handleClose = () => {
    setSenderName("");
    setContent("");
    setError(null);
    onClose();
  };

  // 편지 보내기
  const handleSend = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await sendLetter({
        sender_name: senderName,
        content: content,
        receiver_id: receiverId,
      });

      if (response.message === "success") {
        alert(translate("sendLetter.sendSuccess"));
        handleClose();
        // 메세지 전송 성공 후 트리 데이터 새로고침
        onSuccess?.();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(translate("sendLetter.sendError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  // 버튼 활성화 여부 체크
  const isButtonDisabled =
    isLoading ||
    senderName.trim().length < MIN_SENDER_NAME_LENGTH ||
    senderName.trim().length > MAX_SENDER_NAME_LENGTH ||
    content.trim().length < MIN_CONTENT_LENGTH ||
    content.trim().length > MAX_CONTENT_LENGTH;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-4"
      onClick={handleClose}
    >
      {/* 모달 컨테이너 */}
      <div className="relative">
        {/* 닫기 버튼 - 모달 바깥 우측 상단 */}
        <button
          onClick={handleClose}
          className="absolute bottom-[calc(100%+15px)] right-0 w-8 h-8 bg-black rounded flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-10"
          aria-label="닫기"
        >
          <Image
            src={CloseIcon}
            alt="닫기"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>

        <div
          className="bg-black rounded-2xl w-full max-w-[800px] p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <h1 className="text-white text-2xl font-bold text-center mb-6 whitespace-pre-line">
            {translate("sendLetter.title").replace("{name}", receiverName)}
          </h1>

          {/* 작성자 닉네임 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={TrainerIcon}
                alt="트레이너"
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-white font-bold">{translate("sendLetter.senderName")}</span>
            </div>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={translate("sendLetter.senderPlaceholder")}
              className="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
              disabled={isLoading}
            />
          </div>

          {/* 메세지 내용 */}
          <div className="mb-6">
            <h3 className="text-white font-bold mb-3">{translate("sendLetter.content")}</h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={translate("sendLetter.contentPlaceholder")}
              className="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-white resize-none min-h-[300px]"
              maxLength={MAX_CONTENT_LENGTH}
              disabled={isLoading}
            />
            <div className="text-right mt-2">
              <span className="text-white text-sm">
                {translate("sendLetter.charCount")
                  .replace("{current}", content.length.toString())
                  .replace("{max}", MAX_CONTENT_LENGTH.toString())}
              </span>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* 메세지 보내기 버튼 */}
          <div
            className="relative cursor-pointer"
            onClick={isButtonDisabled ? undefined : handleSend}
          >
            <Image
              src={ButtonLargeGreen}
              alt="메세지 보내기"
              width={218}
              height={60.84}
              className={`w-full h-auto ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-black font-bold text-center text-lg">
                {isLoading ? translate("sendLetter.sending") : translate("sendLetter.sendButton")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
