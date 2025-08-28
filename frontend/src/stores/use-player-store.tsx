import { create } from "zustand";

interface PlayerTrack{
    id: string;
    title: string;
    url: string;
    artwork: string;
    prompt: string;
    author: string;
}

interface PlayerState{
    track: PlayerTrack | null;
    setTrack: (track: PlayerTrack) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
    track: null,
    setTrack: (track) => set({ track }),
}));