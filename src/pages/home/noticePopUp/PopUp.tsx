import { useState, useEffect } from "react";
import styles from "./PopUp.module.css";
import type { NoticeRequest } from "@/types/notice";

interface MultiNoticePopupProps {
  notices: NoticeRequest[];
}

const PopUp: React.FC<MultiNoticePopupProps> = ({ notices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    if (notices.length === 0) return;

    const today = new Date().toISOString().slice(0, 10);

    // 첫 번째 공지부터 오늘 본 날짜 확인
    const firstUnseenIndex = notices.findIndex((notice) => {
      const lastShown = localStorage.getItem(`notice_popup_date_${notice.id}`);
      return lastShown !== today;
    });

    if (firstUnseenIndex !== -1) {
      setCurrentIndex(firstUnseenIndex);
      setShow(true);
    }
  }, [notices]);

  if (!show) return null;

  const currentNotice = notices[currentIndex];

  const handleClose = () => {
    if (dontShowToday) {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem(`notice_popup_date_${currentNotice.id}`, today);
    }

    const nextIndex = notices.slice(currentIndex + 1).findIndex((notice) => {
      const today = new Date().toISOString().slice(0, 10);
      const lastShown = localStorage.getItem(`notice_popup_date_${notice.id}`);
      return lastShown !== today;
    });

    if (nextIndex !== -1) {
      setCurrentIndex(currentIndex + 1 + nextIndex);
      setDontShowToday(false);
    } else {
      setShow(false);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popup_header}>
        <h2 className={styles.title}>{currentNotice.title}</h2>
        <button onClick={handleClose} className={styles.close_btn}>
          ✕
        </button>
      </div>
      <div className={styles.popup_body}>
        <p>{currentNotice.content}</p>
        <label className={styles.checkbox_label}>
          <input
            type="checkbox"
            checked={dontShowToday}
            onChange={(e) => setDontShowToday(e.target.checked)}
          />
          오늘 다시 보지 않기
        </label>
      </div>
    </div>
  );
};

export default PopUp;
