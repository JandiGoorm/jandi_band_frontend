import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import styles from "./PositionSelect.module.css";

type Position = {
  value: string;
  label: string;
};

const positions: Position[] = [
  { value: "vocalist", label: "보컬" },
  { value: "guitarist", label: "기타" },
  { value: "bassist", label: "베이스" },
  { value: "drummer", label: "드럼" },
  { value: "keyboardist", label: "키보드" },
  { value: "etc", label: "그 외" },
];

interface PositionSelectProps {
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const PositionSelect = ({
  onValueChange,
  placeholder = "포지션 선택",
}: PositionSelectProps) => {
  const [value, setValue] = useState("");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <Select.Root value={value} onValueChange={handleValueChange}>
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
                className={styles.item}
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
