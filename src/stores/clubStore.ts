// 현재 클럽 id 저장하기 위한 store
import { create } from "zustand";

interface ClubStore {
  clubId: number | null;
  setClubId: (clubId: number) => void;
}

export const useClubStore = create<ClubStore>((set) => ({
  clubId: null,
  setClubId: (clubId) => set({ clubId }),
}));
