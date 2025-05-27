/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { type TeamDetailResponse } from "@/types/team";
import { useGetTeamDetail } from "@/apis/team";
import { useParams } from "react-router-dom";
import type { Nullable } from "@/types/common";
import { type Position } from "@/types/team";
import { dummyTeam } from "./constants";

interface TeamContextValue {
  // API 데이터
  team: Nullable<TeamDetailResponse>;
  isLoading: boolean;

  activeIds: number[];
  filteredTypes: string[];

  // 컨트롤러 함수들
  handleActiveMember: (id: number) => void;
  handleFilteredType: (type: Position) => void;
  handleFilterdTypeReset: () => void;
}

const TeamContext = createContext<Nullable<TeamContextValue>>(null);

interface TeamProviderProps {
  children: React.ReactNode;
}

export const TeamProvider = ({ children }: TeamProviderProps) => {
  const [team, setTeam] = useState<Nullable<TeamDetailResponse>>(null);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);

  const { id } = useParams();
  const { data, isLoading } = useGetTeamDetail(id ?? "");

  const members = team?.members;
  const membersIds = members?.map((v) => v.userId);

  // 멤버 active 상태 확인 함수
  const isActiveMember = useCallback(
    (id: number) => {
      return activeIds.includes(id);
    },
    [activeIds]
  );

  // 멤버 클릭 시 active 상태 변경
  const handleActiveMember = useCallback(
    (id: number) => {
      if (isActiveMember(id)) {
        setActiveIds(activeIds.filter((member) => member !== id));
      } else {
        setActiveIds([...activeIds, id]);
      }
    },
    [isActiveMember, activeIds]
  );

  const handleFilteredType = useCallback(
    (type: Position) => {
      if (filteredTypes.includes(type)) {
        // 필터링 타입을 제외시키면 해당 멤버들을 다시 active하게 만들어줍니다.
        const newActiveIds = members
          ?.filter((v) => v.position === type && !activeIds.includes(v.userId))
          .map((v) => v.userId);

        if (newActiveIds && newActiveIds.length > 0) {
          setActiveIds([...activeIds, ...newActiveIds]);
        }

        setFilteredTypes(filteredTypes.filter((t) => t !== type));
      } else {
        setFilteredTypes([...filteredTypes, type]);
      }
    },
    [activeIds, filteredTypes, members]
  );

  // 필터링을 초기화하는 함수.
  const handleFilterdTypeReset = useCallback(() => {
    setFilteredTypes([]);
    setActiveIds(membersIds ?? []);
  }, [membersIds]);

  // 필터 타입이 변경되면 필터된 멤버들을 업데이트
  useEffect(() => {
    const filteredMembersIds = activeIds.filter((v) => {
      const member = members?.find((m) => m.userId === v);
      if (member) {
        return !filteredTypes.includes(member.position);
      }
      return true;
    });

    setActiveIds(filteredMembersIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTypes, members]);

  // 초기에는 전체 멤버 active
  useEffect(() => {
    const ids = members?.map((v) => v.userId);
    setActiveIds(ids ?? []);
  }, [members]);

  useEffect(() => {
    // if (!data) return;
    // setTeam(data.data);
    setTeam(dummyTeam);
  }, [data]);

  const value: TeamContextValue = {
    team,
    isLoading,
    activeIds,
    filteredTypes,
    handleActiveMember,
    handleFilteredType,
    handleFilterdTypeReset,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

// Custom hook for using team context
export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error(
      "useTeam 는 반드시 TeamProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};

// 기존 useTeamController와 호환성을 위한 hook
export const useTeamController = () => {
  const { handleActiveMember, handleFilteredType, handleFilterdTypeReset } =
    useTeam();

  return {
    handleActiveMember,
    handleFilteredType,
    handleFilterdTypeReset,
  };
};
