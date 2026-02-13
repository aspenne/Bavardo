import { Text, TouchableOpacity, View } from 'react-native';

import { CalendarEvent } from '@/types/event';

const colorStyles = {
  blue: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700' },
  green: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700' },
  orange: { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700' },
  gray: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700' },
};

type EventCardProps = {
  event: CalendarEvent;
  onPress: (event: CalendarEvent) => void;
  compact?: boolean;
};

export default function EventCard({ event, onPress, compact = false }: EventCardProps) {
  const colors = colorStyles[event.color];

  if (compact) {
    return (
      <TouchableOpacity
        onPress={() => onPress(event)}
        className={`mb-1 rounded border-l-4 px-1 py-0.5 ${colors.bg} ${colors.border}`}>
        <Text className={`text-xs font-medium ${colors.text}`} numberOfLines={1}>
          {event.title}
        </Text>
        {event.time && <Text className="text-xs text-gray-500">{event.time}</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(event)}
      className={`mb-sm rounded-lg border-l-4 p-3 ${colors.bg} ${colors.border}`}>
      <View className="flex-row items-center justify-between">
        <Text className={`text-base font-semibold ${colors.text}`}>{event.title}</Text>
        {event.time && <Text className="text-sm text-gray-500">{event.time}</Text>}
      </View>
      {event.description ? (
        <Text className="mt-1 text-sm text-gray-600" numberOfLines={2}>
          {event.description}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}
