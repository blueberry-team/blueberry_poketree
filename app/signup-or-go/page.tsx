"use client";

import { AuthForm } from "@/features/signup-or-go/components/AuthForm";
import { SignupOrGoRequest } from "@/features/signup-or-go/models/req/SignupOrGoRequest";
import { signupOrGo } from "@/features/signup-or-go/usecases/signupOrGo";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupOrGoPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignupOrGo = async (req: SignupOrGoRequest) => {
        setIsLoading(true);
        setError(null); // 이전 에러 초기화

        try {
            const res = await signupOrGo(req);

            if (res.message == "success") {
                router.push("/my-tree");
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
