import { create } from "zustand";

interface DomainState {
  domain: string;
  setDomain: (newDomain: string) => void;
}

export const useDomainStore = create<DomainState>()((set) => ({
  domain: "",
  setDomain: (dmn: string) => set({ domain: dmn }),
}));
