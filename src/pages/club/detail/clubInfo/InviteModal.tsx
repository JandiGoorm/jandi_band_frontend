import { useParams } from "react-router-dom";
import { useInviteClub } from "@/apis/club";
import InviteModal from "@/components/modal/inviteModal/InviteModal";

const InviteClub = () => {
  const { id } = useParams();
  const { data, mutate } = useInviteClub(id ?? "");

  return <InviteModal data={data} mutate={mutate} type="club" />;
};

export default InviteClub;
