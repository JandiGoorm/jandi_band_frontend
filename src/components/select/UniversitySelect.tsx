import styles from "./UniversitySelect.module.css";
import { useState, useCallback, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import { debounce } from "lodash-es";
import clsx from "clsx";
import { useGetUniversities } from "@/apis/univ";
import Loading from "@/components/loading/Loading";
import type { University } from "@/types/univ";

interface UniversitySelectProps {
  onValueChange: (university: University) => void;
  placeholder?: string;
}

export const UniversitySelect = ({
  placeholder = "소속 대학교 선택",
  onValueChange,
}: UniversitySelectProps) => {
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: universities, isLoading } = useGetUniversities();

  const handleValueChange = useCallback(
    (newValue: string) => {
      setSearchTerm("");
      const selectedUniversity = universities?.data.find(
        (university) => university.name === newValue
      );

      if (selectedUniversity) {
        setSelectedUniversity(selectedUniversity);
        onValueChange(selectedUniversity);
      }
    },
    [onValueChange, universities?.data]
  );

  // 디바운스 함수를 컴포넌트 렌더링과 독립적으로 한 번만 생성
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilteredTerm = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 500),
    []
  );

  // 입력값 변경 시 실시간으로 입력값은 보여주고, 필터링은 디바운스 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilteredTerm(e.target.value);
  };

  const isHidden = (university: string) => {
    if (!searchTerm || searchTerm === "") return false;
    return !university.includes(searchTerm);
  };

  // 컴포넌트 언마운트 시 디바운스 함수 취소
  useEffect(() => {
    return () => {
      debouncedSetFilteredTerm.cancel();
    };
  }, [debouncedSetFilteredTerm]);

  if (isLoading || !universities || !universities.data.length)
    return <Loading />;

  return (
    <Select.Root
      value={selectedUniversity?.name || ""}
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
              onChange={handleInputChange}
              placeholder="대학교 검색..."
              className={styles.search_input}
            />
          </div>

          <Select.ScrollUpButton className={styles.scroll_button}>
            <FiChevronUp className={styles.icon} />
          </Select.ScrollUpButton>

          <Select.Viewport className={styles.viewport}>
            {universities.data.length > 0 ? (
              universities.data.map((university) => (
                <Select.Item
                  key={university.id}
                  value={university.name}
                  className={clsx(
                    styles.item,
                    isHidden(university.name) && styles.item_hidden
                  )}
                >
                  <Select.ItemText>{university.name}</Select.ItemText>
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
