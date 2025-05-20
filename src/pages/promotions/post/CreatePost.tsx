import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "@/pages/promotions/post/CreatePost.module.css";
// import Input from '@/components/input/Input';

const CreatePost = () => {
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
            <aside className={styles.image_input}>
              <input type="file" id="image" name="image" accept="image/*" />
            </aside>

            <aside className={styles.infomation_container}>
              <div>
                <label htmlFor="team">공연팀명</label>
                <input type="text" id="team" name="team" />
              </div>

              <div>
                <label htmlFor="price">관람료</label>
                <input type="text" id="price" name="price" />
              </div>

              <div>
                <label htmlFor="date">날짜</label>
                <input type="date" id="date" name="date" />
              </div>

              <div>
                <label htmlFor="time">시간</label>
                <input type="time" id="time" name="time" />
              </div>

              <div>
                <label htmlFor="location">장소</label>
                <input type="text" id="location" name="location" />
              </div>
            </aside>
          </section>

          {/* 소개글 */}
          <section className={styles.descriptionbox}>
            <label htmlFor="description">소개글</label>
            <textarea id="description" name="description" required />
          </section>
        </form>
      </main>
    </DefaultLayout>
  );
};

export default CreatePost;
