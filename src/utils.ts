import type { Habit } from "./types";

export function getStreak(habit: Habit): number {
  let streak = 0; // 연속 달성일 카운터, 0부터 시작
  const date = new Date(); // 오늘 날짜로 초기화 (이후 계속 하루씩 뒤로 이동시킬 변수)

  while (true) {
    // 조건 없이 무한 반복 — 내부 break로만 멈춤
    const dataStr = date.toISOString().split("T")[0];
    // date를 "2026-08-11T05:04:46.497Z" 같은 문자열로 바꾸고
    // "T" 기준으로 잘라서 앞부분("2026-08-11")만 추출
    // → completedDates 객체의 key 형식과 맞춰주기 위함

    if (habit.completedDates[dataStr]) {
      // completedDates 객체에 오늘(혹은 지금 확인 중인 날짜) key가 있고 true라면
      // → "이 날은 완료했다"는 뜻
      streak++; // 연속일 카운트 1 증가
      date.setDate(date.getDate() - 1);
      // date의 "일(day)" 값을 하루 전으로 이동
      // → 다음 반복에서 "그 전날"을 확인하게 됨
      // (getDate: 현재 date의 일 값을 가져옴 / setDate: 그 값을 다시 설정)
      // 월/연도 경계도 JS Date가 자동으로 처리해줌 (예: 8/1 - 1일 = 7/31)
    } else {
      // completedDates에 해당 날짜 key가 없거나 false라면
      // → "연속 기록이 끊겼다"는 뜻이므로 더 볼 필요 없음
      break; // while 루프 탈출
    }
  }

  return streak; // 루프가 끝난 시점의 최종 연속일 수 반환
}
