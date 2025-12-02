import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase/firebase";

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * 세션 ID 생성 및 저장
 */
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("analytics_session_id");

  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }

  return sessionId;
}

/**
 * Firebase Analytics & Google Analytics 이벤트 전송
 * @param eventName 이벤트 이름
 * @param params 추가 파라미터 (선택)
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  const sessionId = getOrCreateSessionId();
  const eventData = {
    session_id: sessionId,
    ...params,
  };

  // Firebase Analytics
  if (analytics) {
    logEvent(analytics, eventName, eventData);
  }

  // Google Analytics (gtag)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventData);
  }

  console.log(`[Analytics] ${eventName}`, eventData);
}

/**
 * 버튼 클릭 이벤트 전송
 * @param buttonName 버튼 이름
 * @param additionalParams 추가 파라미터 (선택)
 */
export function trackButtonClick(buttonName: string, additionalParams?: Record<string, unknown>) {
  trackEvent("button_click", {
    button_name: buttonName,
    ...additionalParams,
  });
}
