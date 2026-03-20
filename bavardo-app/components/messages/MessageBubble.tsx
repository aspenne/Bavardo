import { Text, View } from 'react-native';

import type { Message } from '@/types/message';

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMine = message.senderId === 'me';

  return (
    <View className={`mb-sm px-md ${isMine ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[80%] rounded-2xl px-lg py-md ${
          isMine ? 'rounded-br-sm bg-primary' : 'rounded-bl-sm bg-white shadow-sm'
        }`}>
        <Text className={`text-base leading-6 ${isMine ? 'text-white' : 'text-primary'}`}>
          {message.text}
        </Text>
      </View>
      <Text className="mt-xs px-sm text-xs text-gray-400">{formatTime(message.timestamp)}</Text>
    </View>
  );
}
