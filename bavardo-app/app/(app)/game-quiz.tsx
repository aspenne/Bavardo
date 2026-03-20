import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useGameStore } from '@/store/useGameStore';

type Question = {
  question: string;
  choices: string[];
  answer: number;
};

const QUESTION_BANK: Question[] = [
  {
    question: 'Quelle est la capitale de la France ?',
    choices: ['Lyon', 'Paris', 'Marseille', 'Bordeaux'],
    answer: 1,
  },
  {
    question: 'En quelle année la Tour Eiffel a-t-elle été construite ?',
    choices: ['1789', '1850', '1889', '1920'],
    answer: 2,
  },
  {
    question: 'Quel fleuve traverse Paris ?',
    choices: ['La Loire', 'Le Rhône', 'La Seine', 'La Garonne'],
    answer: 2,
  },
  {
    question: 'Qui a peint la Joconde ?',
    choices: ['Michel-Ange', 'Léonard de Vinci', 'Raphaël', 'Picasso'],
    answer: 1,
  },
  {
    question: 'Combien de départements compte la France métropolitaine ?',
    choices: ['86', '96', '101', '110'],
    answer: 1,
  },
  {
    question: 'Quel est le plus long fleuve de France ?',
    choices: ['La Seine', 'Le Rhône', 'La Garonne', 'La Loire'],
    answer: 3,
  },
  {
    question: 'Quelle ville est surnommée la « Ville Rose » ?',
    choices: ['Montpellier', 'Toulouse', 'Nice', 'Strasbourg'],
    answer: 1,
  },
  {
    question: 'Quel roi a fait construire le château de Versailles ?',
    choices: ['Henri IV', 'Louis XIII', 'Louis XIV', 'Louis XVI'],
    answer: 2,
  },
  {
    question: "Quel est l'animal symbole de la France ?",
    choices: ["L'aigle", 'Le coq', 'Le lion', 'Le cerf'],
    answer: 1,
  },
  {
    question: "En quelle année l'euro est-il entré en circulation ?",
    choices: ['1999', '2000', '2002', '2005'],
    answer: 2,
  },
  {
    question: 'Quel est le plus haut sommet des Alpes ?',
    choices: ['Le Mont Ventoux', 'Le Mont Blanc', "L'Aiguille du Midi", 'La Meije'],
    answer: 1,
  },
  {
    question: 'Qui a écrit « Les Misérables » ?',
    choices: ['Émile Zola', 'Victor Hugo', 'Alexandre Dumas', 'Gustave Flaubert'],
    answer: 1,
  },
  {
    question: "Quelle mer borde la Côte d'Azur ?",
    choices: ["L'océan Atlantique", 'La Manche', 'La mer Méditerranée', 'La mer du Nord'],
    answer: 2,
  },
  {
    question: 'Combien de côtés a un hexagone ?',
    choices: ['5', '6', '7', '8'],
    answer: 1,
  },
  {
    question: 'Quel fromage est originaire de Normandie ?',
    choices: ['Le Roquefort', 'Le Comté', 'Le Camembert', 'Le Reblochon'],
    answer: 2,
  },
  {
    question: 'Quelle planète est la plus proche du Soleil ?',
    choices: ['Vénus', 'Mars', 'Mercure', 'Jupiter'],
    answer: 2,
  },
  {
    question: "Quel est l'hymne national français ?",
    choices: ['La Marseillaise', 'Le Chant du Départ', 'La Parisienne', 'La Carmagnole'],
    answer: 0,
  },
  {
    question: 'En quelle année a eu lieu la Révolution française ?',
    choices: ['1776', '1789', '1804', '1815'],
    answer: 1,
  },
  {
    question: 'Quel océan borde la côte ouest de la France ?',
    choices: ["L'océan Atlantique", "L'océan Pacifique", "L'océan Indien", 'La mer du Nord'],
    answer: 0,
  },
  {
    question: 'Combien de joueurs composent une équipe de football ?',
    choices: ['9', '10', '11', '12'],
    answer: 2,
  },
  {
    question: 'Quel monument parisien abrite la tombe de Napoléon ?',
    choices: ['Le Panthéon', 'Les Invalides', 'Notre-Dame', "L'Arc de Triomphe"],
    answer: 1,
  },
  {
    question: 'Quelle est la monnaie du Royaume-Uni ?',
    choices: ["L'euro", 'Le dollar', 'La livre sterling', 'Le franc'],
    answer: 2,
  },
];

function pickQuestions(count: number): Question[] {
  const shuffled = [...QUESTION_BANK];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

const TOTAL = 10;

export default function GameQuiz() {
  const router = useRouter();
  const setScore = useGameStore((s) => s.setScore);
  const [questions, setQuestions] = useState<Question[]>(() => pickQuestions(TOTAL));
  const [current, setCurrent] = useState(0);
  const [score, setLocalScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleAnswer = useCallback(
    (choiceIndex: number) => {
      if (selected !== null) return;
      setSelected(choiceIndex);

      const correct = choiceIndex === q.answer;
      const newScore = correct ? score + 1 : score;
      if (correct) setLocalScore(newScore);

      setTimeout(() => {
        if (current + 1 >= TOTAL) {
          setFinished(true);
          setScore('quiz', newScore);
        } else {
          setCurrent((c) => c + 1);
          setSelected(null);
        }
      }, 1500);
    },
    [selected, q, score, current, setScore]
  );

  const reset = () => {
    setQuestions(pickQuestions(TOTAL));
    setCurrent(0);
    setLocalScore(0);
    setSelected(null);
    setFinished(false);
  };

  const getMessage = (s: number): string => {
    if (s >= 9) return 'Excellent ! 🌟';
    if (s >= 7) return 'Très bien ! 👏';
    if (s >= 5) return 'Pas mal ! 😊';
    return 'Courage, réessayez ! 💪';
  };

  if (finished) {
    return (
      <View className="flex-1 bg-background">
        <View className="flex-row items-center border-b border-gray-100 bg-white px-md py-md">
          <TouchableOpacity onPress={() => router.back()} className="mr-md">
            <Ionicons name="arrow-back" size={24} color="#003E3A" />
          </TouchableOpacity>
          <Text className="flex-1 text-xl font-bold text-primary">Quiz Culture</Text>
        </View>
        <View className="flex-1 items-center justify-center px-lg">
          <Text className="mb-md text-6xl">🧠</Text>
          <Text className="mb-md text-3xl font-bold text-primary">
            {score}/{TOTAL}
          </Text>
          <Text className="mb-lg text-xl text-secondary">{getMessage(score)}</Text>
          <TouchableOpacity onPress={reset} className="rounded-xl bg-accent px-xl py-md">
            <Text className="text-lg font-bold text-white">Rejouer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center border-b border-gray-100 bg-white px-md py-md">
        <TouchableOpacity onPress={() => router.back()} className="mr-md">
          <Ionicons name="arrow-back" size={24} color="#003E3A" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-bold text-primary">Quiz Culture</Text>
        <Text className="text-lg font-semibold text-secondary">
          {current + 1}/{TOTAL}
        </Text>
      </View>

      {/* Progress */}
      <View className="bg-white px-md py-sm">
        <View className="h-2 overflow-hidden rounded-full bg-gray-200">
          <View
            className="h-full rounded-full bg-accent"
            style={{ width: `${((current + 1) / TOTAL) * 100}%` }}
          />
        </View>
      </View>

      {/* Question */}
      <View className="flex-1 px-md pt-lg">
        <View className="mb-lg rounded-xl bg-white p-lg shadow-sm">
          <Text className="text-center text-xl font-semibold leading-8 text-primary">
            {q.question}
          </Text>
        </View>

        {/* Choices */}
        <View className="gap-sm">
          {q.choices.map((choice, i) => {
            let bgClass = 'bg-white';
            if (selected !== null) {
              if (i === q.answer) bgClass = 'bg-green-100';
              else if (i === selected) bgClass = 'bg-red-100';
            }
            return (
              <TouchableOpacity
                key={i}
                onPress={() => handleAnswer(i)}
                className={`rounded-xl px-lg py-md shadow-sm ${bgClass}`}>
                <Text className="text-lg text-primary">{choice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Score indicator */}
        <View className="mt-lg items-center">
          <Text className="text-lg font-semibold text-secondary">
            Score : {score}/{current + (selected !== null ? 1 : 0)}
          </Text>
        </View>
      </View>
    </View>
  );
}
