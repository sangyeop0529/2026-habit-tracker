import { useState } from "react";
import type { Category } from "../types";
import { categories } from "../constants";

interface HabitInputProps {
  onAdd: (name: string, category: Category) => void;
}

const HabitInput = ({ onAdd }: HabitInputProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("운동");

  const handleAddHabit = () => {
    if (!name.trim()) return;
    onAdd(name, category);
    setCategory("운동");
    setName("");
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        {categories.map((cate) => (
          <option key={cate} value={cate}>
            {cate}
          </option>
        ))}
      </select>
      <button onClick={handleAddHabit}>생성</button>
    </div>
  );
};

export default HabitInput;
