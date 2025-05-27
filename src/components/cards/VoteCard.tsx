import { useMemo } from "react";
import styles from "./VoteCard.module.css";
import { randomBars } from "@/utils/randomBars";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import type { Poll } from "@/types/poll";

const VoteCard = ({ item }: { item: Poll }) => {
  const navigate = useNavigate();
  const bars = useMemo(() => randomBars(4), []);

  return (
    <main
      className={styles.card}
      onClick={() => {
        if (item.id === undefined) return;
        navigate(PageEndpoints.VOTE);
      }}
    >
      <div className={styles.bars}>
        {bars.map((bar, idx) => (
          <div
            key={idx}
            className={styles.bar}
            style={{ height: `${bar.height}px`, backgroundColor: bar.color }}
          />
        ))}
      </div>
      <p className={styles.text}>{item.title}</p>
    </main>
  );
};

export default VoteCard;
