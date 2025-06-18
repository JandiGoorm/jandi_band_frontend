import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./ReportModal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DeleteModalProps {
  trigger: React.ReactNode;
  title: string;
  onReport: (description: string, reasonId: number) => void;
  description?: string;
}

const reportReasons = [
  { id: 1, label: "스팸/도배", value: "SPAM" },
  { id: 2, label: "부적절한 내용", value: "INAPPROPRIATE_CONTENT" },
  { id: 3, label: "괴롭힘/혐오 표현", value: "HARASSMENT" },
  { id: 4, label: "허위 정보", value: "FALSE_INFORMATION" },
  { id: 5, label: "저작권 위반", value: "COPYRIGHT_VIOLATION" },
  { id: 6, label: "기타", value: "OTHER" },
];
const ReportModal = ({
  trigger,
  title,
  onReport,
  description,
}: DeleteModalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedReason, setSelectedReason] = useState<string>("SPAM");

  return (
    <Modal trigger={trigger} title={title}>
      {(setOpen) => {
        const handleReport = () => {
          const value = textareaRef.current?.value.trim();
          const selected = reportReasons.find(
            (r) => r.value === selectedReason
          );
          if (value && selected) {
            onReport(value, selected.id);
            setOpen(false);
          }
        };

        return (
          <div className={styles.container}>
            <p className={styles.description}>{description}</p>

            <Select.Root
              value={selectedReason}
              onValueChange={setSelectedReason}
            >
              <Select.Trigger className={styles.select_trigger}>
                <Select.Value />
                <Select.Icon>
                  <FiChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className={styles.select_content}
                  position="popper"
                  sideOffset={4}
                >
                  <Select.Viewport>
                    {reportReasons.map((reason) => (
                      <Select.Item
                        key={reason.value}
                        value={reason.value}
                        className={styles.select_item}
                      >
                        <Select.ItemText>{reason.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            <textarea
              className={styles.report_box}
              placeholder="신고 내용을 입력하세요."
              ref={textareaRef}
            />

            <div className={styles.button_container}>
              <Dialog.Close asChild>
                <Button type="button" variant="secondary">
                  취소
                </Button>
              </Dialog.Close>

              <Button type="button" variant="secondary" onClick={handleReport}>
                신고
              </Button>
            </div>
          </div>
        );
      }}
    </Modal>
  );
};

export default ReportModal;
