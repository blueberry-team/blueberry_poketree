import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface Letter {
  letter_id: string;
  sender_name: string;
  is_open: boolean;
  is_read?: boolean;
  letter_pokemon: number;
}

export interface UserTreeData {
  nickname: string;
  is_owner: boolean;
  is_master: boolean;
  letters: Letter[];
  pokemon_list: number[];
}

export type GetUserTreeResponse = ApiResponse<UserTreeData>;

