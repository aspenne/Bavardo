import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useGameStore } from '@/store/useGameStore';

type Board = (string | null)[];
type Result = 'X' | 'O' | 'draw' | null;

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: Board): Result {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as 'X' | 'O';
    }
  }
  if (board.every((cell) => cell !== null)) return 'draw';
  return null;
}

function getAIMove(board: Board): number {
  // 1. Try to win
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = 'O';
      if (checkWinner(test) === 'O') return i;
    }
  }
  // 2. Block player
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = 'X';
      if (checkWinner(test) === 'X') return i;
    }
  }
  // 3. Center
  if (!board[4]) return 4;
  // 4. Corners
  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  // 5. Any empty
  const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function GameTicTacToe() {
  const router = useRouter();
  const setScore = useGameStore((s) => s.setScore);
  const getScore = useGameStore((s) => s.getScore);
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [result, setResult] = useState<Result>(null);
  const [thinking, setThinking] = useState(false);
  const [stats, setStats] = useState({ wins: getScore('tictactoe') ?? 0 });

  const handleTap = useCallback(
    (index: number) => {
      if (board[index] || result || thinking) return;

      const newBoard = [...board];
      newBoard[index] = 'X';

      const playerResult = checkWinner(newBoard);
      if (playerResult) {
        setBoard(newBoard);
        setResult(playerResult);
        if (playerResult === 'X') {
          const newWins = stats.wins + 1;
          setStats({ wins: newWins });
          setScore('tictactoe', newWins);
        }
        return;
      }

      setBoard(newBoard);
      setThinking(true);

      // AI plays after short delay
      setTimeout(() => {
        const aiMove = getAIMove(newBoard);
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = 'O';
        setBoard(aiBoard);
        setThinking(false);

        const aiResult = checkWinner(aiBoard);
        if (aiResult) {
          setResult(aiResult);
        }
      }, 500);
    },
    [board, result, thinking, stats, setScore]
  );

  const reset = () => {
    setBoard(Array(9).fill(null));
    setResult(null);
    setThinking(false);
  };

  const statusText = result
    ? result === 'X'
      ? '🎉 Vous avez gagné !'
      : result === 'O'
        ? '😏 Bavardo a gagné !'
        : '🤝 Match nul !'
    : thinking
      ? 'Bavardo réfléchit...'
      : 'À vous de jouer';

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center border-b border-gray-100 bg-white px-md py-md">
        <TouchableOpacity onPress={() => router.back()} className="mr-md">
          <Ionicons name="arrow-back" size={24} color="#003E3A" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-bold text-primary">Morpion</Text>
        <TouchableOpacity onPress={reset}>
          <Ionicons name="refresh" size={24} color="#003E3A" />
        </TouchableOpacity>
      </View>

      {/* Score */}
      <View className="flex-row justify-center bg-white py-sm">
        <Text className="text-lg font-semibold text-primary">🏆 Victoires : {stats.wins}</Text>
      </View>

      {/* Status */}
      <View className="items-center py-md">
        <Text className="text-xl font-semibold text-primary">{statusText}</Text>
      </View>

      {/* Board */}
      <View className="flex-1 items-center justify-center">
        <View className="rounded-lg bg-white p-sm shadow-md">
          {[0, 1, 2].map((row) => (
            <View key={row} className="flex-row">
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                const value = board[index];
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleTap(index)}
                    className="m-[2px] h-24 w-24 items-center justify-center rounded-md bg-gray-50">
                    <Text
                      className="text-5xl font-bold"
                      style={{
                        color:
                          value === 'X' ? '#F1844F' : value === 'O' ? '#4A897A' : 'transparent',
                      }}>
                      {value ?? '.'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Game Over */}
      {result && (
        <View className="items-center bg-white py-lg">
          <TouchableOpacity onPress={reset} className="rounded-xl bg-accent px-xl py-md">
            <Text className="text-lg font-bold text-white">Rejouer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
