import type { PromotionListResponse } from "@/types/promotion";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from "./LocationModal.module.css";
const LocationModal = ({ data }: { data: PromotionListResponse }) => {
  const lat = data.latitude;
  const lng = data.longitude;
  // console.log("위도/경도:", data.latitude, data.longitude);
  return (
    <main className={styles.container}>
      <section className={styles.map_box}>
        <Map
          center={{ lat, lng }}
          style={{ width: "100%", height: "100%" }}
          level={5}
        >
          <MapMarker position={{ lat, lng }} />
        </Map>
      </section>
      <section className={styles.address_box}>
        <p className={styles.location}>{data.location}</p>
        <p className={styles.address}>{data.address}</p>
      </section>
    </main>
  );
};

export default LocationModal;
