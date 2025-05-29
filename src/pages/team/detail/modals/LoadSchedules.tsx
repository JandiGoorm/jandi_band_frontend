import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import styles from "./LoadSchedules.module.css";
import { FiPlus } from "react-icons/fi";

const LoadSchedules = () => {
  return (
    <Modal
      trigger={
        <Button variant="secondary" className={styles.load_schedules_button}>
          <FiPlus size={20} />
        </Button>
      }
      title="내 시간표 가져오기"
    >
      <section>
        <h3>일정 불러오기</h3>
      </section>
    </Modal>
  );
};

export default LoadSchedules;
