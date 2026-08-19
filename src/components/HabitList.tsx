import type { Category, Habit } from "../types";
import HabitItem from "./HabitItem";

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: number) => void;
  deleteHabit: (id: number) => void;
  editHabit: (id: number, name: string, category: Category) => void;
  today: string;
}

const HabitList = ({ habits, toggleHabit, deleteHabit, today, editHabit }: HabitListProps) => {
  return (
    <>
      {habits.length === 0 ? (
        <p className="empty-message">아직 습관이 없어요. 첫 습관을 추가해보세요!</p>
      ) : (
        <ul className="habit-list">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              toggleHabit={toggleHabit}
              deleteHabit={deleteHabit}
              editHabit={editHabit}
              today={today}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default HabitList;
