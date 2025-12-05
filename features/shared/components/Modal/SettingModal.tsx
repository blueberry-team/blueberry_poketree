"use client";

import { Suspense } from "react";
import { useTranslation } from "../../utils/translate/useLanguage";
import { logout } from "../../usecases/logout";
import { HelpModal } from "./HelpModal";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn } from "@/features/signup-or-go/stores/authStore";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SettingModalContent({ isOpen, onClose }: SettingModalProps) {
  const { translate } = useTranslation();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  if (!isOpen && !isHelpModalOpen) return null;

  const shouldHideLogout = pathname === '/' || pathname === '/signup-or-go' || !isLoggedIn.value;

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.message === 'success') {
        onClose();
        router.push('/');
      }
    } catch (error) {
      // TODO: 에러 처리 필요함
      console.error('로그아웃 실패:', error);
    }
  };

  const handleHelp = () => {
    setIsHelpModalOpen(true);
  };

  return (
    <>
      {isOpen && (
        <BaseModal
          isOpen={isOpen}
          onClose={onClose}
          contentClassName="bg-white rounded-2xl p-6 w-[360px] max-h-[80vh] overflow-y-auto"
        >
              <div className="flex flex-col gap-3">
                {/* 로그아웃 버튼 - 랜딩 페이지와 회원가입 페이지에서는 숨김 */}
                {!shouldHideLogout && (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded border bg-white transition-all text-black"
                  >
                  {translate("header.logout")}
                  </button>
                )}

                {/* 도움말 버튼 */}
                <button
                  onClick={handleHelp}
                  className="px-4 py-3 rounded border bg-white transition-all text-black"
                >
                {translate("header.help")}
                </button>
              </div>
        </BaseModal>
      )}

      {/* 도움말 모달 */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  );
}

export function SettingModal(props: SettingModalProps) {
  return (
    <Suspense fallback={null}>
      <SettingModalContent {...props} />
    </Suspense>
  );
}
