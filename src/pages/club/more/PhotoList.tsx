import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PhotoList.module.css";
import Loading from "@/components/loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/button/Button";
import { useGetPhotos } from "@/apis/photo";
import PhotoCard from "@/components/cards/PhotoCard";
import { useAuthStore } from "@/stores/authStore";
import { useGetClubMembers } from "@/apis/club";
import Modal from "@/components/modal/Modal";
import PhotoModal from "../detail/clubSlide/modalContent/PhotoModal";

const PhotoList = () => {
  const { id } = useParams();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { user } = useAuthStore();
  const { data: memberData, isLoading: memberLoading } = useGetClubMembers(
    id as string
  );
  const {
    data: photoData,
    isLoading: photoLoading,
    refetch: refetchPhotos,
  } = useGetPhotos({
    id: id!,
    page: currentPage - 1,
    size: 12,
  });

  useEffect(() => {
    if (photoData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(photoData.data.pageInfo.totalPages);
    }
  }, [photoData, setTotalPage]);

  if (!photoData || photoLoading || !memberData || memberLoading)
    return <Loading />;

  const isMember = memberData.data.members.some(
    (member: { userId: number }) => member.userId === user?.id
  );

  return (
    <DefaultLayout>
      <header>
        <p className={styles.title}>사진 목록</p>
      </header>

      <section className={styles.club_container}>
        {photoData.data.content.map((item) => (
          <PhotoCard key={item.id} item={item} />
        ))}
      </section>
      <section className={styles.pagination_box}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          callback={handlePageChange}
        />
      </section>
      <div className={styles.add_button}>
        {isMember && (
          <Modal
            title="사진 등록하기"
            trigger={
              <Button variant="primary" size="md">
                사진 등록
              </Button>
            }
          >
            <PhotoModal refetchPhotos={refetchPhotos} />
          </Modal>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PhotoList;
