import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { Card } from '@/components/ui/Card';
import { registerForPushNotificationsAsync, sendTestNotification } from '@/utils/notifications';

export default function NotificationsTest() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) setExpoPushToken(token);
      })
      .catch(() => {
        setStatus("Erreur lors de l'enregistrement");
      });

    const sub = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
      setStatus('Notification reçue !');
    });

    return () => sub.remove();
  }, []);

  const handleSendTest = async () => {
    if (!expoPushToken) {
      setStatus('Aucun token disponible');
      return;
    }
    setSending(true);
    setStatus('Envoi en cours...');
    try {
      await sendTestNotification(expoPushToken);
      setStatus('Notification envoyée !');
    } catch {
      setStatus("Erreur lors de l'envoi");
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background px-md pt-lg">
      <Text className="mb-lg text-2xl font-bold text-primary">Test des notifications</Text>

      {/* Token */}
      <Card className="mb-md">
        <Text className="mb-sm text-lg font-semibold text-primary">Push Token</Text>
        <Text className="text-sm text-secondary" selectable>
          {expoPushToken || 'En attente du token...'}
        </Text>
      </Card>

      {/* Send Test Button */}
      <TouchableOpacity
        onPress={handleSendTest}
        disabled={sending || !expoPushToken}
        activeOpacity={0.7}
        className={`mb-lg flex-row items-center justify-center rounded-xl py-lg ${
          sending || !expoPushToken ? 'bg-gray-300' : 'bg-accent'
        }`}>
        <Ionicons name="notifications" size={28} color="white" />
        <Text className="ml-sm text-xl font-bold text-white">Envoyer une notification test</Text>
      </TouchableOpacity>

      {/* Status */}
      {status ? (
        <Card className="mb-md">
          <Text className="text-lg font-semibold text-primary">Statut</Text>
          <Text className="mt-xs text-base text-secondary">{status}</Text>
        </Card>
      ) : null}

      {/* Last Notification */}
      {notification ? (
        <Card className="mb-lg">
          <Text className="mb-sm text-lg font-semibold text-primary">Dernière notification</Text>
          <Text className="text-base text-secondary">
            Titre : {notification.request.content.title}
          </Text>
          <Text className="text-base text-secondary">
            Corps : {notification.request.content.body}
          </Text>
          <Text className="mt-sm text-sm text-gray-400">
            Data : {JSON.stringify(notification.request.content.data)}
          </Text>
        </Card>
      ) : null}
    </ScrollView>
  );
}
