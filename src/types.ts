export type Category = "운동" | "공부" | "건강" | "기타";

export interface Habit {
  id: number;
  name: string;
  createdAt: string;
  completedDates: Record<string, boolean>; // { "2026-01-01": true }
  category: Category;
}

export type CategoryFilter = Category | "전체";
