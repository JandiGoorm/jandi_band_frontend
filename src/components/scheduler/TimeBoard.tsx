import clsx from "clsx";
import { range } from "./constants";
import { type Range } from "@/types/timeTable";
import styles from "./TimeBoard.module.css";
import { useCallback, useState, useRef } from "react";

interface TimeBoardProps {
  timeLineItems: string[];
  availableTimeSlots: Record<Range, string[]>;
  isEditable?: boolean;
  onTimeSlotChange?: (range: Range, time: string) => void;
}

const TimeBoard = ({
  timeLineItems,
  availableTimeSlots,
  isEditable = false,
  onTimeSlotChange,
}: TimeBoardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<"select" | "deselect">("select");
  const dragStartRef = useRef<{ day: Range; timeSlot: string } | null>(null);

  const isAvailableTime = useCallback(
    (day: Range, time: string) => {
      const daySlots = availableTimeSlots[day];
      if (!daySlots) return { isFirstHalf: false, isSecondHalf: false };

      const timeSlots = {
        isFirstHalf: daySlots.includes(`${time}:00`),
        isSecondHalf: daySlots.includes(`${time}:30`),
      };

      return timeSlots;
    },
    [availableTimeSlots]
  );

  const handleTimeSlotChange = useCallback(
    (day: Range, time: string) => {
      if (!isEditable || !onTimeSlotChange) return;

      onTimeSlotChange(day, time);
    },
    [isEditable, onTimeSlotChange]
  );

  const handleMouseDown = useCallback(
    (day: Range, timeSlot: string) => {
      if (!isEditable) return;

      setIsDragging(true);
      dragStartRef.current = { day, timeSlot };

      // 현재 선택 상태 확인하여 드래그 모드 결정
      const isCurrentlySelected =
        availableTimeSlots[day]?.includes(timeSlot) || false;
      setDragMode(isCurrentlySelected ? "deselect" : "select");

      // 첫 클릭 처리
      handleTimeSlotChange(day, timeSlot);
    },
    [availableTimeSlots, handleTimeSlotChange, isEditable]
  );

  const handleMouseEnter = useCallback(
    (day: Range, timeSlot: string) => {
      if (!isEditable || !isDragging) return;

      const isCurrentlySelected =
        availableTimeSlots[day]?.includes(timeSlot) || false;

      // 드래그 모드에 따라 선택/해제 결정
      if (
        (dragMode === "select" && !isCurrentlySelected) ||
        (dragMode === "deselect" && isCurrentlySelected)
      ) {
        handleTimeSlotChange(day, timeSlot);
      }
    },
    [availableTimeSlots, dragMode, handleTimeSlotChange, isDragging, isEditable]
  );

  const handleMouseUp = useCallback(() => {
    if (!isEditable) return;

    setIsDragging(false);
    dragStartRef.current = null;
  }, [isEditable]);

  return (
    <div
      className={styles.container}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {range.map((day) => {
        return (
          <div key={day} className={styles.time_board_item}>
            {timeLineItems.map((time) => {
              const { isFirstHalf, isSecondHalf } = isAvailableTime(day, time);

              return (
                <div key={time} className={styles.time_board_item_range}>
                  <div
                    className={clsx(
                      styles.time_board_item_range_first_half,
                      isFirstHalf && styles.active,
                      isEditable && styles.isEditableCell
                    )}
                    onMouseDown={() => handleMouseDown(day, `${time}:00`)}
                    onMouseEnter={() => handleMouseEnter(day, `${time}:00`)}
                  />

                  <div
                    className={clsx(
                      styles.time_board_item_range_second_half,
                      isSecondHalf && styles.active,
                      isEditable && styles.isEditableCell
                    )}
                    onMouseDown={() => handleMouseDown(day, `${time}:30`)}
                    onMouseEnter={() => handleMouseEnter(day, `${time}:30`)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TimeBoard;
