import { useState } from "react";
import type { Category, Habit } from "../types";
import { getCompletionRate, getStreak } from "../utils";
import { categories } from "../constants";

interface HabitItemProps {
  habit: Habit;
  toggleHabit: (id: number) => void;
  deleteHabit: (id: number) => void;
  editHabit: (id: number, name: string, category: Category) => void;
  today: string;
}

const HabitItem = ({ habit, toggleHabit, deleteHabit, editHabit, today }: HabitItemProps) => {
  const streak = getStreak(habit);
  const completionRate = getCompletionRate(habit);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const [editCategory, setEditCategory] = useState(habit.category);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editName.trim() === "") {
      alert("습관 이름을 입력해주세요.");
      return;
    }
    editHabit(habit.id, editName, editCategory);
    setIsEditing(false);
  };

  return (
    <li className="habit-item">
      <input type="checkbox" onChange={() => toggleHabit(habit.id)} checked={!!habit.completedDates[today]} />

      {isEditing ? (
        <>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
          <select value={editCategory} onChange={(e) => setEditCategory(e.target.value as Category)}>
            {categories.map((cate) => (
              <option key={cate} value={cate}>
                {cate}
              </option>
            ))}
          </select>
        </>
      ) : (
        <span className="habit-name">{habit.name}</span>
      )}

      <div className="habit-meta">
        {streak > 0 && <span className="streak-badge">🔥 {streak}일</span>}

        <div className="completion-rate">
          <div className="completion-bar">
            <div className="completion-bar-fill" style={{ width: `${completionRate}%` }} />
          </div>
          <span className="completion-text">{completionRate.toFixed(0)}%</span>
        </div>

        <span className="habit-date">{new Date(habit.createdAt).toLocaleDateString("ko-KR")}</span>

        <div className="habit-actions">
          {isEditing ? (
            <button className="btn btn-add" onClick={handleSaveClick}>
              저장
            </button>
          ) : (
            <button className="btn btn-edit" onClick={handleEditClick}>
              수정
            </button>
          )}
          <button
            className="btn btn-delete"
            onClick={() => {
              if (confirm("정말 삭제하시겠어요?")) {
                deleteHabit(habit.id);
              }
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
};

export default HabitItem;
