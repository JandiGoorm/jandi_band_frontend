// components/OutMemberButton.tsx
import { useOutMember } from "@/apis/club";
import Button from "@/components/button/Button";
import { queryClient } from "@/config/queryClient";
import { ApiEndpotins } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import { useParams } from "react-router-dom";

interface OutMemberButtonProps {
  clubId: string;
  userId: number | null;
  onSuccess: () => void;
}

const EditMemberButton = ({
  clubId,
  userId,
  onSuccess,
}: OutMemberButtonProps) => {
  const { mutate: outMember } = useOutMember(clubId, userId ?? 0);
  const { id } = useParams();

  const handleClick = () => {
    if (!userId || !id) return;

    outMember(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [buildPath(ApiEndpotins.CLUB_MEMBERS, { id })],
        });
        queryClient.invalidateQueries({
          queryKey: [buildPath(ApiEndpotins.CLUB_DETAIL, { id })],
        });
        onSuccess();
      },
    });
  };

  return <Button onClick={handleClick}>팀원 내보내기</Button>;
};

export default EditMemberButton;
