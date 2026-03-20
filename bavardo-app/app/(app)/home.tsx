import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { ask, isReady } from '@/services/ai';

let Speech: typeof import('expo-speech') | null = null;
let ExpoSpeechRecognitionModule:
  | typeof import('expo-speech-recognition').ExpoSpeechRecognitionModule
  | null = null;
let useSpeechRecognitionEvent: typeof import('expo-speech-recognition').useSpeechRecognitionEvent =
  (() => {}) as any;

try {
  Speech = require('expo-speech');
  const speechRecognition = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
} catch {
  console.warn('Native speech modules not available (Expo Go)');
}

export default function Home() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [thinking, setThinking] = useState(false);
  const pendingTranscript = useRef('');

  useSpeechRecognitionEvent('start', () => setRecognizing(true));
  useSpeechRecognitionEvent('end', () => {
    setRecognizing(false);
    // When speech recognition ends, send the final transcript to AI
    if (pendingTranscript.current) {
      sendToAI(pendingTranscript.current);
    }
  });
  useSpeechRecognitionEvent('result', (event: any) => {
    const text = event.results[0]?.transcript || '';
    setTranscript(text);
    if (event.results[0]?.isFinal) {
      pendingTranscript.current = text;
    }
  });
  useSpeechRecognitionEvent('error', (event: any) => {
    console.log('error code:', event.error, 'error message:', event.message);
  });

  const sendToAI = async (userMessage: string) => {
    if (!userMessage.trim() || !isReady()) return;

    setThinking(true);
    setAiResponse('');

    try {
      const response = await ask(userMessage);
      setAiResponse(response);

      // Auto-read the response aloud
      speakText(response);
    } catch (error) {
      console.error('AI error:', error);
      const errorMsg = "Désolé, je n'ai pas pu vous répondre. Réessayez.";
      setAiResponse(errorMsg);
      speakText(errorMsg);
    } finally {
      setThinking(false);
      pendingTranscript.current = '';
    }
  };

  const handleStart = async () => {
    if (!ExpoSpeechRecognitionModule) return;
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn('Permissions not granted', result);
      return;
    }
    // Reset for new interaction
    setTranscript('');
    pendingTranscript.current = '';
    ExpoSpeechRecognitionModule.start({
      lang: 'fr-FR',
      interimResults: true,
      continuous: false,
    });
  };

  const handleMicPress = () => {
    if (recognizing) {
      ExpoSpeechRecognitionModule?.stop();
    } else {
      handleStart();
    }
  };

  const speakText = (text: string) => {
    if (!Speech) return;
    Speech.speak(text, {
      voice: 'com.apple.voice.compact.fr-FR.Thomas',
      pitch: 1.0,
      rate: 1.0,
    });
  };

  const speak = () => {
    const text =
      aiResponse || 'Bonjour ! Je suis Bavardo, votre assistant. Comment puis-je vous aider ?';
    speakText(text);
  };

  const getStatusText = () => {
    if (thinking) return 'Je réfléchis...';
    if (recognizing) return 'Je vous écoute...';
    return 'Appuyez pour parler';
  };

  return (
    <View className="flex-1 bg-background px-md pb-md pt-lg">
      {/* AI Response Bubble */}
      <Card className="mb-lg">
        <Text className="text-xl leading-8 text-primary">
          {aiResponse || 'Appuyez sur le microphone\npour me dire ce que vous souhaitez faire.'}
        </Text>
      </Card>

      {/* Center: Mascot + Mic Button */}
      <View className="flex-1 items-center justify-center">
        {/* Mascot */}
        <View className="mb-xl items-center">
          <View className="h-32 w-32 items-center justify-center rounded-full bg-primary/10">
            <Text className="text-7xl">🐢</Text>
          </View>
        </View>

        {/* Mic Button */}
        <TouchableOpacity
          onPress={handleMicPress}
          activeOpacity={0.7}
          disabled={thinking}
          className={`h-28 w-28 items-center justify-center rounded-full shadow-lg ${
            thinking ? 'bg-gray-400' : recognizing ? 'bg-accent' : 'bg-primary'
          }`}>
          {thinking ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Ionicons name={recognizing ? 'stop' : 'mic'} size={44} color="white" />
          )}
        </TouchableOpacity>

        {/* Status Text */}
        <Text className="mt-lg text-xl font-semibold text-secondary">{getStatusText()}</Text>

        {/* Listen Button */}
        <TouchableOpacity
          onPress={speak}
          activeOpacity={0.7}
          className="mt-xl flex-row items-center justify-center rounded-xl bg-secondary px-lg py-md">
          <Ionicons name="volume-high" size={28} color="white" />
          <Text className="ml-sm text-xl font-semibold text-white">Écouter</Text>
        </TouchableOpacity>
      </View>

      {/* Transcript (what the user said) */}
      {transcript ? (
        <Card className="mb-md bg-gray-100">
          <Text className="text-sm font-semibold text-secondary">Vous avez dit :</Text>
          <Text className="mt-xs text-lg leading-7 text-primary">{transcript}</Text>
        </Card>
      ) : null}

      {/* Help Text */}
      <View className="mb-md items-center px-md">
        <Text className="text-center text-lg text-secondary">
          Vous pouvez dire : &quot;Quel temps fait-il ?&quot;, &quot;Raconte-moi une blague&quot;...
        </Text>
      </View>
    </View>
  );
}
