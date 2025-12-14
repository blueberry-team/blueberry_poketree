/**
 * ButtonDebouncer - 버튼 클릭 이벤트에 디바운싱을 적용하는 유틸리티 클래스
 */
export class ButtonDebouncer {
  private timeoutId: NodeJS.Timeout | null = null;
  private isProcessing: boolean = false;

  /**
   * 디바운싱을 적용한 함수를 생성합니다.
   * @param callback - 실행할 콜백 함수
   * @param delay - 디바운스 지연 시간 (밀리초)
   * @returns 디바운싱이 적용된 함수
   */
  debounce<T extends (...args: unknown[]) => void | Promise<void>>(
    callback: T,
    delay: number = 1000
  ): T {
    return ((...args: unknown[]) => {
      // 이미 처리 중이면 무시
      if (this.isProcessing) {
        return;
      }

      // 이전 타이머가 있으면 취소
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      // 새로운 타이머 설정
      this.timeoutId = setTimeout(async () => {
        this.isProcessing = true;
        try {
          await callback(...args);
        } finally {
          this.isProcessing = false;
        }
      }, delay);
    }) as T;
  }

  /**
   * 즉시 실행 디바운싱 (leading edge debounce)
   * 첫 클릭은 즉시 실행하고, 이후 연속 클릭은 무시합니다.
   * @param callback - 실행할 콜백 함수
   * @returns 디바운싱이 적용된 함수
   */
  debounceLeading<T extends (...args: unknown[]) => void | Promise<void>>(
    callback: T
  ): T {
    return ((...args: unknown[]) => {
      // 이미 처리 중이면 무시
      if (this.isProcessing) {
        return;
      }

      this.isProcessing = true;

      // 즉시 실행
      Promise.resolve(callback(...args))
        .catch((error) => {
          console.error('ButtonDebouncer: Error in callback', error);
        })
        .finally(() => {
          // 비동기 작업 완료 여부와 관계없이 1초 후 다시 클릭 가능하도록 설정
          setTimeout(() => {
            this.isProcessing = false;
          }, 1000);
        });
    }) as T;
  }

  /**
   * 현재 대기 중인 타이머를 취소합니다.
   */
  cancel(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isProcessing = false;
  }
}

/**
 * 간편한 사용을 위한 헬퍼 함수
 */
export function createButtonDebouncer() {
  return new ButtonDebouncer();
}
