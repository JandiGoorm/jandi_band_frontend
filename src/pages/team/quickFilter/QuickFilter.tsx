import { useState } from "react";
import styles from "./QuickFilter.module.css";
import clsx from "clsx";

const filterButtons = [
  "기타 제외",
  "드럼 제외",
  "보컬 제외",
  "키보드 제외",
  "베이스 제외",
];

const QuickFilter = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");

  const handleActiveFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter("");
    } else {
      setActiveFilter(filter);
    }
  };

  return (
    <section className={styles.container}>
      <h2>간편 조회</h2>

      <div className={styles.filter_container}>
        {filterButtons.map((button) => (
          <button
            className={clsx(
              styles.filter_item,
              activeFilter === button && styles.active
            )}
            onClick={() => handleActiveFilter(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickFilter;
