import type { Habit } from "../types";
import HabitItem from "./HabitItem";

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: number) => void;
  deleteHabit: (id: number) => void;
  today: string;
}

const HabitList = ({ habits, toggleHabit, deleteHabit, today }: HabitListProps) => {
  return (
    <ul>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} toggleHabit={toggleHabit} deleteHabit={deleteHabit} today={today} />
      ))}
    </ul>
  );
};

export default HabitList;
