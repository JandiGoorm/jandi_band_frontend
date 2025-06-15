import { useRef, useState } from "react";
import Button from "@/components/button/Button";
import Modal from "../Modal";
import styles from "./MapModal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Input from "@/components/input/Input";
import { useKakao } from "@/hooks/useKakao";
import type { kakaoLocationRequest } from "@/types/kakao";
import clsx from "clsx";

interface MapModalProps {
  trigger?: React.ReactNode;
  title: string;
  onSubmit: (selectedPlace: kakaoLocationRequest | null) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MapModal = ({
  trigger,
  title,
  onSubmit,
  open,
  onOpenChange,
}: MapModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchKeyword } = useKakao();

  const [markerPosition, setMarkerPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const [searchResult, setSearchResult] = useState<kakaoLocationRequest[]>();
  const [selectedPlace, setSelectedPlace] =
    useState<kakaoLocationRequest | null>(null);

  const handleSearch = async () => {
    const keyword = inputRef.current?.value;
    if (!keyword) return;

    try {
      const results = await searchKeyword(keyword);
      if (results.length > 0) {
        setSearchResult(results);
      } else {
        alert("검색 결과가 없습니다.");
      }
    } catch (err) {
      console.error("카카오 장소 검색 오류:", err);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const handlePlaceClick = (place: kakaoLocationRequest) => {
    const lat = parseFloat(place.y);
    const lng = parseFloat(place.x);
    setMarkerPosition({ lat, lng });
    setSelectedPlace(place);
  };

  return (
    <Modal
      trigger={trigger}
      title={title}
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className={styles.container}>
        <div className={styles.input_box}>
          <Input
            inputSize="sm"
            ref={inputRef}
            style={{ flex: "1", marginRight: "1rem" }}
            placeholder="장소를 입력하세요"
          />
          <Button size="sm" variant="secondary" onClick={handleSearch}>
            검색하기
          </Button>
        </div>
        {searchResult && (
          <div className={styles.search_result_box}>
            {searchResult.map((item) => (
              <div
                className={clsx(styles.place_box, {
                  [styles.selected]: selectedPlace?.id === item.id,
                })}
                key={item.id}
                onClick={() => handlePlaceClick(item)}
              >
                <p className={styles.place_name}>{item.place_name}</p>
                <p className={styles.place_address}>
                  {item.road_address_name || item.address_name}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.map_box}>
          <Map
            center={markerPosition}
            style={{ width: "100%", height: "100%", borderRadius: "12px" }}
            level={5}
          >
            <MapMarker position={markerPosition} />
          </Map>
        </div>

        <div className={styles.button_container}>
          <Dialog.Close asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onSubmit(selectedPlace)}
            >
              등록하기
            </Button>
          </Dialog.Close>
        </div>
      </div>
    </Modal>
  );
};

export default MapModal;
