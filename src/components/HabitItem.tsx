import type { Habit } from "../types";

interface HabitItemProps {
  habit: Habit;
  toggleHabit: (id: number) => void;
  deleteHabit: (id: number) => void;
}

const HabitItem = ({ habit, toggleHabit, deleteHabit }: HabitItemProps) => {
  return (
    <li>
      <input type="checkbox" onChange={() => toggleHabit(habit.id)} checked={habit.completed} />
      <p>{habit.name}</p>
      <span>{new Date(habit.createdAt).toLocaleString("ko-KR")}</span>
      <button onClick={() => deleteHabit(habit.id)}>삭제</button>
    </li>
  );
};

export default HabitItem;
