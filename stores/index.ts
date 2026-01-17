import { create } from "zustand";

interface appState {
	mainPano: boolean;
	switchView: () => void;
}

const useAppStore = create<appState>((set) => ({
	mainPano: true,
	switchView: () =>
		set((state): any => ({
			mainPano: !state.mainPano,
		})),
}));

export { useAppStore };
