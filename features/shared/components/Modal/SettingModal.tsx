"use client";

import { useTranslation } from "../../utils/translate/useLanguage";
import { logout } from "../../usecases/logout";
import { HelpModal } from "./HelpModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingModal({ isOpen, onClose }: SettingModalProps) {
  const { translate } = useTranslation();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const router = useRouter();

  if (!isOpen && !isHelpModalOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    router.push('/');
  };

  const handleHelp = () => {
    setIsHelpModalOpen(true);
  };

  return (
    <>
      {isOpen && (
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
              <span className="text-white font-bold text-xl">×</span>
            </button>
            {/* 모달 내용 */}
            <div
              className="bg-white rounded-2xl p-6 w-[360px] max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-3">
                {/* 로그아웃 버튼 */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded border border bg-white transition-all text-black"
                >
                {translate("header.logout")}
                </button>

                {/* 도움말 버튼 */}
                <button
                  onClick={handleHelp}
                  className="px-4 py-3 rounded border border bg-white transition-all text-black"
                >
                {translate("header.help")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 도움말 모달 */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  )
}
