import {
  apiClient,
  type ApiResponse,
} from "@/features/shared/utils/api/apiClient";
import type { GetLetterRequest } from "../models/req/GetLetterRequest";
import type { GetVisitorLetterRequest } from "../models/req/GetVisitorLetterRequest";
import type { GetLetterResponse } from "../models/res/GetLetterResponse";
import type { SendLetterRequest } from "../models/req/SendLetterRequest";
import type { SendLetterResponse } from "../models/res/SendLetterResponse";
import type { DeleteLetterRequest } from "../models/req/DeleteLetterRequest";
import type { OpenLetterRequest } from "../models/req/OpenLetterRequest";

/**
 * 편지의 상세 정보를 가져옵니다 (소유자용)
 * @param req - letter_id를 포함한 요청 데이터
 * @returns 편지 상세 정보 (발신자, 내용, 포켓몬 등)
 */
export async function getLetterById(
  req: GetLetterRequest
): Promise<GetLetterResponse> {
  return apiClient.get<GetLetterResponse>(
    `/letter/${req.letter_id}`,
    true // 인증 필요
  );
}

/**
 * 편지의 상세 정보를 가져옵니다 (방문자용)
 * @param req - letter_id와 user_id를 포함한 요청 데이터
 * @returns 편지 상세 정보 (발신자, 내용, 포켓몬 등)
 */
export async function getVisitorLetterById(
  req: GetVisitorLetterRequest
): Promise<GetLetterResponse> {
  return apiClient.get<GetLetterResponse>(
    `/letter/get-open-letter/${req.user_id}/${req.letter_id}`,
    false // 인증 불필요
  );
}

/**
 * 편지를 보냅니다
 * @param req - 발신자명, 내용, 수신자ID를 포함한 요청 데이터
 * @returns 성공 메시지와 포켓몬 ID
 */
export async function sendLetter(
  req: SendLetterRequest
): Promise<SendLetterResponse> {
  return apiClient.post<SendLetterResponse>(
    "/letter/create-letter",
    req,
    false // 인증 불필요 (익명 편지)
  );
}

/**
 * 편지를 삭제합니다
 * @param req - letter_id를 포함한 요청 데이터
 * @returns 성공 메시지
 */
export async function deleteLetter(
  req: DeleteLetterRequest
): Promise<ApiResponse<null>> {
  // TODO: 서버 구현 후 주석 해제
  return apiClient.delete<ApiResponse<null>>(
    "/letter/delete-letter",
    req,
    true // 인증 필요 (본인만 삭제 가능)
  );
}

/**
 * 편지의 공개/비공개 상태를 변경합니다
 * @param req - letter_id와 is_open을 포함한 요청 데이터
 * @returns 성공 메시지
 */
export async function openLetter(
  req: OpenLetterRequest
): Promise<ApiResponse<null>> {
  return apiClient.put<ApiResponse<null>>(
    "/letter/open-letter",
    req,
    true // 인증 필요 (본인만 변경 가능)
  );
}
