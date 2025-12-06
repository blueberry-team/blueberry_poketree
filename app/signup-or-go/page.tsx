"use client";

import { AuthForm } from "@/features/signup-or-go/components/AuthForm";
import { SignupOrGoRequest } from "@/features/signup-or-go/models/req/SignupOrGoRequest";
import { signupOrGo } from "@/features/signup-or-go/usecases/signupOrGo";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { trackEvent } from "@/features/shared/utils/analytics/analytics";
import { notifyUserCreateSuccess } from "@/features/shared/utils/discord/discord";
import { resetAuthState } from "@/features/signup-or-go/stores/authStore";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

function SignupOrGoPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { translate } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const from = searchParams.get("from");
    const isLogin = from === "login";

    // 페이지 진입 시 인증 상태 초기화 (AUTH005 등으로 리다이렉트된 경우 대비)
    useEffect(() => {
        resetAuthState();
    }, []);

    const handleSignupOrGo = async (req: SignupOrGoRequest) => {
        setIsLoading(true);
        setError(null); // 이전 에러 초기화

        try {
            const res = await signupOrGo(req);

            if (res.message == "success" && res.data) {
                // 회원가입인 경우에만 알림 및 이벤트 전송
                if (res.data.action === "signup") {
                    // Analytics 이벤트 전송 - 회원가입 성공
                    trackEvent("user_create_success", {
                        tree_name: req.nickname,
                        tree_name_length: req.nickname.length,
                        public_id: res.data.public_id,
                    });

                    // Discord 알림 전송 (비동기, 에러 무시)
                    notifyUserCreateSuccess(req.nickname);
                }

                // public_id를 query params로 전달
                router.push(`/my-tree?id=${res.data.public_id}`);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthForm
            onSubmit={handleSignupOrGo}
            isLoading={isLoading}
            error={error}
            title={isLogin ? translate("auth.login") : translate("auth.signup")}
            isLogin={isLogin}
        />
    );
}

export default function SignupOrGoPage() {
    return (
        <Suspense fallback={<div className="flex-1 bg-[#F7F7F7]" />}>
            <SignupOrGoPageContent />
        </Suspense>
    );
}
