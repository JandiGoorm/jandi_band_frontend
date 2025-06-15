import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import styles from "./PositionSelect.module.css";
import { useState, useCallback } from "react";
import { positions } from "./constants";
import clsx from "clsx";

interface PositionSelectProps {
  // value?: string | null ;
  placeholder?: string;
  onValueChange: (position: string) => void;
}

export const PositionSelect = ({
  // value,
  placeholder = "포지션 선택",
  onValueChange,
}: PositionSelectProps) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const handleValueChange = useCallback(
    (value: string) => {
      setSelectedPosition(value);
      onValueChange(value);
    },
    [onValueChange]
  );

  return (
    <Select.Root
      value={selectedPosition || ""}
      onValueChange={handleValueChange}
    >
      <Select.Trigger className={styles.trigger} aria-label={placeholder}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <FiChevronDown className={styles.icon} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={styles.content}
          position="popper"
          sideOffset={4}
          avoidCollisions={false}
        >
          <Select.ScrollUpButton className={styles.scroll_button}>
            <FiChevronUp className={styles.icon} />
          </Select.ScrollUpButton>

          <Select.Viewport className={styles.viewport}>
            {positions.map((position) => (
              <Select.Item
                key={position.value}
                value={position.value}
                className={clsx(styles.item)}
              >
                <Select.ItemText>{position.label}</Select.ItemText>
                <Select.ItemIndicator className={styles.item_indicator}>
                  <FiCheck className={styles.icon} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className={styles.scroll_button}>
            <FiChevronDown className={styles.icon} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default PositionSelect;
