// 이건 팀 내의 invite 모달
import { useParams } from "react-router-dom";
import { useInviteTeam } from "@/apis/team";
import InviteModal from "@/components/modal/inviteModal/InviteModal";

const InviteTeam = () => {
  const { id } = useParams();
  const { data, mutate } = useInviteTeam(id ?? "");

  return <InviteModal data={data} mutate={mutate} type="team" />;
};

export default InviteTeam;
