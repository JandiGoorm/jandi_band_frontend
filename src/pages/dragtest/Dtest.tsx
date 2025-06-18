import React, { useState } from "react";
import "./Dtest.css";

export default function Dtest() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectMode, setSelectMode] = useState(false);

  const onTouchStart = (id: string, wasSelected: boolean) => {
    setIsDragging(true);
    setSelectMode(!wasSelected);
    setSelected((prev) =>
      selectMode ? prev.filter((i) => i !== id) : [...new Set([...prev, id])]
    );
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const id = el?.getAttribute("data-id");
    if (id && !selected.includes(id) && selectMode) {
      setSelected((prev) => [...prev, id]);
    }
  };

  const onTouchEnd = () => setIsDragging(false);

  const cells = Array.from({ length: 6 }, (_, i) => `cell-${i}`);

  return (
    <div
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "none" }}
      className="grid"
    >
      {cells.map((id) => (
        <div
          key={id}
          data-id={id}
          onTouchStart={() => onTouchStart(id, selected.includes(id))}
          className={`cell ${selected.includes(id) ? "active" : ""}`}
        >
          {id}
        </div>
      ))}
    </div>
  );
}
