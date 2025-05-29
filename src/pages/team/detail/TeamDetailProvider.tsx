/* eslint-disable react-refresh/only-export-components */
import { type TeamDetailResponse } from "@/types/team";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGetTeamDetail } from "@/apis/team";
import { initialTimeSchedule } from "@/components/scheduler/constants";
import type { Nullable } from "@/types/common";
import { type Position } from "@/types/team";
import { type Range } from "@/types/timeTable";

interface TeamDetailContextValue {
  // API 데이터
  team: Nullable<TeamDetailResponse>;
  teamId: string;

  activeIds: number[];
  filteredTypes: string[];
  teamTimeAvailableSchedule: Record<Range, string[]>;

  // 컨트롤러 함수들
  handleActiveMember: (id: number) => void;
  handleFilteredType: (type: Position) => void;
  handleFilterdTypeReset: () => void;
}

const TeamContext = createContext<Nullable<TeamDetailContextValue>>(null);

interface TeamDetailProviderProps {
  children: React.ReactNode;
  teamId: string;
}

export const TeamDetailProvider = ({
  children,
  teamId,
}: TeamDetailProviderProps) => {
  const [team, setTeam] = useState<Nullable<TeamDetailResponse>>(null);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);

  const { data } = useGetTeamDetail(teamId);

  const members = team?.members;
  const membersIds = members?.filter((v) => v.isSubmitted).map((v) => v.userId);

  const teamTimeAvailableSchedule = useMemo(() => {
    if (!members) return initialTimeSchedule;

    const membersSchedules = members
      .filter(
        (v) => activeIds.includes(v.userId) && v.isSubmitted && v.timetableData
      )
      .map((v) => v.timetableData!)
      .filter(
        (schedule): schedule is NonNullable<typeof schedule> =>
          schedule !== null
      );

    if (membersSchedules.length === 0) return initialTimeSchedule;

    const [firstSchedule, ...restSchedules] = membersSchedules;
    const commonSchedule = { ...firstSchedule };

    Object.keys(commonSchedule).forEach((day) => {
      const dayKey = day as Range;
      let commonTimes = [...commonSchedule[dayKey]];

      restSchedules.forEach((schedule) => {
        commonTimes = commonTimes.filter((time) =>
          schedule[dayKey].includes(time)
        );
      });

      commonSchedule[dayKey] = commonTimes;
    });

    return commonSchedule;
  }, [members, activeIds]);

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
        if (!members || !members.find((v) => v.userId === id)?.isSubmitted) {
          return;
        }

        setActiveIds([...activeIds, id]);
      }
    },
    [isActiveMember, activeIds, members]
  );

  const handleFilteredType = useCallback(
    (type: Position) => {
      if (filteredTypes.includes(type)) {
        // 필터링 타입을 제외시키면 해당 멤버들을 다시 active하게 만들어줍니다.
        const newActiveIds = members
          ?.filter(
            (v) =>
              v.position === type &&
              v.isSubmitted &&
              !activeIds.includes(v.userId)
          )
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
    if (!members) return;
    const ids = members.filter((v) => v.isSubmitted).map((v) => v.userId);
    setActiveIds(ids ?? []);
  }, [members]);

  useEffect(() => {
    if (!data) return;
    setTeam(data.data);
  }, [data]);

  const value: TeamDetailContextValue = {
    team,
    teamId,
    // isLoading,
    activeIds,
    filteredTypes,
    teamTimeAvailableSchedule,
    handleActiveMember,
    handleFilteredType,
    handleFilterdTypeReset,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

// Custom hook for using team context
export const useTeamDetail = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error(
      "useTeamDetail 는 반드시 TeamDetailProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};

// 기존 useTeamController와 호환성을 위한 hook
export const useTeamController = () => {
  const { handleActiveMember, handleFilteredType, handleFilterdTypeReset } =
    useTeamDetail();

  return {
    handleActiveMember,
    handleFilteredType,
    handleFilterdTypeReset,
  };
};
