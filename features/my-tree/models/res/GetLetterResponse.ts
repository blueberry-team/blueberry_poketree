import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface LetterData {
  letter_id: string;
  sender_name: string;
  is_open: string;
  letter_pokemon: number;
  content: string;
}

export type GetLetterResponse = ApiResponse<LetterData>;
