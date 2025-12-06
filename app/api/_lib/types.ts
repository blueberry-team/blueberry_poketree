/**
 * Mock Server Types
 * 목 서버에서 사용하는 타입 정의
 */

export interface User {
  public_id: string;
  nickname: string;
  password: string;
  pokemon_list: number[];
  is_master: boolean;
}

export interface Letter {
  letter_id: string;
  sender_name: string;
  content: string;
  receiver_id: string;
  owner_id: string;
  is_open: boolean;
  is_read: boolean;
  letter_pokemon: number;
  created_at: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiError {
  error_code: string;
  message?: string;
  status?: string;
}
