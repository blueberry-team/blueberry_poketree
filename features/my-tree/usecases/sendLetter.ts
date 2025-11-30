import { ApiResponse } from "@/features/shared/utils/api/apiClient";
import { SendLetterRequest } from "../models/req/SendLetterRequest";
import { sendLetter as sendLetterRepo } from "../repositories/letterRepository";

const MAX_CONTENT_LENGTH = 300;

/**
 * 편지를 보냅니다
 * @param req - 발신자명, 내용, 수신자ID를 포함한 요청
 * @returns 성공 메시지
 */
export async function sendLetter(
  req: SendLetterRequest
): Promise<ApiResponse<null>> {
  // validation
  if (!req.sender_name || req.sender_name.trim().length === 0) {
    throw new Error("발신자 이름을 입력해주세요.");
  }

  if (!req.content || req.content.trim().length === 0) {
    throw new Error("편지 내용을 입력해주세요.");
  }

  if (req.content.length > MAX_CONTENT_LENGTH) {
    throw new Error(
      `편지 내용은 최대 ${MAX_CONTENT_LENGTH}자까지 입력 가능합니다.`
    );
  }

  if (!req.receiver_id || req.receiver_id.trim().length === 0) {
    throw new Error("수신자 ID가 필요합니다.");
  }

  // API request
  const res = await sendLetterRepo(req);

  return res;
}
