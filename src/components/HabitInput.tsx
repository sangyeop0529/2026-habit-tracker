import { useState } from "react";

interface HabitInputProps {
  onAdd: (name: string) => void;
}

const HabitInput = ({ onAdd }: HabitInputProps) => {
  const [name, setName] = useState("");

  const handleAddHabit = () => {
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddHabit}>생성</button>
    </div>
  );
};

export default HabitInput;
