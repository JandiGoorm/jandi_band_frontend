import { useParams, useSearchParams } from "react-router-dom";
import Loading from "@/components/loading/Loading";
import { useEffect } from "react";
import { useJoinClub } from "@/apis/club";
import { useJoinTeam } from "@/apis/team";

const Invite = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string | null;
  const { mutate: joinClub } = useJoinClub(code ?? "");
  const { mutate: joinTeam } = useJoinTeam(code ?? "");

  useEffect(() => {
    if (!type || !code) return;

    if (type === "club") {
      joinClub();
    } else {
      joinTeam();
    }
  }, [code, joinClub, joinTeam, type]);

  if (!type || !code) {
    return <div>초대 정보를 찾을 수 없습니다.</div>;
  }
  return <Loading />;
};

export default Invite;
