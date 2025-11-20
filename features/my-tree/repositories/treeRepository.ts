import { apiClient } from '@/features/shared/utils/api/apiClient';
import type { GetUserTreeRequest } from '../models/req/GetUserTreeRequest';
import type { GetUserTreeResponse } from '../models/res/GetUserTreeResponse';

/**
 * 유저의 트리 정보를 가져옵니다
 * @param req - public_id를 포함한 요청 데이터
 * @returns 트리 정보 (유저명, 본인여부, 편지 목록, 포켓몬 목록)
 */
export async function getUserTreeGet(req: GetUserTreeRequest): Promise<GetUserTreeResponse> {
  // TODO: 서버 구현 후 주석 해제
  // return apiClient.get<GetUserTreeResponse>(
  //   `/get-my-tree?publicId=${req.public_id}`,
  //   true  // 토큰이 있으면 헤더에 포함 (서버에서 is_owner 판별용)
  // );

  // 샘플 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "success",
        data: {
          user_name: "상화",
          is_owner: true,  // 본인 여부
          letters: [
            { letter_id: "1", letter_sender: "익명의 산타", letter_isOpen: false },
            { letter_id: "2", letter_sender: "친구A", letter_isOpen: true },
            { letter_id: "3", letter_sender: "가족", letter_isOpen: false },
            { letter_id: "4", letter_sender: "동료", letter_isOpen: false },
            { letter_id: "5", letter_sender: "선배", letter_isOpen: true },
            { letter_id: "6", letter_sender: "후배", letter_isOpen: false },
            { letter_id: "7", letter_sender: "친구B", letter_isOpen: false },
            { letter_id: "8", letter_sender: "익명", letter_isOpen: false },
            { letter_id: "9", letter_sender: "소중한 사람", letter_isOpen: true },
            { letter_id: "10", letter_sender: "이웃", letter_isOpen: false },
            { letter_id: "11", letter_sender: "친구C", letter_isOpen: false },
            { letter_id: "12", letter_sender: "멘토", letter_isOpen: false },
            { letter_id: "13", letter_sender: "팀원", letter_isOpen: false },
            { letter_id: "14", letter_sender: "지인", letter_isOpen: true },
            { letter_id: "15", letter_sender: "익명의 친구", letter_isOpen: false },
          ],
          pokemon_list: [25, 1, 4, 7, 150, 151, 39, 52, 6, 143, 94, 131, 3, 9, 133],
        },
      });
    }, 100); // 0.1초 지연으로 로딩 시뮬레이션
  });
}

