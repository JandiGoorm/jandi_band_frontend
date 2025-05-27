import styles from "./MemberSelect.module.css";
import { useState, useCallback, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import { debounce } from "lodash-es";
import clsx from "clsx";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { members, type teamCreateFormSchema } from "./constants";

interface MemberSelectProps {
  formController: UseFormReturn<z.infer<typeof teamCreateFormSchema>>;
  placeholder?: string;
}

export const MemberSelect = ({
  placeholder = "팀 멤버 선택",
  formController,
}: MemberSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { setValue, getValues } = formController;

  const handleValueChange = useCallback(
    (newValue: string) => {
      setSearchTerm("");
      setValue("member", newValue);
    },
    [setValue]
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

  const isHidden = (member: string) => {
    if (!searchTerm || searchTerm === "") return false;
    return !member.includes(searchTerm);
  };

  // 컴포넌트 언마운트 시 디바운스 함수 취소
  useEffect(() => {
    return () => {
      debouncedSetFilteredTerm.cancel();
    };
  }, [debouncedSetFilteredTerm]);

  return (
    <Select.Root
      value={getValues("member")}
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
              placeholder="동아리 멤버 검색..."
              className={styles.search_input}
            />
          </div>

          <Select.ScrollUpButton className={styles.scroll_button}>
            <FiChevronUp className={styles.icon} />
          </Select.ScrollUpButton>

          <Select.Viewport className={styles.viewport}>
            {members.length > 0 ? (
              members.map((member) => (
                <Select.Item
                  key={member}
                  value={member}
                  className={clsx(
                    styles.item,
                    isHidden(member) && styles.item_hidden
                  )}
                >
                  <Select.ItemText>{member}</Select.ItemText>
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

export default MemberSelect;
