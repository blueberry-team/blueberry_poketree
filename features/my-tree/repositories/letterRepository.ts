import { apiClient } from '@/features/shared/utils/api/apiClient';
import type { GetLetterRequest } from '../models/req/GetLetterRequest';
import type { GetLetterResponse } from '../models/res/GetLetterResponse';

/**
 * 편지의 상세 정보를 가져옵니다
 * @param req - letterId를 포함한 요청 데이터
 * @returns 편지 상세 정보 (발신자, 내용, 포켓몬 등)
 */
export async function getLetterById(req: GetLetterRequest): Promise<GetLetterResponse> {
  // TODO: 서버 구현 후 주석 해제
  // return apiClient.get<GetLetterResponse>(
  //   `/letter/${req.letterId}`,
  //   true,  // 인증 필요
  //   { 'letter-id': req.letterId }  // 헤더에 letterId 포함
  // );

  // 샘플 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "success",
        data: {
          letter_id: req.letterId,
          sender_name: "아구몬",
          is_opened: false,
          letter_pokemon: 49,
          content: "디지몬이 짱임",
        },
      });
    }, 300);
  });
}
