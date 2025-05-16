import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import styles from "./UniversitySelect.module.css";

interface UniversitySelectProps {
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

const universities: string[] = [
  "서울대학교",
  "연세대학교",
  "고려대학교",
  "서강대학교",
  "한양대학교",
  "성균관대학교",
  "한국외국어대학교",
  "이화여자대학교",
  "경희대학교",
  "중앙대학교",
  "광운대학교",
  "국민대학교",
  "덕성여자대학교",
  "동국대학교",
  "세종대학교",
  "숭실대학교",
  "서울시립대학교",
  "한국과학기술원",
  "포항공과대학교",
  "광주과학기술원",
];

export const UniversitySelect = ({
  placeholder = "소속 대학교 선택",
}: UniversitySelectProps) => {
  const [value, setValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredUniversities = searchTerm
    ? universities.filter((uni) => uni.includes(searchTerm))
    : universities;

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setSearchTerm("");
  };

  return (
    <Select.Root
      value={value}
      onValueChange={handleValueChange}
      open={isOpen}
      onOpenChange={setIsOpen}
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
          <div className={styles.search_container}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSearchTerm(e.target.value);
              }}
              placeholder="대학교 검색..."
              className={styles.search_input}
            />
          </div>

          <Select.ScrollUpButton className={styles.scroll_button}>
            <FiChevronUp className={styles.icon} />
          </Select.ScrollUpButton>

          <Select.Viewport className={styles.viewport}>
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((university) => (
                <Select.Item
                  key={university}
                  value={university}
                  className={styles.item}
                >
                  <Select.ItemText>{university}</Select.ItemText>
                  <Select.ItemIndicator className={styles.item_indicator}>
                    <FiCheck className={styles.icon} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))
            ) : (
              <div className={styles.no_results}>검색 결과가 없습니다.</div>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton className={styles.scroll_button}>
            <FiChevronDown className={styles.icon} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default UniversitySelect;
