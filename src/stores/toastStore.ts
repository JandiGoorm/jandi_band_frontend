import { create } from "zustand";

type ToastStatus = "pending" | "success" | "error";

interface ToastState {
  open: boolean;
  status: ToastStatus;
  message: string;
  currentToastId: string | null;
  showToast: (status: ToastStatus, message: string, id: string) => string;
  updateToast: (id: string, status: ToastStatus, message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  open: false,
  status: "pending",
  message: "",
  currentToastId: null,

  showToast: (status, message, id) => {
    set({ open: true, status, message, currentToastId: id });
    return id;
  },

  updateToast: (id, status, message) => {
    // 현재 표시 중인 토스트 ID와 일치할 때만 업데이트
    if (get().currentToastId === id) {
      set({ status, message });
    }
  },

  hideToast: () => set({ open: false }),
}));
