import styles from "./ClubInfo.module.css";
import { FaInstagram } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiGuitar, GiPianoKeys, GiDrumKit } from "react-icons/gi";
import { PiMicrophoneStage } from "react-icons/pi";

const ClubInfo = () => {
  return (
    <main className={styles.container}>
      <header className={styles.banner}>
        <img src="/banner.png" className={styles.banner} />
      </header>
      <section className={styles.title_box}>
        <div className={styles.info_title}>
          <p className={styles.title}>유다빈 밴드</p>
          <p className={styles.school}> 00대학교</p>
        </div>
        <FaInstagram size={36} className={styles.instagram_icon} />
      </section>
      <section className={styles.member_box}>
        <div className={styles.member}>
          <FaPeopleGroup />
          <p>xx명</p>
        </div>
        <div className={styles.member}>
          <PiMicrophoneStage />
          <p>xx명</p>
        </div>
        <div className={styles.member}>
          <GiGuitar />
          <p>xx명</p>
        </div>
        <div className={styles.member}>
          <GiPianoKeys />
          <p>xx명</p>
        </div>
        <div className={styles.member}>
          <GiDrumKit />
          <p>xx명</p>
        </div>
      </section>
    </main>
  );
};

export default ClubInfo;
