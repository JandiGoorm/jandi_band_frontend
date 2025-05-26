import styles from "./ClubInfo.module.css";
import { FaInstagram } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiGuitar, GiPianoKeys, GiDrumKit } from "react-icons/gi";
import { PiMicrophoneStage } from "react-icons/pi";
import type { ClubDetailResponse, ClubMemberResponse } from "@/types/club";
import type { UserInfo } from "@/types/auth";

const ClubInfo = ({
  club,
  mydata,
  memberData,
}: {
  club: ClubDetailResponse;
  mydata: UserInfo;
  memberData: ClubMemberResponse;
}) => {
  console.log(club);
  console.log(mydata);
  return (
    <main className={styles.container}>
      <header className={styles.banner}>
        <img src={club.photoUrl} className={styles.banner} />
      </header>

      <section className={styles.title_box}>
        <div className={styles.info_title}>
          <p className={styles.title}>{club.name}</p>
          <p className={styles.school}>
            {club.university?.name ?? "연합 동아리"}
          </p>
        </div>
        {club.instagramId ? (
          <FaInstagram
            size={36}
            className={styles.instagram_icon}
            onClick={() => window.open(club.instagramId, "_blank")}
          />
        ) : null}
      </section>

      <section className={styles.member_box}>
        <div className={styles.member}>
          <FaPeopleGroup />
          <p>{memberData.totalMemberCount}명</p>
        </div>
        <div className={styles.member}>
          <PiMicrophoneStage />
          <p>{memberData.vocalCount}명</p>
        </div>
        <div className={styles.member}>
          <GiGuitar />
          <p>{memberData.guitarCount + memberData.bassCount}명</p>
        </div>
        <div className={styles.member}>
          <GiPianoKeys />
          <p>{memberData.keyboardCount}명</p>
        </div>
        <div className={styles.member}>
          <GiDrumKit />
          <p>{memberData.drumCount}명</p>
        </div>
      </section>
    </main>
  );
};

export default ClubInfo;
