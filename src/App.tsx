import { useEffect, useState } from "react";
import HabitInput from "./components/HabitInput";
import type { Habit } from "./types";
import HabitList from "./components/HabitList";

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const onAdd = (name: string) => {
    const newHabit = {
      id: Date.now(),
      name: name,
      createdAt: new Date().toISOString(),
      completed: false,
    };

    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <>
      <HabitInput onAdd={onAdd} />
      <HabitList habits={habits} toggleHabit={toggleHabit} deleteHabit={deleteHabit} />
    </>
  );
}

export default App;
