import { useAuthStore } from "@/stores/authStore";
import type { ClubDetailResponse, ClubMemberResponse } from "@/types/club";
import { FaInstagram } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiDrumKit, GiGuitar, GiPianoKeys } from "react-icons/gi";
import { PiMicrophoneStage } from "react-icons/pi";
import styles from "./ClubInfo.module.css";
import InviteModal from "./InviteModal";
import ModifyClubModal from "./ModifyClubModal";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import ModifyProfileModal from "./ModifyProfileModal";

const ClubInfo = ({
  club,
  memberData,
}: {
  club: ClubDetailResponse;
  memberData: ClubMemberResponse;
}) => {
  const { user } = useAuthStore();
  const mine = user?.id === club.representativeId;

  return (
    <main className={styles.container}>
      {club.photoUrl ? (
        <>
          <header className={styles.banner}>
            <img src={club.photoUrl} className={styles.banner} />
          </header>
          <Modal
            title="대표 사진 수정하기"
            trigger={
              <Button
                variant="primary"
                size="sm"
                className={styles.image_button}
              >
                사진 수정
              </Button>
            }
          >
            <ModifyProfileModal image={club.photoUrl} />
          </Modal>
        </>
      ) : null}

      <section className={styles.title_box}>
        <div className={styles.info_title}>
          <p className={styles.title}>{club.name}</p>
          <p className={styles.school}>
            {club.university?.name ?? "연합 동아리"}
          </p>
        </div>

        <div className={styles.left_title}>
          <InviteModal />

          {mine && <ModifyClubModal club={club} />}

          {club.instagramId && (
            <FaInstagram
              size={40}
              className={styles.instagram_icon}
              onClick={() =>
                window.open(
                  `https://www.instagram.com/${club.instagramId}/`,
                  "_blank"
                )
              }
            />
          )}
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
