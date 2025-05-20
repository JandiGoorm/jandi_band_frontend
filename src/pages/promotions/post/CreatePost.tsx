import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/pages/promotions/post/CreatePost.module.css";
import Button from "@/components/button/Button";
// import Input from '@/components/input/Input';

const CreatePost = () => {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imageURL, setimageURL] = useState<string | null>(null);
  const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

  const handleClickSection = () => {
    imageInputRef.current?.click();
  };

  const imageUpload = () => {
    const file = imageInputRef.current?.files?.item(0);

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      alert("10MB 이하의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setimageURL(imageUrl);
  };

  return (
    <DefaultLayout>
      <main className={styles.post_container}>
        <header className={styles.post_header}>
          <h2>공연 홍보 게시글 작성하기</h2>
          <p>* 공연 홍보와 관계 없는 글은 운영진에 의해 삭제될 수 있습니다.</p>
        </header>

        <form className={styles.form}>
          <input placeholder="제목" type="text" name="title" required />

          {/* 이미지와 정보 */}
          <section className={styles.centerbox}>
            <aside className={styles.image_inputbox}>
              <div className={styles.image_input} onClick={handleClickSection}>
                {imageURL ? (
                  <img src={imageURL} alt="선택된 이미지" />
                ) : (
                  <p className={styles.placeholder}>
                    이미지를
                    <br />
                    추가해주세요
                  </p>
                )}

                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={imageUpload}
                />
              </div>
            </aside>

            <aside className={styles.infomation_container}>
              <div>
                <label htmlFor="team">공연팀명</label>
                <input type="text" id="team" name="team" required />
              </div>

              <div className={styles.price_div}>
                <label htmlFor="price">관람료</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="숫자만 입력 가능합니다. 무료일 경우 0"
                  required
                />
                <p>원</p>
              </div>

              <div>
                <label htmlFor="date">날짜</label>
                <input type="date" id="date" name="date" required />
              </div>

              <div>
                <label htmlFor="time">시간</label>
                <input type="time" id="time" name="time" required />
              </div>

              <div className={styles.locationbox}>
                <label htmlFor="location">장소</label>
                <textarea id="location" name="location" required />
              </div>
            </aside>
          </section>

          {/* 소개글 */}
          <section className={styles.descriptionbox}>
            <label htmlFor="description">소개글</label>
            <textarea id="description" name="description" />
          </section>

          <footer className={styles.button_group}>
            <Button>등록</Button>
            <Button
              type="button"
              className={styles.cancle}
              onClick={() => navigate(-1)}
            >
              취소
            </Button>
          </footer>
        </form>
      </main>
    </DefaultLayout>
  );
};

export default CreatePost;
