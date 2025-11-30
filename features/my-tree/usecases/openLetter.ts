import { ApiResponse } from "@/features/shared/utils/api/apiClient";
import { OpenLetterRequest } from "../models/req/OpenLetterRequest";
import { openLetter as openLetterRepo } from "../repositories/letterRepository";

/**
 * 편지의 공개/비공개 여부를 변경합니다
 * @param req - letter_id와 is_open을 포함한 요청
 * @returns 성공 메시지
 */
export async function openLetter(
  req: OpenLetterRequest
): Promise<ApiResponse<null>> {
  // validation
  if (!req.letter_id || req.letter_id.trim().length === 0) {
    throw new Error("편지 ID가 필요합니다.");
  }

  if (typeof req.is_open !== "boolean") {
    throw new Error("공개 여부 값이 필요합니다.");
  }

  // API request
  const res = await openLetterRepo(req);

  return res;
}
