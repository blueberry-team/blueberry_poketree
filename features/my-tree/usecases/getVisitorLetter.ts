import { GetVisitorLetterRequest } from "../models/req/GetVisitorLetterRequest";
import { GetLetterResponse } from "../models/res/GetLetterResponse";
import { getVisitorLetterById } from "../repositories/letterRepository";

/**
 * 방문자가 편지의 상세 정보를 조회합니다
 * @param req - letter_id와 user_id를 포함한 요청
 * @returns 편지 상세 데이터 (발신자, 내용, 포켓몬 등)
 */
export async function getVisitorLetter(
  req: GetVisitorLetterRequest
): Promise<GetLetterResponse> {
  // validation
  if (!req.letter_id) {
    throw new Error("Letter ID is required");
  }
  if (!req.user_id) {
    throw new Error("User ID is required");
  }

  // API request
  const res = await getVisitorLetterById(req);

  return res;
}
