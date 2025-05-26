import { useMemo } from "react";
import styles from "./VoteCards.module.css";
import { randomBars } from "@/utils/randomBars";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";

interface VoteCardsProps {
  title?: string;
  id?: number;
}
const VoteCards = ({ title, id }: VoteCardsProps) => {
  const navigate = useNavigate();
  const bars = useMemo(() => randomBars(4), []);

  return (
    <main
      className={styles.card}
      onClick={() => {
        if (id === undefined) return;
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
      <p className={styles.text}>{title}</p>
    </main>
  );
};

export default VoteCards;
