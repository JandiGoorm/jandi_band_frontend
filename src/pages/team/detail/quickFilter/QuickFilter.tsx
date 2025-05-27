import styles from "./QuickFilter.module.css";
import clsx from "clsx";
import { useTeamController, useTeam } from "../TeamDetailProvider";
import { type Position } from "@/types/team";

const filterButtons: { label: string; type: Position | null }[] = [
  {
    label: "전체 보기",
    type: null,
  },
  {
    label: "기타 제외",
    type: "GUITAR",
  },
  {
    label: "드럼 제외",
    type: "DRUM",
  },
  {
    label: "보컬 제외",
    type: "VOCAL",
  },
  {
    label: "키보드 제외",
    type: "KEYBOARD",
  },
  {
    label: "베이스 제외",
    type: "BASS",
  },
];

const QuickFilter = () => {
  const { handleFilteredType, handleFilterdTypeReset } = useTeamController();
  const { filteredTypes, activeIds, team } = useTeam();

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
                    team?.members.length === activeIds.length &&
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
