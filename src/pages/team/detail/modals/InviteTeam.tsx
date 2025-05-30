import InviteModal from "@/components/modal/inviteModal/InviteModal";
import { useParams } from "react-router-dom";
import { useInviteTeam } from "@/apis/team";

const InviteTeam = () => {
  const { id } = useParams();
  const { data, mutate } = useInviteTeam(id ?? "");

  return <InviteModal type="team" data={data} mutate={mutate} />;
};

export default InviteTeam;
