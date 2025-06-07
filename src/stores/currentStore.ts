// currentMonth, Year를 저장하기 위한 저장소
import { create } from "zustand";

interface CurrentStore {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  goToday: () => void;
}

export const useCurrentStore = create<CurrentStore>((set) => ({
  currentMonth: new Date(),
  setCurrentMonth: (date) => set({ currentMonth: date }),
  goToday: () => set({ currentMonth: new Date() }),
}));
