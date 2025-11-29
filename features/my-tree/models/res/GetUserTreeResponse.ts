import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface Letter {
  letter_id: string;
  sender_name: string;
  is_open: string;
  is_read: string;
  letter_pokemon: number;
  content?: string;
}

export interface UserTreeData {
  nickname: string;
  is_owner: boolean;
  letters: Letter[];
  pokemon_list: number[];
}

export type GetUserTreeResponse = ApiResponse<UserTreeData>;

