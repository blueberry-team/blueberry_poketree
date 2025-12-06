"use client";

import Image from "next/image";
import { useState } from "react";
import { sendLetter } from "@/features/my-tree/usecases/sendLetter";
import TrainerIcon from "@/assets/icon/trainerIcon.webp";
import ButtonLetterWrite from "@/assets/images/components/button_letter_write.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { POKEMON_DATA } from "@/features/shared/data/pokemonData";
import SendLetterCompleteModal from "./SendLetterCompleteModal";
import { trackEvent } from "@/features/shared/utils/analytics/analytics";
import { notifySendLetter } from "@/features/shared/utils/discord/discord";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

const MAX_CONTENT_LENGTH = 300;
const MIN_CONTENT_LENGTH = 4;
const MIN_SENDER_NAME_LENGTH = 1;
const MAX_SENDER_NAME_LENGTH = 6;
const MAX_CONTENT_ROWS = 10;

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
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [receivedPokemonId, setReceivedPokemonId] = useState<number | null>(null);

  // 모달 닫기 및 초기화
  const handleClose = () => {
    setSenderName("");
    setContent("");
    setError(null);
    setShowCompleteModal(false);
    setReceivedPokemonId(null);
    onClose();
  };

  // 내용 변경 핸들러 (줄 수 제한)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const lines = newContent.split('\n');

    // 줄 수가 MAX_CONTENT_ROWS를 초과하면 변경하지 않음
    if (lines.length <= MAX_CONTENT_ROWS) {
      setContent(newContent);
    }
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
      // 응답 성공 시 포켓몬 ID 추출 후 완료 모달 표시
      if (response.message === "success" && response.data?.letter_pokemon) {
        const pokemonId = response.data.letter_pokemon;

        setReceivedPokemonId(pokemonId);
        setShowCompleteModal(true);

        // Analytics 이벤트 전송 (포켓몬 정보 포함)
        trackEvent("button_click_send_letter", {
          sender_name: senderName,
          message_content: content,
          message_length: content.length,
          receiver_name: receiverName,
          receiver_id: receiverId,
          pokemon_id: pokemonId,
        });

        notifySendLetter(senderName, content, receiverName, receiverId, pokemonId);
      } else {
        // 포켓몬 정보 없으면 바로 닫기
        handleClose();
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

  // 완료 모달 닫기 핸들러
  const handleCompleteModalClose = () => {
    setShowCompleteModal(false);
    setReceivedPokemonId(null);
    handleClose();
    onSuccess?.();
  };

  // 포켓몬 이미지 가져오기
  const getPokemonImage = () => {
    if (!receivedPokemonId) return POKEMON_DATA[0].imageBase;
    const pokemon = POKEMON_DATA.find(p => p.id === receivedPokemonId);
    return pokemon?.imageBase || POKEMON_DATA[0].imageBase;
  };

  // 완료 모달만 표시
  if (showCompleteModal && receivedPokemonId) {
    return (
      <SendLetterCompleteModal
        isOpen={true}
        onClose={handleCompleteModalClose}
        reveicerName={receiverName}
        receivedPokemon={getPokemonImage()}
      />
    );
  }

  if (!isModalOpen) return null;

  // 버튼 활성화 여부 체크
  const isButtonDisabled =
    isLoading ||
    senderName.trim().length < MIN_SENDER_NAME_LENGTH ||
    senderName.trim().length > MAX_SENDER_NAME_LENGTH ||
    content.trim().length < MIN_CONTENT_LENGTH ||
    content.trim().length > MAX_CONTENT_LENGTH;

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={handleClose}
      contentClassName="bg-black"
    >
          <div className="flex flex-col">
            {/* 헤더 */}
            <h1 className="text-white text-lg font-bold text-center mb-4 whitespace-pre-line">
              {translate("sendLetter.title").replace("{name}", receiverName)}
            </h1>

            {/* 작성자 닉네임 */}
            <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={TrainerIcon}
                alt="트레이너"
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="text-white text-sm font-bold">{translate("sendLetter.senderName")}</span>
            </div>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={translate("sendLetter.senderPlaceholder")}
              className="w-full px-3 py-2 rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-white"
              maxLength={MAX_SENDER_NAME_LENGTH}
              disabled={isLoading}
            />
            <div className="text-right mt-2">
              <span className="text-white text-sm">
                {translate("sendLetter.charCount")
                  .replace("{current}", senderName.length.toString())
                  .replace("{max}", MAX_SENDER_NAME_LENGTH.toString())}
              </span>
            </div>
          </div>

          {/* 메세지 내용 */}
          <div className="mb-4">
            <h3 className="text-white text-sm font-bold mb-2">{translate("sendLetter.content")}</h3>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder={translate("sendLetter.contentPlaceholder")}
              className="w-full px-3 py-2 rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-white resize-none min-h-[150px]"
              maxLength={MAX_CONTENT_LENGTH}
              rows={MAX_CONTENT_ROWS}
              disabled={isLoading}
            />
            <div className="text-right mt-1">
              <span className="text-white text-xs">
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
              src={ButtonLetterWrite}
              alt="메세지 보내기"
              height={60.84}
              className={`w-full h-auto ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-black font-bold text-center text-lg">
                {isLoading ? translate("sendLetter.sending") : translate("sendLetter.sendButton")}
              </span>
            </div>
          </div>
          </div>
    </BaseModal>
  );
}
