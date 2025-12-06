import { functions } from "../firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { getOrCreateSessionId } from "../analytics/analytics";

/**
 * 회원가입 성공 Discord 알림
 */
export async function notifyUserCreateSuccess(treeName: string) {
  if (!functions) {
    console.warn("Firebase Functions not initialized");
    return;
  }

  try {
    const sessionId = getOrCreateSessionId();
    const notifyFunction = httpsCallable(functions, "notifyUserCreateSuccess");
    await notifyFunction({
      treeName,
      sessionId,
    });
  } catch (error) {
    console.error("Failed to send user create success notification:", error);
  }
}

/**
 * 편지 보내기 Discord 알림
 */
export async function notifySendLetter(
  senderName: string,
  messageContent: string,
  receiverName: string,
  receiverId: string,
  pokemonId: number
) {
  if (!functions) {
    console.warn("Firebase Functions not initialized");
    return;
  }

  try {
    const sessionId = getOrCreateSessionId();
    const notifyFunction = httpsCallable(functions, "notifySendLetterNew");
    await notifyFunction({
      senderName,
      messageContent,
      receiverName,
      receiverId,
      pokemonId,
      sessionId,
    });
  } catch (error) {
    console.error("Failed to send letter notification:", error);
  }
}
