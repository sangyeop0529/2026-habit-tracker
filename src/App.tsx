import { useState } from "react";
import HabitInput from "./components/HabitInput";
import type { SortBy, Category, CategoryFilter, Habit } from "./types";
import HabitList from "./components/HabitList";
import { categories } from "./constants";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";
import { getCompletionRate, getStreak } from "./utils";

function App() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("전체");
  const [sortBy, setSortBy] = useState<SortBy>("없음");

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

  const editHabit = (id: number, name: string, category: Category) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, name, category } : habit)));
  };

  const filteredHabits =
    selectedCategory === "전체" ? habits : habits.filter((habit) => habit.category === selectedCategory);

  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (sortBy === "streak") return getStreak(b) - getStreak(a);
    if (sortBy === "완료율") return getCompletionRate(b) - getCompletionRate(a);
    return 0;
  });

  return (
    <>
      <HabitInput onAdd={onAdd} />
      <div className="controls">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as CategoryFilter)}>
          <option value="전체">전체</option>
          {categories.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
          <option value="없음">정렬 없음</option>
          <option value="streak">🔥 연속일 순</option>
          <option value="완료율">완료율 순</option>
        </select>
      </div>
      <HabitList
        habits={sortedHabits}
        toggleHabit={toggleHabit}
        deleteHabit={deleteHabit}
        editHabit={editHabit}
        today={today}
      />
    </>
  );
}

export default App;
