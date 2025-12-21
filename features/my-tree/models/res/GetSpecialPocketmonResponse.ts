import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface GetSpecialPocketmonData {
  special_pokemon: number;
}

export type GetSpecialPocketmonResponse = ApiResponse<GetSpecialPocketmonData>;
