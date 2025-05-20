import styles from "./QuickFilter.module.css";
import clsx from "clsx";
import { useTeamStore } from "../teamStore";
import useTeamController from "../useTeamController";
import type { Position } from "../constants";

const filterButtons: { label: string; type: Position | null }[] = [
  {
    label: "전체 보기",
    type: null,
  },
  {
    label: "기타 제외",
    type: "Guitar",
  },
  {
    label: "드럼 제외",
    type: "Drum",
  },
  {
    label: "보컬 제외",
    type: "Vocal",
  },
  {
    label: "키보드 제외",
    type: "Keyboard",
  },
  {
    label: "베이스 제외",
    type: "Bass",
  },
];

const QuickFilter = () => {
  const { filteredTypes, team, activeIds } = useTeamStore();
  const { handleFilteredType, handleFilterdTypeReset } = useTeamController();

  return (
    <section className={styles.container}>
      <h2>간편 조회</h2>

      <div className={styles.filter_container}>
        {filterButtons.map((button) => (
          <button
            className={clsx(
              styles.filter_item,
              button.type
                ? filteredTypes.includes(button.type) && styles.active
                : !filteredTypes.length &&
                    team.members.length === activeIds.length &&
                    styles.active
            )}
            onClick={() =>
              button.type
                ? handleFilteredType(button.type)
                : handleFilterdTypeReset()
            }
            key={`filter_${button.label}`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickFilter;
