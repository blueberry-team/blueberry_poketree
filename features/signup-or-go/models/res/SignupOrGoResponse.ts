import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface SignupOrGoData {
  nickname: string;
  public_id: string;
  action: string;
}

export type SignupOrGoResponse = ApiResponse<SignupOrGoData>;
