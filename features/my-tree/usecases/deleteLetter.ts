import { ApiResponse } from "@/features/shared/utils/api/apiClient";
import { DeleteLetterRequest } from "../models/req/DeleteLetterRequest";
import { deleteLetter as deleteLetterRepo } from "../repositories/letterRepository";

/**
 * 편지를 삭제합니다
 * @param req - letter_id를 포함한 요청
 * @returns 성공 메시지
 */
export async function deleteLetter(
  req: DeleteLetterRequest
): Promise<ApiResponse<null>> {
  // validation
  if (!req.letter_id || req.letter_id.trim().length === 0) {
    throw new Error("편지 ID가 필요합니다.");
  }

  // API request
  const res = await deleteLetterRepo(req);

  return res;
}
