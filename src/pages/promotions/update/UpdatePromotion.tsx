import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdatePromotion.module.css";
import Button from "@/components/button/Button";
import { useGetPromo, useUpdatePromotion } from "@/apis/promotion";
import Loading from "@/components/loading/Loading";
// import Input from '@/components/input/Input';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const UpdatePromotion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imageURL, setimageURL] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { data: postData } = useGetPromo(id!);
  const { mutate: updatePromo, data: updateData } = useUpdatePromotion(id!);

  console.log(updateData);
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
    setImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append("title", form.title.value);
    formData.append("teamName", form.team.value);
    formData.append("admissionFee", form.price.value);
    formData.append(
      "eventDatetime",
      `${form.date.value}T${form.time.value}:00`
    );
    formData.append("location", form.location.value);
    formData.append("address", form.location.value);
    formData.append("description", form.description.value);

    updatePromo(formData);
  };

  useEffect(() => {
    if (!updateData?.data.success) return;

    navigate(-1);
  }, [updateData, navigate]);

  if (!postData) return <Loading />;

  return (
    <DefaultLayout>
      <main className={styles.post_container}>
        <header className={styles.post_header}>
          <h2>공연 홍보 게시글 수정하기</h2>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            placeholder="제목"
            type="text"
            name="title"
            defaultValue={postData.data.title}
            required
          />

          {/* 이미지와 정보 */}
          <section className={styles.centerbox}>
            <aside className={styles.image_inputbox}>
              <div className={styles.image_input} onClick={handleClickSection}>
                {imageURL || postData.data.photoUrls[0] ? (
                  <img
                    src={imageURL || postData.data.photoUrls[0]}
                    alt="선택된 이미지"
                  />
                ) : (
                  <p className={styles.placeholder}>
                    이미지를
                    <br />
                    수정해주세요
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
                <input
                  type="text"
                  id="team"
                  name="team"
                  defaultValue={postData.data.teamName}
                  required
                />
              </div>

              <div className={styles.price_div}>
                <label htmlFor="price">관람료</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="숫자만 입력 가능합니다. 무료일 경우 0"
                  defaultValue={postData.data.admissionFee}
                  required
                />
                <p>원</p>
              </div>

              <div>
                <label htmlFor="date">날짜</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={postData.data.eventDatetime.split("T")[0]}
                  required
                />
              </div>

              <div>
                <label htmlFor="time">시간</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  defaultValue={postData.data.eventDatetime
                    .split("T")[1]
                    .slice(0, 5)}
                  required
                />
              </div>

              <div className={styles.locationbox}>
                <label htmlFor="location">장소</label>
                <textarea
                  id="location"
                  name="location"
                  defaultValue={postData.data.location}
                  required
                />
              </div>
            </aside>
          </section>

          {/* 소개글 */}
          <section className={styles.descriptionbox}>
            <label htmlFor="description">소개글</label>
            <textarea
              id="description"
              defaultValue={postData.data.description}
              name="description"
            />
          </section>

          <footer className={styles.button_group}>
            <Button>수정</Button>
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

export default UpdatePromotion;
