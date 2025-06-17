import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <div className={styles.footer_logo}>Rhythmeet</div>
        <div className={styles.footer_links}>
          {/* <a href="/about">서비스 소개</a>
          <a href="/faq">자주 묻는 질문</a>
          <a href="/terms">이용약관</a>
          <a href="/privacy">개인정보처리방침</a> */}
          <a href="">서비스 소개</a>
          <a href="">자주 묻는 질문</a>
          <a href="/contact">About Us</a>
          <a href="">이용약관</a>
          <a href="">개인정보처리방침</a>
        </div>
        <div className={styles.footer_social}>
          {/* <a href="https://instagram.com/youraccount" target="_blank">Instagram</a>
          <a href="https://github.com/yourteam" target="_blank">GitHub</a> */}

          <a href="" target="_blank">
            Instagram
          </a>
          <a href="https://github.com/JandiGoorm" target="_blank">
            GitHub
          </a>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <p>© 2025 Rhythmeet. All rights reserved.</p>
        <p>문의: jandigoorm@gmail.com</p>
        <p>팀 Rhythmeet | 구름X카카오 잔디</p>
      </div>
    </footer>
  );
};

export default Footer;
