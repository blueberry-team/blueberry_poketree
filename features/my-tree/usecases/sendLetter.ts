import { SendLetterRequest } from "../models/req/SendLetterRequest";
import { SendLetterResponse } from "../models/res/SendLetterResponse";
import { sendLetter as sendLetterRepo } from "../repositories/letterRepository";

const MIN_SENDER_NAME_LENGTH = 1;
const MAX_SENDER_NAME_LENGTH = 6;
const MIN_CONTENT_LENGTH = 4;
const MAX_CONTENT_LENGTH = 300;

/**
 * 편지를 보냅니다
 * @param req - 발신자명, 내용, 수신자ID를 포함한 요청
 * @returns 성공 메시지와 포켓몬 ID
 */
export async function sendLetter(
  req: SendLetterRequest
): Promise<SendLetterResponse> {
  // validation

  const trimmedSenderName = req.sender_name.trim();
  const trimmedContent = req.content.trim();

  if (trimmedSenderName.length === 0) {
    throw new Error("발신자 이름을 입력해주세요.");
  }

  if (trimmedContent.length === 0) {
    throw new Error("편지 내용을 입력해주세요.");
  }

  if (
    trimmedSenderName.length < MIN_SENDER_NAME_LENGTH ||
    trimmedSenderName.length > MAX_SENDER_NAME_LENGTH
  ) {
    throw new Error(
      `작성자 닉네임은 ${MIN_SENDER_NAME_LENGTH}~${MAX_SENDER_NAME_LENGTH}자여야 합니다.`
    );
  }

  if (
    trimmedContent.length < MIN_CONTENT_LENGTH ||
    trimmedContent.length > MAX_CONTENT_LENGTH
  ) {
    throw new Error(
      `메세지 내용은 ${MIN_CONTENT_LENGTH}~${MAX_CONTENT_LENGTH}자여야 합니다.`
    );
  }

  // API request
  const res = await sendLetterRepo(req);
  return res;
}
