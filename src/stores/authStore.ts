import type { UserInfo } from "@/types/auth";
import { create } from "zustand";

interface AuthStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
}));
