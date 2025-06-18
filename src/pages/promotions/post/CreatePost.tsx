import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/pages/promotions/post/CreatePost.module.css";
import Button from "@/components/button/Button";
import { usePostPromotion } from "@/apis/promotion";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import MapModal from "@/components/modal/mapModal/MapModal";
import type { kakaoLocationRequest } from "@/types/kakao";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const schema = z.object({
  title: z.string().min(1, "제목은 필수입니다"),
  team: z.string().min(1, "팀명은 필수입니다"),
  price: z
    .string()
    .min(1)
    .refine((val) => !isNaN(Number(val)), { message: "숫자만 입력하세요" }),
  date: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(1, "장소는 필수입니다"),
  description: z.string().optional(),
  image: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, {
      message: "이미지를 선택해주세요",
    })
    .refine((files) => files?.[0]?.size <= MAX_IMAGE_SIZE_BYTES, {
      message: "이미지는 10MB 이하만 가능합니다",
    }),
});

type FormData = z.infer<typeof schema>;

const CreatePost = () => {
  const navigate = useNavigate();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { mutate: createPromo, data: postData } = usePostPromotion();
  const [selectedPlace, setSelectedPlace] =
    useState<kakaoLocationRequest | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const imageFile = watch("image")?.[0];

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageURL(url);
    }
  }, [imageFile]);

  const onSubmit = (data: FormData) => {
    if (!selectedPlace) return;

    const formData = new FormData();

    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("teamName", data.team);
    formData.append("admissionFee", data.price);
    formData.append("eventDatetime", `${data.date}T${data.time}:00`);
    formData.append("location", selectedPlace.place_name);
    formData.append("address", data.location);
    formData.append("latitude", selectedPlace.y);
    formData.append("longitude", selectedPlace.x);
    formData.append("description", data.description ?? "");

    createPromo(formData);
  };

  useEffect(() => {
    if (postData?.data?.data?.id) {
      const id = postData.data.data.id;
      navigate(buildPath(PageEndpoints.PROMOTION_DETAIL, { id }));
    }
  }, [postData, navigate]);

  const SetAddress = (place: kakaoLocationRequest | null) => {
    if (place) {
      setValue("location", place.road_address_name);
      setSelectedPlace(place);
    }
  };

  return (
    <DefaultLayout>
      <main className={styles.post_container}>
        <header className={styles.post_header}>
          <h2>공연 홍보 게시글 작성하기</h2>
          <p>* 공연 홍보와 관계 없는 글은 운영진에 의해 삭제될 수 있습니다.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="제목"
            {...register("title")}
            className={clsx(errors.title && styles.inputError)}
          />

          <section className={styles.centerbox}>
            <aside
              className={clsx(
                styles.image_inputbox,
                errors.image && styles.inputError
              )}
            >
              <div
                className={styles.image_input}
                onClick={() => document.getElementById("image")?.click()}
              >
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
                  accept="image/*"
                  {...register("image")}
                  style={{ display: "none" }}
                />
              </div>
            </aside>

            <aside className={styles.infomation_container}>
              <div>
                <label htmlFor="team">공연팀명</label>
                <input
                  id="team"
                  {...register("team")}
                  className={clsx(errors.team && styles.inputError)}
                />
              </div>

              <div className={styles.price_div}>
                <label htmlFor="price">관람료</label>
                <input
                  id="price"
                  type="number"
                  {...register("price")}
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
                  className={clsx(errors.date && styles.inputError)}
                />
              </div>

              <div>
                <label htmlFor="time">시간</label>
                <input
                  id="time"
                  type="time"
                  {...register("time")}
                  className={clsx(errors.time && styles.inputError)}
                />
              </div>

              <div className={styles.locationbox}>
                <label htmlFor="location">장소</label>
                <textarea
                  placeholder="장소를 선택하려면 클릭하세요"
                  id="location"
                  readOnly
                  {...register("location")}
                  onClick={() => setIsMapOpen(true)}
                  className={clsx(errors.location && styles.inputError)}
                />
                <MapModal
                  title="장소 추가하기"
                  open={isMapOpen}
                  onOpenChange={setIsMapOpen}
                  onSubmit={(place) => {
                    SetAddress(place);
                    setIsMapOpen(false);
                  }}
                />
              </div>
            </aside>
          </section>

          <section className={styles.descriptionbox}>
            <label htmlFor="description">소개글</label>
            <textarea id="description" {...register("description")} />
          </section>

          <footer className={styles.button_group}>
            <Button
              type="button"
              className={styles.cancle}
              onClick={() => navigate(-1)}
            >
              취소
            </Button>
            <Button>등록</Button>
          </footer>
        </form>
      </main>
    </DefaultLayout>
  );
};

export default CreatePost;
