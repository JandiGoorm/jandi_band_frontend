import clsx from "clsx";
import { range } from "./constants";
import { SelectableAreaContainer, SelectableAreaItem } from "./SelectableArea";
import styles from "./TimeBoard.module.css";

interface TimeBoardProps {
  timeLineItems: string[];
  isEditable?: boolean;
}

const TimeBoard = ({ timeLineItems, isEditable = false }: TimeBoardProps) => {
  return (
    <SelectableAreaContainer className={styles.container}>
      {range.map((day) => {
        return (
          <div key={day} className={styles.time_board_item}>
            {timeLineItems.map((time) => {
              return (
                <div key={time} className={styles.time_board_item_range}>
                  <SelectableAreaItem id={`${day}-${time}:00`}>
                    {({ isSelected }) => (
                      <div
                        className={clsx(
                          styles.time_board_item_range_first_half,
                          isSelected && styles.active,
                          isEditable && styles.isEditableCell
                        )}
                      />
                    )}
                  </SelectableAreaItem>

                  <SelectableAreaItem id={`${day}-${time}:30`}>
                    {({ isSelected }) => (
                      <div
                        className={clsx(
                          styles.time_board_item_range_second_half,
                          isSelected && styles.active,
                          isEditable && styles.isEditableCell
                        )}
                      />
                    )}
                  </SelectableAreaItem>
                </div>
              );
            })}
          </div>
        );
      })}
    </SelectableAreaContainer>
  );
};

export default TimeBoard;
