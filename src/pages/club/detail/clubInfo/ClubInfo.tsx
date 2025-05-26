import styles from "./ClubInfo.module.css";
import { FaInstagram } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiGuitar, GiPianoKeys, GiDrumKit } from "react-icons/gi";
import { PiMicrophoneStage } from "react-icons/pi";
import type { ClubDetailResponse, ClubMemberResponse } from "@/types/club";
import type { UserInfo } from "@/types/auth";
import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import ModifyClubModal from "./ModifyClubModal";

const ClubInfo = ({
  club,
  mydata,
  memberData,
}: {
  club: ClubDetailResponse;
  mydata: UserInfo;
  memberData: ClubMemberResponse;
}) => {
  const mine = mydata.id === club.representativeId;

  return (
    <main className={styles.container}>
      {club.photoUrl ? (
        <header className={styles.banner}>
          <img src={club.photoUrl} className={styles.banner} />
        </header>
      ) : null}

      <section className={styles.title_box}>
        <div className={styles.info_title}>
          <p className={styles.title}>{club.name}</p>
          <p className={styles.school}>
            {club.university?.name ?? "연합 동아리"}
          </p>
        </div>
        <div>
          {mine ? (
            <Modal trigger={<Button>수정하기</Button>} title="동아리 수정하기">
              <ModifyClubModal club={club} />
            </Modal>
          ) : null}
          {club.instagramId ? (
            <FaInstagram
              size={36}
              className={styles.instagram_icon}
              onClick={() => window.open(club.instagramId, "_blank")}
            />
          ) : null}
        </div>
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
