import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useGameStore } from '@/store/useGameStore';

const EMOJIS = ['🌺', '🦋', '🌈', '🎵', '🍎', '⭐', '🐢', '🌻'];

type CardState = {
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

function createDeck(): CardState[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((emoji) => ({ emoji, flipped: false, matched: false }));
}

export default function GameMemory() {
  const router = useRouter();
  const setScore = useGameStore((s) => s.setScore);
  const [cards, setCards] = useState<CardState[]>(createDeck);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = pairs === EMOJIS.length;

  const handleTap = useCallback(
    (index: number) => {
      if (locked || won) return;
      if (cards[index].flipped || cards[index].matched) return;
      if (selected.includes(index)) return;

      const newCards = cards.map((c) => ({ ...c }));
      newCards[index].flipped = true;
      setCards(newCards);

      const newSelected = [...selected, index];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        const newMoves = moves + 1;
        setMoves(newMoves);

        const [first, second] = newSelected;
        if (newCards[first].emoji === newCards[second].emoji) {
          // Match found
          newCards[first].matched = true;
          newCards[second].matched = true;
          setCards(newCards);
          setSelected([]);
          const newPairs = pairs + 1;
          setPairs(newPairs);
          if (newPairs === EMOJIS.length) {
            setScore('memory', newMoves);
          }
        } else {
          // No match — flip back after delay
          setLocked(true);
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) => (i === first || i === second ? { ...c, flipped: false } : c))
            );
            setSelected([]);
            setLocked(false);
          }, 1000);
        }
      }
    },
    [cards, selected, moves, pairs, locked, won, setScore]
  );

  const reset = () => {
    setCards(createDeck());
    setSelected([]);
    setMoves(0);
    setPairs(0);
    setLocked(false);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center border-b border-gray-100 bg-white px-md py-md">
        <TouchableOpacity onPress={() => router.back()} className="mr-md">
          <Ionicons name="arrow-back" size={24} color="#003E3A" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-bold text-primary">Memory</Text>
        <TouchableOpacity onPress={reset}>
          <Ionicons name="refresh" size={24} color="#003E3A" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around bg-white py-sm">
        <Text className="text-lg font-semibold text-primary">🃏 {moves} coups</Text>
        <Text className="text-lg font-semibold text-primary">
          ✅ {pairs}/{EMOJIS.length} paires
        </Text>
      </View>

      {/* Board */}
      <View className="flex-1 items-center justify-center px-md">
        <View className="rounded-lg bg-white p-sm shadow-md">
          {[0, 1, 2, 3].map((row) => (
            <View key={row} className="flex-row">
              {[0, 1, 2, 3].map((col) => {
                const index = row * 4 + col;
                const card = cards[index];
                const isVisible = card.flipped || card.matched;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleTap(index)}
                    className={`m-[2px] h-20 w-20 items-center justify-center rounded-lg ${
                      card.matched
                        ? 'bg-green-100'
                        : isVisible
                          ? 'border border-gray-200 bg-white'
                          : 'bg-secondary'
                    }`}>
                    {isVisible ? (
                      <Text className="text-4xl">{card.emoji}</Text>
                    ) : (
                      <Text className="text-3xl">❓</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Won */}
      {won && (
        <View className="items-center bg-white py-lg">
          <Text className="mb-md text-2xl font-bold text-primary">🎉 Bravo !</Text>
          <Text className="mb-md text-lg text-secondary">En {moves} coups</Text>
          <TouchableOpacity onPress={reset} className="rounded-xl bg-accent px-xl py-md">
            <Text className="text-lg font-bold text-white">Rejouer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
