import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import styles from "./PromotionMain.module.css";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import Input from "@/components/input/Input";
import { useRef, useEffect } from "react";
import usePagination from "@/hooks/usePagination";
import {
  useGetPromoList,
  useSearchPromoStatus,
  useSearchPromotion,
} from "@/apis/promotion";
import Pagination from "@/components/pagination/Pagination";
import Loading from "@/components/loading/Loading";
import { formatPromotionDate, getEventStatus } from "@/utils/dateStatus";
import useSearchParams from "@/hooks/useSearchParams";
import * as Select from "@radix-ui/react-select";
import { FiChevronDown } from "react-icons/fi";

const PromotionMain = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const { keyword, setKeyword, status, setStatus } = useSearchParams();

  const { data: defaultPromoData, isLoading: defaultLoading } = useGetPromoList(
    {
      page: currentPage - 1,
      size: 10,
    }
  );

  const searchHook = status ? useSearchPromoStatus : useSearchPromotion;

  const { data: searchData, isLoading: searchLoading } = searchHook({
    keyword,
    status,
    page: currentPage - 1,
    size: 10,
  });

  const promoData = keyword || status ? searchData : defaultPromoData;
  const isLoading = keyword || status ? searchLoading : defaultLoading;

  useEffect(() => {
    if (promoData?.data.pageInfo.totalPages !== undefined) {
      setTotalPage(promoData.data.pageInfo.totalPages);
    }
  }, [promoData, setTotalPage]);

  const handleSearch = () => {
    const value = inputRef.current?.value.trim() || "";
    setKeyword(value);
  };

  if (!promoData || isLoading) return <Loading />;

  return (
    <DefaultLayout>
      <main className={styles.container}>
        <header className={styles.page_title}>동아리 공연 홍보 게시판</header>
        <nav className={styles.header_nav}>
          <Button
            size="md"
            variant="transparent"
            onClick={() => navigate(PageEndpoints.PROMOTION_MAP)}
          >
            지도보기
          </Button>
          <div>
            <Select.Root
              value={status || "all"}
              onValueChange={(val) => setStatus(val === "all" ? "" : val)}
            >
              <Select.Trigger className={styles.select_trigger}>
                <Select.Value placeholder="전체" />
                <Select.Icon>
                  <FiChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className={styles.select_content}
                  position="popper"
                  sideOffset={4}
                >
                  <Select.Viewport>
                    <Select.Item value="all" className={styles.select_item}>
                      <Select.ItemText>전체</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="ongoing" className={styles.select_item}>
                      <Select.ItemText>공연 중</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="upcoming"
                      className={styles.select_item}
                    >
                      <Select.ItemText>공연예정</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="ended" className={styles.select_item}>
                      <Select.ItemText>공연종료</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <Input
              inputSize="md"
              ref={inputRef}
              defaultValue={keyword}
              placeholder="제목, 장소로 검색"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button variant="transparent" size="md" onClick={handleSearch}>
              검색
            </Button>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/promotion/post")}
          >
            글 작성
          </Button>
        </nav>

        <section className={styles.promotion_container}>
          {promoData.data.content.map((item) => {
            const status = getEventStatus(item.eventDatetime);
            return (
              <article
                className={styles.promotion_box}
                key={item.id}
                onClick={() =>
                  navigate(
                    buildPath(PageEndpoints.PROMOTION_DETAIL, { id: item.id })
                  )
                }
              >
                <span
                  className={styles.promo_button}
                  style={{
                    backgroundColor: status.backgroundColor,
                    color: status.color,
                  }}
                >
                  {status.text}
                </span>
                <div>
                  <img
                    className={styles.promotion_img}
                    src={item.photoUrls[0]}
                    alt={item.title}
                  />
                </div>
                <p className={styles.promotion_title}>{item.title}</p>
                <p className={styles.promotion_sub}>
                  {formatPromotionDate(item.eventDatetime)}
                </p>
                <p className={styles.promotion_sub}>{item.location}</p>
              </article>
            );
          })}
        </section>

        <section className={styles.page_navigate_box}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            callback={handlePageChange}
          />
        </section>
      </main>
    </DefaultLayout>
  );
};

export default PromotionMain;
