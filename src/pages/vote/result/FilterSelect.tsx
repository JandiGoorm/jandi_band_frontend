// 레딕스 UI 필터
import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import styles from "@/pages/vote/result/FilterSelect.module.css";

const options = [
  { value: "기본", label: "기본" },
  { value: "좋아요", label: "좋아요 순" },
  { value: "싫어요", label: "별로에요 순" },
  { value: "묶기", label: "긍정:부정 묶어보기" },
];

interface FilterSelectProps {
  onChange: (value: string) => void;
}

export default function FilterSelect({ onChange }: FilterSelectProps) {
  return (
    <Select.Root defaultValue="기본" onValueChange={onChange}>
      <Select.Trigger className={styles.result_filter} aria-label="정렬 필터">
        <Select.Value placeholder="정렬 기준" />
        <Select.Icon>
          <FiChevronDown className={styles.icon} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={styles.content}
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className={styles.viewport}>
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className={styles.item}
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator className={styles.item_indicator}>
                  <FiCheck className={styles.icon} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
