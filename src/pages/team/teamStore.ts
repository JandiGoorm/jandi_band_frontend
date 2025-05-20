import { create } from "zustand";
import type { Team } from "./constants";
import { dummyTeam } from "./constants";

interface TeamStore {
  team: Team;
  setTeam: (team: Team) => void;
  activeIds: number[];
  setActiveIds: (filteredIds: number[]) => void;
  filteredTypes: string[];
  setFilteredTypes: (filteredType: string[]) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  team: dummyTeam,
  setTeam: (team) => set({ team }),
  activeIds: [],
  setActiveIds: (activeIds) => set({ activeIds }),
  filteredTypes: [],
  setFilteredTypes: (filteredTypes) => set({ filteredTypes }),
}));
