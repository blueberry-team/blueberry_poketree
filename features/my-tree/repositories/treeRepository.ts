import type { GetUserTreeRequest } from '../models/req/GetUserTreeRequest';
import type { GetUserTreeResponse } from '../models/res/GetUserTreeResponse';

/**
 * 유저의 트리 정보를 가져옵니다
 * @param req - user_id를 포함한 요청 데이터
 * @returns 트리 정보 (닉네임, 본인여부, 편지 목록, 포켓몬 목록)
 */
export async function getUserTreeGet(req: GetUserTreeRequest): Promise<GetUserTreeResponse> {
  // TODO: 서버 구현 후 주석 해제
  // return apiClient.get<GetUserTreeResponse>(
  //   `/tree/get-my-tree?user_id=${req.user_id}`,
  //   true  // 토큰이 있으면 헤더에 포함 (서버에서 is_owner 판별용)
  // );

  // 샘플 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "success",
        data: {
          nickname: "라라라",
          is_owner: true,
          letters: [
            { letter_id: "71fbf393-d6c9-4e2e-a572-6e50bf3be672", sender_name: "김민수", is_open: "true", is_read: "true", letter_pokemon: 59, content: "메리 크리스마스! 올해도 행복한 연말 보내세요." },
            { letter_id: "6ddba2e4-203b-4b2b-8cdc-e4463e7e7eba", sender_name: "이지은", is_open: "false", is_read: "false", letter_pokemon: 37, content: "행복한 연말 보내세요! 새해에도 좋은 일만 가득하길 바랍니다." },
            { letter_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", sender_name: "박서준", is_open: "true", is_read: "true", letter_pokemon: 25, content: "새해 복 많이 받으세요! 항상 건강하고 행복하세요." },
            { letter_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901", sender_name: "최유리", is_open: "false", is_read: "false", letter_pokemon: 1, content: "따뜻한 크리스마스 보내세요! 사랑하는 사람들과 함께요." },
            { letter_id: "c3d4e5f6-a7b8-9012-cdef-123456789012", sender_name: "정우성", is_open: "true", is_read: "false", letter_pokemon: 7, content: "즐거운 연말연시 되세요! 2025년에도 파이팅!" },
            { letter_id: "d4e5f6a7-b8c9-0123-def1-234567890123", sender_name: "한지민", is_open: "true", is_read: "true", letter_pokemon: 50, content: "포켓트리와 함께하는 특별한 크리스마스! 모든 소원이 이루어지길!" },
            { letter_id: "e5f6a7b8-c9d0-1234-ef12-345678901234", sender_name: "송강호", is_open: "false", is_read: "false", letter_pokemon: 51, content: "항상 응원하고 있어요! 좋은 하루 되세요." },
            { letter_id: "f6a7b8c9-d0e1-2345-f123-456789012345", sender_name: "김태희", is_open: "true", is_read: "true", letter_pokemon: 39, content: "올 한 해도 수고 많았어요! 푹 쉬세요." },
            { letter_id: "a7b8c9d0-e1f2-3456-1234-567890123456", sender_name: "유재석", is_open: "false", is_read: "false", letter_pokemon: 52, content: "따뜻한 연말 보내세요! 사랑합니다." },
            { letter_id: "b8c9d0e1-f2a3-4567-2345-678901234567", sender_name: "강동원", is_open: "false", is_read: "true", letter_pokemon: 6, content: "새해에도 건강하고 행복하세요!" },
            { letter_id: "c9d0e1f2-a3b4-5678-3456-789012345678", sender_name: "손예진", is_open: "true", is_read: "false", letter_pokemon: 43, content: "좋은 일만 가득한 크리스마스 되세요!" },
            { letter_id: "d0e1f2a3-b4c5-6789-4567-890123456789", sender_name: "현빈", is_open: "false", is_read: "false", letter_pokemon: 14, content: "힘내세요! 항상 응원합니다." },
            { letter_id: "e1f2a3b4-c5d6-7890-5678-901234567890", sender_name: "공유", is_open: "false", is_read: "true", letter_pokemon: 31, content: "메리 크리스마스! 새해 복 많이 받으세요." },
            { letter_id: "f2a3b4c5-d6e7-8901-6789-012345678901", sender_name: "아이유", is_open: "true", is_read: "true", letter_pokemon: 3, content: "즐거운 연말 보내세요!" },
            { letter_id: "a3b4c5d6-e7f8-9012-7890-123456789012", sender_name: "이병헌", is_open: "false", is_read: "false", letter_pokemon: 9, content: "2025년에도 좋은 일만 가득하길!" },
          ],
          pokemon_list: [45, 59, 40, 37, 43, 25, 1, 7],
        },
      });
    }, 100);
  });
}

