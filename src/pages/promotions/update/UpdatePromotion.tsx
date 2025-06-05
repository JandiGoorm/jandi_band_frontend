import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdatePromotion.module.css";
import Button from "@/components/button/Button";
import { useGetPromo, useUpdatePromotion } from "@/apis/promotion";
import Loading from "@/components/loading/Loading";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Modal from "@/components/modal/Modal";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const schema = z.object({
  title: z.string().min(1, "제목은 필수입니다"),
  team: z.string().min(1, "팀명은 필수입니다"),
  price: z
    .string()
    .min(1)
    .refine((val) => !isNaN(Number(val)), { message: "숫자만 입력하세요" }),
  date: z.string().min(1, "날짜는 필수입니다"),
  time: z.string().min(1, "시간은 필수입니다"),
  location: z.string().min(1, "장소는 필수입니다"),
  description: z.string().optional(),
  image: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => {
        if (!files) return true;
        return files.length === 0 || files[0].size <= MAX_IMAGE_SIZE_BYTES;
      },
      {
        message: "이미지는 10MB 이하만 가능합니다",
      }
    ),
});

type FormData = z.infer<typeof schema>;

const UpdatePromotion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { data: postData } = useGetPromo(id!);
  const { mutate: updatePromo, data: updateData } = useUpdatePromotion(id!);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchedImage = watch("image");

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const url = URL.createObjectURL(watchedImage[0]);
      setImageURL(url);
    } else if (postData?.data.photoUrls[0]) {
      setImageURL(postData.data.photoUrls[0]);
    }
  }, [watchedImage, postData]);

  const onSubmit = (data: FormData) => {
    const formData = new FormData();

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    formData.append("title", data.title);
    formData.append("teamName", data.team);
    formData.append("admissionFee", data.price);
    formData.append("eventDatetime", `${data.date}T${data.time}:00`);
    formData.append("location", data.location);
    formData.append("address", data.location);
    formData.append("description", data.description ?? "");

    updatePromo(formData);
  };

  useEffect(() => {
    if (updateData?.data.success) {
      navigate(-1);
    }
  }, [updateData, navigate]);

  if (!postData) return <Loading />;

  return (
    <DefaultLayout>
      <main className={styles.post_container}>
        <header className={styles.post_header}>
          <h2>공연 홍보 게시글 수정하기</h2>
        </header>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input
            placeholder="제목"
            {...register("title")}
            defaultValue={postData.data.title}
            className={clsx(errors.title && styles.inputError)}
          />
          {errors.title && (
            <p className={styles.errorMessage}>{errors.title.message}</p>
          )}

          <section className={clsx(styles.centerbox)}>
            <aside
              className={clsx(
                styles.image_inputbox,
                errors.image && styles.inputError
              )}
              onClick={() => imageInputRef.current?.click()}
            >
              <div className={styles.image_input}>
                {imageURL ? (
                  <img src={imageURL} alt="선택된 이미지" />
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
                  accept="image/*"
                  {...register("image")}
                  style={{ display: "none" }}
                  ref={(e) => {
                    register("image").ref(e);
                    imageInputRef.current = e;
                  }}
                />
              </div>
            </aside>
            <aside className={styles.infomation_container}>
              <div>
                <label htmlFor="team">공연팀명</label>
                <input
                  id="team"
                  {...register("team")}
                  defaultValue={postData.data.teamName}
                  className={clsx(errors.team && styles.inputError)}
                />
              </div>

              <div className={styles.price_div}>
                <label htmlFor="price">관람료</label>
                <input
                  id="price"
                  type="number"
                  {...register("price")}
                  placeholder="숫자만 입력 가능합니다. 무료일 경우 0"
                  defaultValue={postData.data.admissionFee}
                  className={clsx(errors.price && styles.inputError)}
                />
                <p>원</p>
              </div>

              <div>
                <label htmlFor="date">날짜</label>
                <input
                  id="date"
                  type="date"
                  {...register("date")}
                  defaultValue={postData.data.eventDatetime.split("T")[0]}
                  className={clsx(errors.date && styles.inputError)}
                />
              </div>

              <div>
                <label htmlFor="time">시간</label>
                <input
                  id="time"
                  type="time"
                  {...register("time")}
                  defaultValue={postData.data.eventDatetime
                    .split("T")[1]
                    .slice(0, 5)}
                  className={clsx(errors.time && styles.inputError)}
                />
              </div>

              <div className={styles.locationbox}>
                <label htmlFor="location">장소</label>
                <textarea
                  id="location"
                  {...register("location")}
                  defaultValue={postData.data.location}
                  className={clsx(errors.location && styles.inputError)}
                />
                <Modal
                  title="장소 수정하기"
                  trigger={
                    <Button variant="transparent" size="sm">
                      장소 수정
                    </Button>
                  }
                >
                  <div>s</div>
                </Modal>
              </div>
            </aside>
          </section>

          <section className={styles.descriptionbox}>
            <label htmlFor="description">소개글</label>
            <textarea
              id="description"
              {...register("description")}
              defaultValue={postData.data.description}
            />
          </section>

          <footer className={styles.button_group}>
            <Button type="submit">수정</Button>
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
