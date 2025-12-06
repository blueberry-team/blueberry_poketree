/**
 * Mock Database
 * In-memory 데이터베이스 (재시작 시 초기화됨)
 */

import type { User, Letter } from './types';

class MockDB {
  private users: Map<string, User> = new Map();
  private letters: Map<string, Letter> = new Map();
  private lettersByReceiver: Map<string, string[]> = new Map();

  constructor() {
    this.initializeSampleData();
  }

  /**
   * 샘플 데이터 초기화
   */
  private initializeSampleData() {
    // 샘플 사용자 생성
    const sampleUsers: User[] = [
      {
        public_id: '1',
        nickname: '상화',
        password: '1234',
        pokemon_list: [74, 32, 31, 1, 4, 7, 10, 13, 16, 19, 25, 39, 52, 63, 77, 21, 27, 35, 41, 46, 50, 56, 58, 66, 70, 72, 79],
        is_master: false,
      },
      {
        public_id: '2',
        nickname: '상일',
        password: '1234',
        pokemon_list: [54, 55],
        is_master: false,
      },
      {
        public_id: '3',
        nickname: '상추',
        password: '1234',
        pokemon_list: [],
        is_master: false,
      },
    ];

    sampleUsers.forEach(user => {
      this.users.set(user.public_id, user);
    });

    // 샘플 편지 생성
    const sampleLetters: Letter[] = [
      // 상화에게 온 편지들
      {
        letter_id: '1',
        sender_name: '상일',
        content: '상화님, 항상 밝은 모습으로 힘이 되어주셔서 감사해요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 1,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '2',
        sender_name: '정후',
        content: '상화님 덕분에 오늘도 즐겁게 일할 수 있었어요. 고맙습니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 4,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '3',
        sender_name: '건희',
        content: '상화님의 긍정적인 에너지가 언제나 우리 팀을 밝게 해줘요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 7,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '4',
        sender_name: '건우',
        content: '상화님과 함께 일할 수 있어서 정말 행운이에요. 감사합니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 10,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '5',
        sender_name: '민찬',
        content: '상화님의 따뜻한 배려 덕분에 힘든 순간도 잘 이겨낼 수 있었어요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 13,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '6',
        sender_name: '성민',
        content: '상화님, 언제나 응원하고 있어요. 힘내세요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 16,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '7',
        sender_name: '서운',
        content: '상화님의 따뜻한 말 한마디가 큰 위로가 되었어요. 감사합니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 19,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '8',
        sender_name: '승원',
        content: '상화님과 함께 하는 시간들이 정말 소중해요. 고맙습니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 25,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '9',
        sender_name: '승재',
        content: '상화님의 열정이 저에게도 전해져요. 함께 힘내요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 39,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '10',
        sender_name: '승혁',
        content: '상화님께 배운 것들이 정말 많아요. 항상 감사합니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 52,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '11',
        sender_name: '윤하',
        content: '상화님의 세심한 배려에 항상 감동받아요. 고맙습니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 63,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '12',
        sender_name: '재혁',
        content: '상화님 덕분에 어려운 일도 즐겁게 해낼 수 있었어요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 77,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '13',
        sender_name: '창환',
        content: '상화님의 리더십과 따뜻함이 팀을 하나로 만들어요. 감사합니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 94,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '14',
        sender_name: '한규',
        content: '상화님과 함께라면 어떤 목표도 이룰 수 있을 것 같아요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 21,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '15',
        sender_name: '해린',
        content: '상화님의 밝은 웃음이 우리 모두에게 행복을 전해줘요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 27,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '16',
        sender_name: '형규',
        content: '상화님께서 보여주신 열정과 헌신에 깊이 감사드려요!',
        receiver_id: '1',
        owner_id: '1',
        is_open: true,
        is_read: false,
        letter_pokemon: 35,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '17',
        sender_name: '효경',
        content: '상화님의 따뜻한 마음씨가 우리 모두를 하나로 묶어줘요. 감사합니다!',
        receiver_id: '1',
        owner_id: '1',
        is_open: false,
        is_read: false,
        letter_pokemon: 41,
        created_at: new Date().toISOString(),
      },
      // 상일에게 온 편지들
      {
        letter_id: '18',
        sender_name: '상화',
        content: '항상 고맙습니다, 상일님!',
        receiver_id: '2',
        owner_id: '2',
        is_open: false,
        is_read: false,
        letter_pokemon: 54,
        created_at: new Date().toISOString(),
      },
      {
        letter_id: '19',
        sender_name: '정우',
        content: '포켓몬과 함께 행복하세요, 상일님!',
        receiver_id: '2',
        owner_id: '2',
        is_open: true,
        is_read: false,
        letter_pokemon: 55,
        created_at: new Date().toISOString(),
      },
    ];

    sampleLetters.forEach(letter => {
      this.letters.set(letter.letter_id, letter);

      const receiverLetters = this.lettersByReceiver.get(letter.receiver_id) || [];
      receiverLetters.push(letter.letter_id);
      this.lettersByReceiver.set(letter.receiver_id, receiverLetters);
    });
  }

  // User CRUD
  getUser(publicId: string): User | undefined {
    return this.users.get(publicId);
  }

  getUserByNickname(nickname: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.nickname === nickname);
  }

  createUser(user: User): void {
    this.users.set(user.public_id, user);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Letter CRUD
  getLetter(letterId: string): Letter | undefined {
    return this.letters.get(letterId);
  }

  getLettersByReceiver(receiverId: string): Letter[] {
    const letterIds = this.lettersByReceiver.get(receiverId) || [];
    return letterIds.map(id => this.letters.get(id)).filter(Boolean) as Letter[];
  }

  createLetter(letter: Letter): void {
    this.letters.set(letter.letter_id, letter);

    const receiverLetters = this.lettersByReceiver.get(letter.receiver_id) || [];
    receiverLetters.push(letter.letter_id);
    this.lettersByReceiver.set(letter.receiver_id, receiverLetters);
  }

  updateLetter(letterId: string, updates: Partial<Letter>): boolean {
    const letter = this.letters.get(letterId);
    if (!letter) return false;

    this.letters.set(letterId, { ...letter, ...updates });
    return true;
  }

  deleteLetter(letterId: string): boolean {
    const letter = this.letters.get(letterId);
    if (!letter) return false;

    this.letters.delete(letterId);

    // lettersByReceiver에서도 제거
    const receiverLetters = this.lettersByReceiver.get(letter.receiver_id) || [];
    const filtered = receiverLetters.filter(id => id !== letterId);
    this.lettersByReceiver.set(letter.receiver_id, filtered);

    return true;
  }
}

// 싱글톤 인스턴스
export const db = new MockDB();
