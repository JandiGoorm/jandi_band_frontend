import type { PromotionListResponse } from "@/types/promotion";

const LocationModal = ({ data }: { data: PromotionListResponse }) => {
  console.log(data);
  return (
    <main>
      <section></section>
      <section>
        <p>{data.location}</p>
        <p>{data.address}</p>
      </section>
    </main>
  );
};

export default LocationModal;
