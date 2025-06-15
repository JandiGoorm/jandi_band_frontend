import { useMemo } from "react";
import styles from "./TeamCard.module.css";
import {
  IoMusicalNote,
  IoMusicalNotes,
  IoMusicalNoteOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import type { TeamBasicResponse } from "@/types/team";

const getRandomTranslateY = () => {
  const min = -1; // rem
  const max = 1;
  const value = Math.random() * (max - min) + min;
  return `${value}rem`;
};

const TeamCards = ({ item }: { item: TeamBasicResponse }) => {
  const navigate = useNavigate();
  const transforms = useMemo(
    () => Array.from({ length: 3 }, getRandomTranslateY),
    []
  );

  return (
    <main
      className={styles.card}
      onClick={() => {
        if (item.id === undefined) return;
        navigate(buildPath(PageEndpoints.TEAM_DETAIL, { id: item.id }));
      }}
    >
      <div className={styles.notes}>
        <div
          className={styles.note}
          style={{ transform: `translateY(${transforms[0]})` }}
        >
          <IoMusicalNote size="3em" />
        </div>
        <div
          className={styles.note}
          style={{ transform: `translateY(${transforms[1]})` }}
        >
          <IoMusicalNotes size="3em" />
        </div>
        <div
          className={styles.note}
          style={{ transform: `translateY(${transforms[2]})` }}
        >
          <IoMusicalNoteOutline size="3em" />
        </div>
      </div>
      <p className={styles.text}>{item.name}</p>
    </main>
  );
};

export default TeamCards;
