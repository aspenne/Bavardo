import '../global.css';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect, useRef } from 'react';

import { setConfig } from '@/services/ai';
import { registerForPushNotificationsAsync } from '@/utils/notifications';

export default function RootLayout() {
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    // Initialize AI provider with API key from config
    const geminiApiKey = Constants.expoConfig?.extra?.geminiApiKey;
    if (geminiApiKey) {
      setConfig({ apiKey: geminiApiKey });
    }

    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) console.log('Push token registered:', token);
      })
      .catch((error: unknown) => {
        console.error('Push notification registration failed:', error);
      });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification tapped:', response);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
