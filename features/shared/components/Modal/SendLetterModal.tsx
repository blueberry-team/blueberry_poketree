"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { sendLetter } from "@/features/my-tree/usecases/sendLetter";
import CloseIcon from "@/assets/icon/closeIcon.png";

const MAX_CONTENT_LENGTH = 300;

/**
 * SendLetterModal - 편지 작성 모달
 * - 방문자가 트리 주인에게 편지를 보낼 때 사용
 */

interface SendLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId: string;
}

export default function SendLetterModal({
  isOpen,
  onClose,
  receiverId,
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
        content,
        receiver_id: receiverId,
      });

      if (response.message === "success") {
        alert("편지가 성공적으로 전송되었습니다!");
        handleClose();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("편지 전송에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const remainingChars = MAX_CONTENT_LENGTH - content.length;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[340px] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-black">
            {translate("visitor.send")}
          </h2>
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Image
              src={CloseIcon}
              alt="닫기"
              width={20}
              height={20}
              className="object-contain"
            />
          </button>
        </div>

        {/* 발신자 이름 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-black mb-2">
            보내는 사람
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF7373]"
            disabled={isLoading}
          />
        </div>

        {/* 편지 내용 입력 */}
        <div className="mb-2">
          <label className="block text-sm font-bold text-black mb-2">
            편지 내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="편지 내용을 입력하세요 (최대 300자)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF7373] resize-none"
            rows={8}
            maxLength={MAX_CONTENT_LENGTH}
            disabled={isLoading}
          />
          <div className="text-right mt-1">
            <span
              className={`text-xs ${
                remainingChars < 0 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {content.length} / {MAX_CONTENT_LENGTH}자
            </span>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 py-3 bg-gray-300 text-black rounded-lg font-bold hover:bg-gray-400"
            disabled={isLoading}
          >
            {translate("common.cancel")}
          </button>
          <button
            onClick={handleSend}
            className="flex-1 py-3 bg-[#FF7373] text-white rounded-lg font-bold hover:bg-[#ff5555] disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={isLoading || !senderName.trim() || !content.trim()}
          >
            {isLoading ? "전송 중..." : translate("visitor.send")}
          </button>
        </div>
      </div>
    </div>
  );
}
