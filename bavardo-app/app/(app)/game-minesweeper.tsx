import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { useGameStore } from '@/store/useGameStore';

const ROWS = 6;
const COLS = 6;
const MINES = 5;

type CellState = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

function createBoard(): CellState[][] {
  const board: CellState[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })),
  );

  // Place mines
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  // Calculate adjacent counts
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
            count++;
          }
        }
      }
      board[r][c].adjacent = count;
    }
  }

  return board;
}

const NUMBER_COLORS: Record<number, string> = {
  1: '#2196F3',
  2: '#4CAF50',
  3: '#F44336',
  4: '#9C27B0',
  5: '#FF9800',
  6: '#009688',
};

export default function GameMinesweeper() {
  const router = useRouter();
  const setScore = useGameStore((s) => s.setScore);
  const [board, setBoard] = useState<CellState[][]>(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (started && !gameOver && !won) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started, gameOver, won]);

  const flagCount = board.flat().filter((c) => c.flagged).length;

  const checkWin = useCallback(
    (b: CellState[][]) => {
      const allNonMinesRevealed = b
        .flat()
        .every((cell) => cell.mine || cell.revealed);
      if (allNonMinesRevealed) {
        setWon(true);
        setScore('minesweeper', time);
      }
    },
    [time, setScore],
  );

  const reveal = (r: number, c: number, b: CellState[][]): CellState[][] => {
    if (b[r][c].revealed || b[r][c].flagged) return b;
    b[r][c].revealed = true;

    if (b[r][c].adjacent === 0 && !b[r][c].mine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            reveal(nr, nc, b);
          }
        }
      }
    }

    return b;
  };

  const handlePress = (r: number, c: number) => {
    if (gameOver || won) return;
    if (board[r][c].flagged || board[r][c].revealed) return;

    if (!started) setStarted(true);

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (newBoard[r][c].mine) {
      // Reveal all mines
      newBoard.forEach((row) =>
        row.forEach((cell) => {
          if (cell.mine) cell.revealed = true;
        }),
      );
      setBoard(newBoard);
      setGameOver(true);
      return;
    }

    reveal(r, c, newBoard);
    setBoard(newBoard);
    checkWin(newBoard);
  };

  const handleLongPress = (r: number, c: number) => {
    if (gameOver || won) return;
    if (board[r][c].revealed) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].flagged = !newBoard[r][c].flagged;
    setBoard(newBoard);
  };

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setTime(0);
    setStarted(false);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center border-b border-gray-100 bg-white px-md py-md">
        <TouchableOpacity onPress={() => router.back()} className="mr-md">
          <Ionicons name="arrow-back" size={24} color="#003E3A" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-bold text-primary">Démineur</Text>
        <TouchableOpacity onPress={reset}>
          <Ionicons name="refresh" size={24} color="#003E3A" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around bg-white py-sm">
        <Text className="text-lg font-semibold text-primary">🚩 {MINES - flagCount}</Text>
        <Text className="text-lg font-semibold text-primary">⏱️ {time}s</Text>
      </View>

      {/* Board */}
      <View className="flex-1 items-center justify-center px-md">
        <View className="rounded-lg bg-white p-sm shadow-md">
          {board.map((row, r) => (
            <View key={r} className="flex-row">
              {row.map((cell, c) => (
                <TouchableOpacity
                  key={`${r}-${c}`}
                  onPress={() => handlePress(r, c)}
                  onLongPress={() => handleLongPress(r, c)}
                  delayLongPress={300}
                  className={`m-[1px] h-14 w-14 items-center justify-center rounded-sm ${
                    cell.revealed
                      ? cell.mine
                        ? 'bg-red-100'
                        : 'bg-gray-100'
                      : 'bg-secondary/20'
                  }`}>
                  {cell.revealed ? (
                    cell.mine ? (
                      <Text className="text-2xl">💣</Text>
                    ) : cell.adjacent > 0 ? (
                      <Text
                        className="text-xl font-bold"
                        style={{ color: NUMBER_COLORS[cell.adjacent] || '#000' }}>
                        {cell.adjacent}
                      </Text>
                    ) : null
                  ) : cell.flagged ? (
                    <Text className="text-2xl">🚩</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Game Over / Won */}
      {(gameOver || won) && (
        <View className="items-center bg-white py-lg">
          <Text className="mb-md text-2xl font-bold text-primary">
            {won ? '🎉 Gagné !' : '💥 Perdu !'}
          </Text>
          {won && <Text className="mb-md text-lg text-secondary">Temps : {time}s</Text>}
          <TouchableOpacity
            onPress={reset}
            className="rounded-xl bg-accent px-xl py-md">
            <Text className="text-lg font-bold text-white">Rejouer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
