import { useParams } from "react-router-dom";
import { useInviteClub } from "@/apis/club";
import InviteModal from "@/components/modal/inviteModal/InviteModal";

const InviteClub = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const { data, mutate } = useInviteClub(id ?? ""); // id가 없으면 빈 문자열

  return <InviteModal data={data} mutate={mutate} type="club" />;
};

export default InviteClub;
