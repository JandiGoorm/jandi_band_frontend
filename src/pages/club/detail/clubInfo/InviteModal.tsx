// 이건 클럽 내의 invite 모달
import { useParams } from "react-router-dom";
import { useInviteClub } from "@/apis/club"; // 클럽 초대코드 생성
import InviteModal from "@/components/modal/inviteModal/InviteModal";

const InviteClub = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const { data, mutate } = useInviteClub(id ?? ""); // id가 없으면 빈 문자열

  // 여기서 컴포넌트 호출하는듯함.
  return <InviteModal data={data} mutate={mutate} type="club" />;
};

export default InviteClub;
