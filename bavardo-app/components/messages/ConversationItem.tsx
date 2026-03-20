import { Text, TouchableOpacity, View } from 'react-native';

import type { Conversation } from '@/types/message';

const AVATAR_COLORS = ['#003E3A', '#4A897A', '#F1844F', '#6B7280', '#8B5CF6'];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (const char of name) {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) {
    const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    return days[date.getDay()];
  }
  return `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

type ConversationItemProps = {
  conversation: Conversation;
  onPress: () => void;
};

export function ConversationItem({ conversation, onPress }: ConversationItemProps) {
  const isEmoji = /\p{Emoji}/u.test(conversation.contactAvatar);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center border-b border-gray-100 px-md py-md">
      {/* Avatar */}
      <View
        className="mr-md h-14 w-14 items-center justify-center rounded-full"
        style={
          !isEmoji ? { backgroundColor: getAvatarColor(conversation.contactName) } : undefined
        }>
        {isEmoji ? (
          <View className="h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Text className="text-2xl">{conversation.contactAvatar}</Text>
          </View>
        ) : (
          <Text className="text-lg font-bold text-white">{conversation.contactAvatar}</Text>
        )}
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-primary" numberOfLines={1}>
            {conversation.contactName}
          </Text>
          <Text className="text-xs text-gray-400">{formatTime(conversation.lastMessageTime)}</Text>
        </View>
        <View className="mt-xs flex-row items-center justify-between">
          <Text className="flex-1 text-sm text-secondary" numberOfLines={1}>
            {conversation.lastMessage}
          </Text>
          {conversation.unreadCount > 0 && (
            <View className="ml-sm h-6 w-6 items-center justify-center rounded-full bg-accent">
              <Text className="text-xs font-bold text-white">{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
