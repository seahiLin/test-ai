// zustand user store
import create from "zustand";
import { User } from "@/lib/api";

export const useUserStore = create<{
  user: User | null;
  setUser: (user: User) => void;
}>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}))