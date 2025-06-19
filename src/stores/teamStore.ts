// 팀 아이디 저장을 위한 store
import { create } from "zustand";
import type { TeamDetailResponse } from "@/types/team";
import type { Nullable } from "@/types/common";

interface TeamStore {
  teamId: number | null;
  setTeamId: (id: number) => void;

  teamInfo: Nullable<TeamDetailResponse>;
  setTeamInfo: (info: Nullable<TeamDetailResponse>) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamId: null,
  setTeamId: (id) => set({ teamId: id }),

  teamInfo: null,
  setTeamInfo: (info) => set({ teamInfo: info }),
}));
