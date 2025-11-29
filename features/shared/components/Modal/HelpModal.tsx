"use client";

import Image from "next/image";
import { useTranslation } from "../../utils/translate/useLanguage";
import MonsterBall1 from "@/assets/icon/tooltip/monsterBall1.svg";
import MonsterBall2 from "@/assets/icon/tooltip/monsterBall2.svg";
import MonsterBall3 from "@/assets/icon/tooltip/monsterBall3.svg";
import ElectricBulb from "@/assets/icon/tooltip/electricBulb.svg";
import CloseIcon from "@/assets/icon/closeIcon.png";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const { translate } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* 모달 컨테이너 */}
      <div className="relative">
        {/* 닫기 버튼 - 모달 바깥 우측 상단 */}
        <button
          onClick={onClose}
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

        {/* 모달 내용 */}
        <div
          className="bg-white rounded-2xl p-6 w-[360px] max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-[32px] font-bold mb-4 text-black">
            {translate("help.title")}
          </h2>

          <div className="flex flex-col gap-4 text-black">
            {/* 섹션 1: 친구들과 공유하기 */}
            <div>
              <div className="flex gap-3 items-center mb-1">
                <Image src={MonsterBall1} alt="1" width={34} height={35} />
                <h3 className="text-[20px] font-bold">{translate("help.section1.title")}</h3>
              </div>
              <p className="text-[15px]">{translate("help.section1.description")}</p>
            </div>

            {/* 섹션 2: 편지와 포켓몬 모으기 */}
            <div>
              <div className="flex gap-3 items-center mb-1">
                <Image src={MonsterBall2} alt="2" width={34} height={35} />
                <h3 className="text-[20px] font-bold">{translate("help.section2.title")}</h3>
              </div>
              <p className="text-[15px]">{translate("help.section2.description")}</p>
            </div>

            {/* 섹션 3: 도감 확인하기 */}
            <div>
              <div className="flex gap-3 items-center mb-1">
                <Image src={MonsterBall3} alt="3" width={34} height={35} />
                <h3 className="text-[20px] font-bold">{translate("help.section3.title")}</h3>
              </div>
              <p className="text-[15px]">{translate("help.section3.description")}</p>
            </div>

            {/* 특별 팁 섹션 */}
            <div className="mt-3">
              <div className="flex gap-2 items-center mb-1">
                <Image src={ElectricBulb} alt="팁" width={24} height={24} />
                <h3 className="text-[16px] font-bold">{translate("help.tip.title")}</h3>
              </div>
              <p className="text-[15px]">{translate("help.tip.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
