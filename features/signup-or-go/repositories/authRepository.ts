import { apiClient } from '@/features/shared/utils/api/apiClient';
import type { SignupOrGoRequest } from '../models/req/SignupOrGoRequest';
import type { SignupOrGoResponse } from '../models/res/SignupOrGoResponse';

// 유저 확인 요청
export async function signupOrGoPost(req: SignupOrGoRequest): Promise<SignupOrGoResponse> {
    return apiClient.post<SignupOrGoResponse>('/auth/signup-or-go', req, false);
  }
