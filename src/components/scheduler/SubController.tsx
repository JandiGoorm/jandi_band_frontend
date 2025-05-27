import * as Switch from "@radix-ui/react-switch";
import styles from "./SubController.module.css";

interface SubControllerProps {
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const SubController = ({ onChange, disabled = true }: SubControllerProps) => {
  return (
    <section className={styles.container}>
      {!disabled && onChange && (
        <div className={styles.switch_container}>
          <Switch.Root
            className={styles.switch_root}
            onCheckedChange={onChange}
          >
            <Switch.Thumb className={styles.switch_thumb} />
          </Switch.Root>
          <span>전체 선택</span>
        </div>
      )}

      <div className={styles.sub_container}>
        <div className={styles.sub_item}>
          <div className={styles.available_box} />
          <p>가능</p>
        </div>

        <div className={styles.sub_item}>
          <div className={styles.unavailable_box} />
          <p>불가능</p>
        </div>
      </div>
    </section>
  );
};

export default SubController;
