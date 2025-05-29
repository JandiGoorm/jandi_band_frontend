// 곡 투표 관련 store
import { create } from "zustand";
import type { PollDetailType } from "@/types/vote.ts";

interface PollStore {
  poll: PollDetailType | null;
  setPoll: (poll: PollDetailType) => void;
}

export const usePollStore = create<PollStore>((set) => ({
  poll: null,
  setPoll: (poll) => set({ poll }),
}));
