import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { useGameStore } from '@/store/useGameStore';

const GAMES = [
  {
    id: 'minesweeper',
    name: 'Démineur',
    emoji: '💣',
    description: 'Trouvez les cases sans mines',
    route: '/game-minesweeper' as const,
    scoreLabel: 'Meilleur temps',
    scoreUnit: 's',
  },
  {
    id: 'memory',
    name: 'Memory',
    emoji: '🃏',
    description: 'Retrouvez les paires',
    route: '/game-memory' as const,
    scoreLabel: 'Moins de coups',
    scoreUnit: ' coups',
  },
  {
    id: 'tictactoe',
    name: 'Morpion',
    emoji: '❌',
    description: 'Jouez contre Bavardo',
    route: '/game-tictactoe' as const,
    scoreLabel: 'Victoires',
    scoreUnit: '',
  },
  {
    id: 'quiz',
    name: 'Quiz Culture',
    emoji: '🧠',
    description: 'Testez vos connaissances',
    route: '/game-quiz' as const,
    scoreLabel: 'Meilleur score',
    scoreUnit: '/10',
  },
];

export default function Games() {
  const router = useRouter();
  const getScore = useGameStore((s) => s.getScore);

  return (
    <ScrollView className="flex-1 bg-background px-md pt-lg">
      <Text className="mb-lg text-2xl font-bold text-primary">Jeux</Text>

      <View className="flex-row flex-wrap justify-between">
        {GAMES.map((game) => {
          const score = getScore(game.id);
          return (
            <TouchableOpacity
              key={game.id}
              onPress={() => router.push(game.route)}
              activeOpacity={0.7}
              className="mb-md w-[48%]">
              <Card className="items-center py-xl">
                <Text className="mb-md text-5xl">{game.emoji}</Text>
                <Text className="mb-xs text-xl font-bold text-primary">{game.name}</Text>
                <Text className="mb-md text-center text-sm text-secondary">
                  {game.description}
                </Text>
                {score !== null && (
                  <View className="rounded-full bg-primary/10 px-md py-xs">
                    <Text className="text-xs font-semibold text-primary">
                      {score}
                      {game.scoreUnit}
                    </Text>
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
