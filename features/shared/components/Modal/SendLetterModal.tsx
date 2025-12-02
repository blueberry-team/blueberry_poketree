"use client";

import Image from "next/image";
import { useState } from "react";
import { sendLetter } from "@/features/my-tree/usecases/sendLetter";
import CloseIcon from "@/assets/icon/closeIcon.png";
import TrainerIcon from "@/assets/icon/trainerIcon.png";
import ButtonLetterWrite from "@/assets/images/components/button_letter_write.png";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { POKEMON_DATA } from "@/features/shared/data/pokemonData";
import SendLetterCompleteModal from "./SendLetterCompleteModal";

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
      // 응답에 letter_pokemon이 있으면 성공
      if (response && typeof response === 'object') {
        const pokemonId = (response as { letter_pokemon?: number }).letter_pokemon;
        if (pokemonId) {
          setReceivedPokemonId(pokemonId);
          setShowCompleteModal(true);
        } else {
          handleClose();
          onSuccess?.();
        }
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
          className="bg-black rounded-2xl w-full max-w-[352px] p-4"
          onClick={(e) => e.stopPropagation()}
        >
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
              disabled={isLoading}
            />
          </div>

          {/* 메세지 내용 */}
          <div className="mb-4">
            <h3 className="text-white text-sm font-bold mb-2">{translate("sendLetter.content")}</h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={translate("sendLetter.contentPlaceholder")}
              className="w-full px-3 py-2 rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-white resize-none min-h-[150px]"
              maxLength={MAX_CONTENT_LENGTH}
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
