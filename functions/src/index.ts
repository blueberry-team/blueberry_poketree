/**
 * Firebase Cloud Functions for Discord Notifications
 * - 회원가입 성공 시 Discord 알림
 * - 메시지 보내기 시 Discord 알림
 */

import * as functions from "firebase-functions/v2/https";

// Discord 웹훅 URL
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1445446231902916760/KL31xCRcvgnMIj067oKAqeD8KyHaRnUfHcCcyrVYjoU5O22nQhGLSItMTz7PTVASLx5O";

/**
 * Discord 웹훅으로 메시지 전송
 */
async function sendToDiscord(message: any): Promise<void> {
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }

    console.log("Discord notification sent successfully");
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
    throw error;
  }
}

/**
 * 회원가입 성공 알림
 * 클라이언트에서 호출하는 HTTPS Callable Function
 */
export const notifyUserCreateSuccess = functions.onCall(async (request) => {
  const {treeName, sessionId} = request.data;

  const discordMessage = {
    content: "**🎉 새로운 유저가 포케트리를 만들었습니다! 🎉**",
    embeds: [{
      title: "✨ 회원가입 성공",
      description: "새로운 트리가 생성되었습니다.",
      color: 5763719, // 녹색
      fields: [
        {
          name: "트리 이름",
          value: treeName || "N/A",
          inline: true,
        },
        {
          name: "세션 ID",
          value: sessionId || "N/A",
          inline: true,
        },
      ],
      footer: {
        text: `시간: ${new Date().toLocaleString("ko-KR")}`,
      },
    }],
  };

  await sendToDiscord(discordMessage);
  return {success: true};
});

/**
 * 편지 보내기 알림
 * 클라이언트에서 호출하는 HTTPS Callable Function
 */
export const notifySendLetter = functions.onCall(async (request) => {
  const {senderName, messageContent, receiverName, receiverId, sessionId} = request.data;

  const discordMessage = {
    content: "**💌 새로운 편지가 전송되었습니다! 💌**",
    embeds: [{
      title: "📮 편지 보내기",
      description: "사용자가 포케트리에 편지를 보냈습니다.",
      color: 3447003, // 파란색
      fields: [
        {
          name: "보낸 사람",
          value: senderName || "N/A",
          inline: true,
        },
        {
          name: "받는 사람",
          value: `${receiverName || "N/A"} (${receiverId || "N/A"})`,
          inline: true,
        },
        {
          name: "메시지 내용",
          value: messageContent || "N/A",
          inline: false,
        },
        {
          name: "세션 ID",
          value: sessionId || "N/A",
          inline: false,
        },
      ],
      footer: {
        text: `시간: ${new Date().toLocaleString("ko-KR")}`,
      },
    }],
  };

  await sendToDiscord(discordMessage);
  return {success: true};
});
