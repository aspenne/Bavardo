import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

import { ConversationItem } from '@/components/messages/ConversationItem';
import { useMessageStore } from '@/store/useMessageStore';

export default function Messages() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const getConversations = useMessageStore((s) => s.getConversations);

  const conversations = useMemo(() => {
    const all = getConversations();
    if (!search.trim()) return all;
    const q = search.toLowerCase();
    return all.filter((c) => c.contactName.toLowerCase().includes(q));
  }, [getConversations, search]);

  return (
    <View className="flex-1 bg-background">
      {/* Search Bar */}
      <View className="border-b border-gray-100 bg-white px-md py-sm">
        <View className="flex-row items-center rounded-full bg-gray-50 px-md py-xs">
          <Ionicons name="search" size={20} color="#9E9E9E" />
          <TextInput
            className="ml-sm flex-1 text-base"
            placeholder="Rechercher une conversation..."
            placeholderTextColor="#9E9E9E"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
          {search ? (
            <Ionicons name="close-circle" size={20} color="#9E9E9E" onPress={() => setSearch('')} />
          ) : null}
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            conversation={item}
            onPress={() => router.push({ pathname: '/conversation', params: { id: item.id } })}
          />
        )}
        contentContainerStyle={conversations.length === 0 ? { flex: 1 } : undefined}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-xl">
            <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
            <Text className="mt-md text-lg text-gray-400">Aucune conversation</Text>
          </View>
        }
      />
    </View>
  );
}
