"use client";

import { Suspense } from "react";
import { useTranslation } from "../../utils/translate/useLanguage";
import { logout } from "../../usecases/logout";
import { HelpModal } from "./HelpModal";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn, isTreeOwner } from "@/features/signup-or-go/stores/authStore";
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

  // 로그아웃 버튼 숨김 조건:
  // 1. 랜딩 페이지 또는 회원가입 페이지
  // 2. 로그인하지 않은 경우
  // 3. my-tree 페이지에서 방문자인 경우 (isTreeOwner === false)
  const shouldHideLogout =
    pathname === '/' ||
    pathname === '/signup-or-go' ||
    !isLoggedIn.value ||
    (pathname === '/my-tree' && isTreeOwner.value === false);

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.message === 'success') {
        onClose();
        router.push('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // TODO: 에러 처리 필요함
      onClose();
      router.push('/');
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
          contentClassName="bg-white"
        >
              <div className="flex flex-col gap-3 items-center justify-center flex-1">
                {/* 로그아웃 버튼 - 랜딩 페이지와 회원가입 페이지에서는 숨김 */}
                {!shouldHideLogout && (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded bg-[#F5F5F5] transition-all text-black hover:bg-gray-200 w-full"
                  >
                  {translate("header.logout")}
                  </button>
                )}

                {/* 도움말 버튼 */}
                <button
                  onClick={handleHelp}
                  className="px-4 py-3 rounded bg-[#F5F5F5] transition-all text-black hover:bg-gray-200 w-full"
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
