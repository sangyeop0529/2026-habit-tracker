# 🌱 습관 트래커 (Habit Tracker)

매일의 습관을 기록하고, 연속 달성일과 완료율을 한눈에 확인할 수 있는 습관 관리 웹앱입니다.
React + TypeScript로 프론트엔드 기초를 다지며 실제 기능 단위로 쌓아 올린 실습 프로젝트입니다.

## 데모

> 배포 후 링크 추가 예정
> 스크린샷 추가 예정

## 주요 기능

- **습관 추가/삭제/수정** — 이름과 카테고리(운동/공부/건강/기타)를 지정해 관리
- **완료 체크 토글** — 날짜별로 완료 여부를 기록 (`completedDates: Record<string, boolean>`)
- **연속 달성일(Streak) 계산** — 오늘부터 거슬러 올라가며 끊기지 않은 연속 기록 일수를 자동 계산
- **완료율 통계** — 습관 생성일부터 오늘까지 대비 실제 완료한 날의 비율을 프로그레스 바로 표시
- **카테고리별 필터링** — 원하는 카테고리만 골라서 보기
- **정렬 기능** — 연속일 순 / 완료율 순으로 목록 정렬
- **localStorage 연동** — 새로고침해도 데이터가 유지되며, `useLocalStorage` 커스텀 훅으로 재사용 가능하게 구현
- **반응형 레이아웃** — 모바일 화면에서도 자연스럽게 배치되도록 대응
- **삭제 확인 절차** — 실수로 인한 데이터 손실 방지

## 기술 스택

- **React** + **TypeScript**
- **Vite**
- 순수 **CSS** (디자인 토큰 기반 커스텀 스타일링)
- **localStorage** 기반 클라이언트 사이드 데이터 저장

## 실행 방법

```bash
git clone <repo-url>
cd 2026-habit-tracker
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 프로젝트 구조

```
src/
├── components/
│   ├── HabitInput.tsx    # 습관 추가 폼
│   ├── HabitList.tsx     # 습관 목록 렌더링
│   └── HabitItem.tsx     # 개별 습관 카드 (토글/수정/삭제)
├── hooks/
│   └── useLocalStorage.ts # localStorage 동기화 커스텀 훅
├── types.ts               # Habit, Category, SortBy 등 타입 정의
├── constants.ts            # 카테고리 목록 등 공용 상수
├── utils.ts                 # getStreak, getCompletionRate 계산 로직
├── App.tsx
├── App.css
└── index.css
```

## 배운 점

- `useState`의 **lazy initializer**와 `useEffect`를 활용한 localStorage 동기화, 그리고 이를 **커스텀 훅으로 추상화**하는 과정
- 날짜 데이터를 다룰 때의 문자열 변환, 밀리초 계산, `while` 루프를 이용한 연속일 계산 로직 설계
- `Record`, union type 등 TypeScript 타입을 실제 데이터 구조 설계에 적용하는 경험
- React에서 상태 불변성을 지키며 배열/객체를 업데이트하는 패턴 (spread, `map`, `filter`)
- 컴포넌트 책임 분리와 prop 설계 (객체 통째로 전달 vs 개별 필드 전달)
- 사용자 경험을 고려한 예외 처리 (빈 값 검증, 삭제 확인, 빈 목록 안내)

## 다음에 추가하고 싶은 기능

- 습관별 상세 통계 (주간/월간 완료 추이)
- 다크 모드
