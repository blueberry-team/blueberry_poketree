/**
 * 시간대 enum
 */
export enum TimeOfDay {
  DAY = 'day',
  NIGHT = 'night',
}

/**
 * 현재 시간을 기준으로 낮/밤을 판단하는 유틸리티 함수
 * - 오후 6시(18:00) ~ 오전 6시(06:00): night
 * - 오전 6시(06:00) ~ 오후 6시(18:00): day
 */
export function getTimeOfDay(): TimeOfDay {
  const now = new Date();
  const hour = now.getHours();

  // 18시(오후 6시) 이상이거나 6시(오전 6시) 미만이면 밤
  if (hour >= 18 || hour < 6) {
    return TimeOfDay.NIGHT;
  }

  return TimeOfDay.DAY;
}
