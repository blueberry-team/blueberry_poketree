"use client";

import { AuthForm } from "@/features/signup-or-go/components/AuthForm";
import { SignupOrGoRequest } from "@/features/signup-or-go/models/req/SignupOrGoRequest";
import { signupOrGo } from "@/features/signup-or-go/usecases/signupOrGo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trackEvent } from "@/features/shared/utils/analytics/analytics";

export default function SignupOrGoPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignupOrGo = async (req: SignupOrGoRequest) => {
        setIsLoading(true);
        setError(null); // 이전 에러 초기화

        try {
            const res = await signupOrGo(req);

            if (res.message == "success" && res.data) {
                // Analytics 이벤트 전송 - 회원가입 성공
                trackEvent("user_create_success", {
                    tree_name: req.nickname,
                    tree_name_length: req.nickname.length,
                    public_id: res.data.public_id,
                });

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
        <>
            <AuthForm onSubmit={handleSignupOrGo} isLoading={isLoading} error={error} />
        </>
    );
}
