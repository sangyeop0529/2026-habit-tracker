import type { Habit } from "./types";

export function getStreak(habit: Habit): number {
  let streak = 0;
  const date = new Date();

  while (true) {
    const dataStr = date.toISOString().split("T")[0];

    if (habit.completedDates[dataStr]) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getCompletionRate(habit: Habit): number {
  const allDateKeys = Object.keys(habit.completedDates);
  const completedCount = allDateKeys.filter((date) => habit.completedDates[date]).length;
  const created = new Date(habit.createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  return (completedCount / totalDays) * 100;
}
