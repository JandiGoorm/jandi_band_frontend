import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import styles from "./PositionSelect.module.css";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { positions, type signUpFormSchema } from "./constants";
import { useCallback } from "react";

interface PositionSelectProps {
  placeholder?: string;
  formController: UseFormReturn<z.infer<typeof signUpFormSchema>>;
}

export const PositionSelect = ({
  placeholder = "포지션 선택",
  formController,
}: PositionSelectProps) => {
  const { setValue, getValues } = formController;

  const handleValueChange = useCallback(
    (value: string) => {
      setValue("position", value);
    },
    [setValue]
  );

  return (
    <Select.Root
      value={getValues("position")}
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
