import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface Letter {
  letter_id: string;
  sender_name: string;
  is_open: string;
  is_read: string;
  letter_pokemon: number;
}

export interface UserTreeData {
  nickname: string;
  is_owner: string;
  is_master: string;
  letters: Letter[];
  pokemon_list: number[];
}

export type GetUserTreeResponse = ApiResponse<UserTreeData>;
