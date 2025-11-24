import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

export interface Letter {
  letter_id: string;
  letter_sender: string;
  letter_isOpen: boolean;
}

export interface UserTreeData {
  user_name: string;
  is_owner: boolean;
  letters: Letter[];
  pokemon_list: number[];
}

export type GetUserTreeResponse = ApiResponse<UserTreeData>;

