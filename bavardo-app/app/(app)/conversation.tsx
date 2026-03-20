import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ChatInput } from '@/components/messages/ChatInput';
import { MessageBubble } from '@/components/messages/MessageBubble';
import { useMessageStore } from '@/store/useMessageStore';
import type { Message } from '@/types/message';

function formatDateSeparator(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Hier';

  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
}

function getDateKey(isoString: string): string {
  return new Date(isoString).toISOString().split('T')[0];
}

type ListItem =
  | { type: 'date'; date: string; key: string }
  | { type: 'message'; message: Message; key: string };

export default function ConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const flatListRef = useRef<FlatList>(null);

  const conversations = useMessageStore((s) => s.conversations);
  const getMessages = useMessageStore((s) => s.getMessages);
  const sendMessage = useMessageStore((s) => s.sendMessage);
  const markAsRead = useMessageStore((s) => s.markAsRead);

  const conversation = conversations.find((c) => c.id === id);
  const messages = getMessages(id || '');

  // Mark as read when opening
  useEffect(() => {
    if (id) markAsRead(id);
  }, [id, markAsRead]);

  // Build list with date separators
  const listItems: ListItem[] = useMemo(() => {
    const items: ListItem[] = [];
    let lastDate = '';

    for (const msg of messages) {
      const dateKey = getDateKey(msg.timestamp);
      if (dateKey !== lastDate) {
        items.push({ type: 'date', date: msg.timestamp, key: `date-${dateKey}` });
        lastDate = dateKey;
      }
      items.push({ type: 'message', message: msg, key: msg.id });
    }

    return items;
  }, [messages]);

  const handleSend = (text: string) => {
    if (!id) return;
    sendMessage(id, text);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (!conversation) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-gray-400">Conversation introuvable</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
      keyboardVerticalOffset={0}>
      {/* Header */}
      <View className="flex-row items-center border-b border-gray-100 bg-white px-md py-md">
        <TouchableOpacity onPress={() => router.back()} className="mr-md">
          <Ionicons name="arrow-back" size={24} color="#003E3A" />
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-bold text-primary">{conversation.contactName}</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={listItems}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          if (item.type === 'date') {
            return (
              <View className="my-md items-center">
                <View className="rounded-full bg-gray-200 px-md py-xs">
                  <Text className="text-xs font-semibold text-gray-500">
                    {formatDateSeparator(item.date)}
                  </Text>
                </View>
              </View>
            );
          }
          return <MessageBubble message={item.message} />;
        }}
        contentContainerStyle={{ paddingVertical: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Input */}
      <ChatInput onSend={handleSend} onMicPress={() => {}} />
    </KeyboardAvoidingView>
  );
}
