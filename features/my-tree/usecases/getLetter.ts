import { GetLetterRequest } from "../models/req/GetLetterRequest";
import { GetLetterResponse } from "../models/res/GetLetterResponse";
import { getLetterById } from "../repositories/letterRepository";

/**
 * 편지의 상세 정보를 조회합니다
 * @param req - letterId를 포함한 요청
 * @returns 편지 상세 데이터 (발신자, 내용, 포켓몬 등)
 */
export async function getLetter(req: GetLetterRequest): Promise<GetLetterResponse> {
  // validation
  if (!req.letterId) {
    throw new Error("Letter ID is required");
  }

  // API request
  const res = await getLetterById(req);

  return res;
}
