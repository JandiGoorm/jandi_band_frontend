// 여기서 오류 발생해서 수정해야됨.
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "@/components/loading/Loading";
import { useEffect } from "react";
import { useJoinClub } from "@/apis/club";
import { useJoinTeam } from "@/apis/team";
import { PageEndpoints } from "@/constants/endpoints";
import { buildPath } from "@/utils/buildPath";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/apis/types";

const Invite = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string | null;
  const { mutate: joinClub } = useJoinClub(code ?? "");
  const { mutate: joinTeam } = useJoinTeam(code ?? "");

  useEffect(() => {
    if (!type || !code) return;

    // 타입이 클럽이면 클럽 가입 API 호출
    if (type === "club") {
      joinClub(undefined, {
        onSuccess: (response) => {
          navigate(
            buildPath(PageEndpoints.CLUB, {
              id: response.data.data.clubId!,
            })
          );
        },
        onError: (error: unknown) => {
          // 토큰이 없을 때
          if ((error as AxiosError)?.response?.data === "") {
            navigate(PageEndpoints.SIGN_IN);
            return;
          }
          // 이미 가입 되었을때
          // if (
          //   (error as AxiosError)?.response?.data === "이미 가입한 동아리입니다"
          // )
          if (
            (error as AxiosError<ApiResponse<{ message: string }>>)?.response
              ?.data?.message === "이미 가입한 동아리입니다"
          ) {
            navigate(PageEndpoints.MYPAGE);
            return;
          }
        },
      });
    } else {
      joinTeam(undefined, {
        onSuccess: (response) => {
          navigate(
            buildPath(PageEndpoints.TEAM_DETAIL, {
              id: response.data.data.teamId!,
            })
          );
        },
        onError: (error: unknown) => {
          // 토큰이 없을 때
          if ((error as AxiosError)?.response?.data === "") {
            navigate(PageEndpoints.SIGN_IN);
            return;
          }
          // 이미 가입 되었을때
          if (
            (error as AxiosError<ApiResponse<{ message: string }>>)?.response
              ?.data?.message === "이미 가입한 팀입니다"
          ) {
            navigate(PageEndpoints.MYPAGE);
            return;
          }
        },
      });
    }
  }, [code, joinClub, joinTeam, navigate, type]);

  if (!type || !code) {
    return <div>초대 정보를 찾을 수 없습니다.</div>;
  }
  return <Loading />;
};

export default Invite;
