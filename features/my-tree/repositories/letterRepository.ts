import { apiClient, type ApiResponse } from "@/features/shared/utils/api/apiClient";
import type { GetLetterRequest } from "../models/req/GetLetterRequest";
import type { GetLetterResponse } from "../models/res/GetLetterResponse";
import type { SendLetterRequest } from "../models/req/SendLetterRequest";
import type { DeleteLetterRequest } from "../models/req/DeleteLetterRequest";

/**
 * 편지의 상세 정보를 가져옵니다
 * @param req - letter_id를 포함한 요청 데이터
 * @returns 편지 상세 정보 (발신자, 내용, 포켓몬 등)
 */
export async function getLetterById(
  req: GetLetterRequest
): Promise<GetLetterResponse> {
  return apiClient.get<GetLetterResponse>(
    `/letter/${req.letter_id}`,
    true,  // 인증 필요
  );
}

/**
 * 편지를 보냅니다
 * @param req - 발신자명, 내용, 수신자ID를 포함한 요청 데이터
 * @returns 성공 메시지
 */
export async function sendLetter(
  req: SendLetterRequest
): Promise<ApiResponse<null>> {
  return apiClient.post<ApiResponse<null>>(
    '/letter/create-letter',
    req,
    false  // 인증 불필요 (익명 편지)
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
  // return apiClient.post<DeleteLetterResponse>(
  //   '/letter/delete-letter',
  //   req,
  //   true  // 인증 필요 (본인만 삭제 가능)
  // );

  // 샘플 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "success",
        data: null,
      });
    }, 300);
  });
}
