import { create } from "zustand";

type CountStore = {
  count: number;
  increase: () => void;
  removeAll: () => void;
  update: (newBears: number) => void;
};

export const useCountState = create<CountStore>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  removeAll: () => set({ count: 0 }),
  update: (newBears: number) => set({ count: newBears }),
}));
