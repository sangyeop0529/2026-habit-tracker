import { useEffect, useState } from "react";
import HabitInput from "./components/HabitInput";
import type { Category, CategoryFilter, Habit } from "./types";
import HabitList from "./components/HabitList";
import { categories } from "./constants";

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("전체");

  const today = new Date().toISOString().split("T")[0];

  const onAdd = (name: string, category: Category) => {
    const newHabit = {
      id: Date.now(),
      name: name,
      createdAt: new Date().toISOString(),
      completedDates: {}, // 처음엔 완료 기록 없음
      category: category,
    };

    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDates: {
                ...habit.completedDates,
                [today]: !habit.completedDates[today],
              },
            }
          : habit,
      ),
    );
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const filteredHabits =
    selectedCategory === "전체" ? habits : habits.filter((habit) => habit.category === selectedCategory);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <>
      <HabitInput onAdd={onAdd} />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as CategoryFilter)}>
        <option value="전체">전체</option>
        {categories.map((cate) => (
          <option key={cate} value={cate}>
            {cate}
          </option>
        ))}
      </select>
      <HabitList habits={filteredHabits} toggleHabit={toggleHabit} deleteHabit={deleteHabit} today={today} />
    </>
  );
}

export default App;
