import { useMemo } from "react";
import styles from "./VoteCards.module.css";
import { randomBars } from "@/utils/randomBars";

interface VoteCardsProps {
  title: string;
}
const VoteCards = ({ title }: VoteCardsProps) => {
  const bars = useMemo(() => randomBars(4), []);

  return (
    <main className={styles.card}>
      <div className={styles.bars}>
        {bars.map((bar, idx) => (
          <div
            key={idx}
            className={styles.bar}
            style={{ height: `${bar.height}px`, backgroundColor: bar.color }}
          />
        ))}
      </div>
      <p className={styles.text}>{title}</p>
    </main>
  );
};

export default VoteCards;
