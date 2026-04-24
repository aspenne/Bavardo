import '../global.css';

import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { setConfig } from '@/services/ai';
import { useAuthStore } from '@/store/useAuthStore';

export default function RootLayout() {
  const loadSession = useAuthStore((s) => s.loadSession);

  useEffect(() => {
    // Charger la session existante (tokens stockés)
    loadSession();

    // Initialize AI provider with API key from config
    const geminiApiKey = Constants.expoConfig?.extra?.geminiApiKey;
    if (geminiApiKey) {
      setConfig({ apiKey: geminiApiKey });
    }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
