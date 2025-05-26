import { useMemo } from "react";
import styles from "./TeamCards.module.css";
import {
  IoMusicalNote,
  IoMusicalNotes,
  IoMusicalNoteOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";

interface TeamCardsProps {
  title?: string;
  id?: number;
}

const getRandomTranslateY = () => {
  const min = -1; // rem
  const max = 1;
  const value = Math.random() * (max - min) + min;
  return `${value}rem`;
};

const TeamCards = ({ title, id }: TeamCardsProps) => {
  const navigate = useNavigate();
  const transforms = useMemo(
    () => Array.from({ length: 3 }, getRandomTranslateY),
    []
  );
  return (
    <main
      className={styles.card}
      onClick={() => {
        if (id === undefined) return;
        navigate(buildPath(PageEndpoints.TEAM, { id }));
      }}
    >
      <div className={styles.notes}>
        <div
          className={styles.note}
          style={{ transform: `translateY(${transforms[0]})` }}
        >
          <IoMusicalNote size={48} />
        </div>
        <div
          className={styles.note}
          style={{ transform: `translateY(${transforms[1]})` }}
        >
          <IoMusicalNotes size={48} />
        </div>
        <div
          className={styles.note}
          style={{ transform: `translateY(${transforms[2]})` }}
        >
          <IoMusicalNoteOutline size={48} />
        </div>
      </div>
      <p className={styles.text}>{title}</p>
    </main>
  );
};

export default TeamCards;
