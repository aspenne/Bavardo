import { create } from 'zustand';

interface GameState {
  scores: Record<string, number>;
  setScore: (game: string, score: number) => void;
  getScore: (game: string) => number | null;
}

export const useGameStore = create<GameState>((set, get) => ({
  scores: {},

  setScore: (game: string, score: number) => {
    set((state) => {
      const current = state.scores[game];
      // For quiz: higher is better. For memory/minesweeper: lower is better.
      const lowerIsBetter = game !== 'quiz';
      const isBetter = current === undefined || (lowerIsBetter ? score < current : score > current);
      if (isBetter) {
        return { scores: { ...state.scores, [game]: score } };
      }
      return state;
    });
  },

  getScore: (game: string) => {
    return get().scores[game] ?? null;
  },
}));
