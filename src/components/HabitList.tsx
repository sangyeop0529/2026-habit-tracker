import type { Habit } from "../types";
import HabitItem from "./HabitItem";

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: number) => void;
  deleteHabit: (id: number) => void;
}

const HabitList = ({ habits, toggleHabit, deleteHabit }: HabitListProps) => {
  return (
    <ul>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} toggleHabit={toggleHabit} deleteHabit={deleteHabit} />
      ))}
    </ul>
  );
};

export default HabitList;
