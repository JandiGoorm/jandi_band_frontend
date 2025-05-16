import styles from "./UniversitySelect.module.css";
import { useState, useCallback, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import { debounce } from "lodash-es";
import clsx from "clsx";

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
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setInputValue("");
    setSearchTerm("");
  };

  // 디바운스 함수를 컴포넌트 렌더링과 독립적으로 한 번만 생성
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilteredTerm = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 500),
    []
  );

  // 컴포넌트 언마운트 시 디바운스 함수 취소
  useEffect(() => {
    return () => {
      debouncedSetFilteredTerm.cancel();
    };
  }, [debouncedSetFilteredTerm]);

  // 입력값 변경 시 실시간으로 입력값은 보여주고, 필터링은 디바운스 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedSetFilteredTerm(newValue);
  };

  const isHidden = (university: string) => {
    if (!searchTerm || searchTerm === "") return false;
    return !university.includes(searchTerm);
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
              value={inputValue}
              onChange={handleInputChange}
              placeholder="대학교 검색..."
              className={styles.search_input}
            />
          </div>

          <Select.ScrollUpButton className={styles.scroll_button}>
            <FiChevronUp className={styles.icon} />
          </Select.ScrollUpButton>

          <Select.Viewport className={styles.viewport}>
            {universities.length > 0 ? (
              universities.map((university) => (
                <Select.Item
                  key={university}
                  value={university}
                  className={clsx(
                    styles.item,
                    isHidden(university) && styles.item_hidden
                  )}
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
