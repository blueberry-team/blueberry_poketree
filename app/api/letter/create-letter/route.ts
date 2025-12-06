/**
 * POST /api/letter/create-letter
 * 편지 생성 (익명)
 */

import type { NextRequest } from 'next/server';
import { db } from '../../_lib/mockDB';
import {
  createSuccessResponse,
  createErrorResponse,
  parseBody,
  generateId,
  getRandomPokemonId,
} from '../../_lib/utils';

interface CreateLetterRequest {
  sender_name: string;
  content: string;
  receiver_id: string;
}

export async function POST(request: NextRequest) {
  const body = await parseBody<CreateLetterRequest>(request);

  if (!body || !body.sender_name || !body.content || !body.receiver_id) {
    return createErrorResponse('LETTER_001', 'All fields are required');
  }

  const { sender_name, content, receiver_id } = body;

  // 수신자 확인
  const receiver = db.getUser(receiver_id);
  if (!receiver) {
    return createErrorResponse('AUTH_003', 'Receiver not found', 404);
  }

  // 편지 생성
  const letterId = generateId('letter');
  const letterPokemon = getRandomPokemonId();

  const newLetter = {
    letter_id: letterId,
    sender_name,
    content,
    receiver_id,
    owner_id: receiver_id,
    is_open: false,
    is_read: false,
    letter_pokemon: letterPokemon,
    created_at: new Date().toISOString(),
  };

  db.createLetter(newLetter);

  // 수신자에게 포켓몬 추가
  const currentPokemon = receiver.pokemon_list;
  if (!currentPokemon.includes(letterPokemon)) {
    receiver.pokemon_list.push(letterPokemon);
  }

  return createSuccessResponse({
    letter_pokemon: letterPokemon,
  });
}
