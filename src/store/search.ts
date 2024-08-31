import { create } from "zustand";

export interface ISearchStore {
    searchText: string;
    setSearchText: (blinkLink: string) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
    searchText: "",
    setSearchText: (searchText: string) => set({ searchText: searchText }),
}));

export default useSearchStore;