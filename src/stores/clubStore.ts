// 현재 클럽 id 저장하기 위한 store
import { create } from "zustand";

interface ClubMember {
  userId: number;
  name: string;
  position: string;
}

interface ClubStore {
  clubId: number | null;
  setClubId: (clubId: number) => void;
  members: ClubMember[];
  setClubMembers: (members: ClubMember[]) => void;
}

export const useClubStore = create<ClubStore>((set) => ({
  clubId: null,
  setClubId: (clubId) => set({ clubId }),
  members: [],
  setClubMembers: (members) => set({ members }),
}));
