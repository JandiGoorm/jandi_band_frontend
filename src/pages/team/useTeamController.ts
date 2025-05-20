import { useCallback, useEffect } from "react";
import { useTeamStore } from "./teamStore";
import { type Position } from "./constants";

const useTeamController = () => {
  const { team, activeIds, setActiveIds, filteredTypes, setFilteredTypes } =
    useTeamStore();

  const members = team.members;
  const membersIds = members.map((v) => v.id);

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
    [isActiveMember, activeIds, setActiveIds]
  );

  const handleFilteredType = useCallback(
    (type: Position) => {
      if (filteredTypes.includes(type)) {
        // 필터링 타입을 제외시키면 해당 멤버들을 다시 active하게 만들어줍니다.
        const newActiveIds = members
          .filter((v) => v.position === type && !activeIds.includes(v.id))
          .map((v) => v.id);

        if (newActiveIds.length > 0) {
          setActiveIds([...activeIds, ...newActiveIds]);
        }
        setFilteredTypes(filteredTypes.filter((t) => t !== type));
      } else {
        setFilteredTypes([...filteredTypes, type]);
      }
    },
    [activeIds, filteredTypes, members, setActiveIds, setFilteredTypes]
  );

  // 필터링을 초기화하는 함수.
  const handleFilterdTypeReset = useCallback(() => {
    setFilteredTypes([]);
    setActiveIds(membersIds);
  }, [membersIds, setActiveIds, setFilteredTypes]);

  // 필터 타입이 변경되면 필터된 멤버들을 업데이트
  useEffect(() => {
    const filteredMembersIds = activeIds.filter((v) => {
      const member = members.find((m) => m.id === v);
      if (member) {
        return !filteredTypes.includes(member.position);
      }
      return true;
    });

    setActiveIds(filteredMembersIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTypes, members, setActiveIds]);

  // 초기에는 전체 멤버 active
  useEffect(() => {
    const ids = members.map((v) => v.id);
    setActiveIds(ids);
  }, [members, setActiveIds]);

  return {
    handleActiveMember,
    handleFilteredType,
    handleFilterdTypeReset,
  };
};

export default useTeamController;
