import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface SendLetterData {
  letter_pokemon: number;
}

export type SendLetterResponse = ApiResponse<SendLetterData>;
