// 팀 아이디 저장을 위한 store
import { create } from "zustand";

interface TeamStore {
  teamId: number | null;
  setTeamId: (id: number) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamId: null,
  setTeamId: (id) => set({ teamId: id }),
}));
