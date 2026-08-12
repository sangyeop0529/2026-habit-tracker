import type { Habit } from "../types";
import { getStreak } from "../utils";

interface HabitItemProps {
  habit: Habit;
  toggleHabit: (id: number) => void;
  deleteHabit: (id: number) => void;
  today: string;
}

const HabitItem = ({ habit, toggleHabit, deleteHabit, today }: HabitItemProps) => {
  const streak = getStreak(habit);

  return (
    <li>
      <input type="checkbox" onChange={() => toggleHabit(habit.id)} checked={!!habit.completedDates[today]} />
      <p>{habit.name}</p>
      {streak > 0 ? <p>🔥 {streak}일 연속</p> : null}
      <span>{new Date(habit.createdAt).toLocaleString("ko-KR")}</span>
      <button onClick={() => deleteHabit(habit.id)}>삭제</button>
    </li>
  );
};

export default HabitItem;
