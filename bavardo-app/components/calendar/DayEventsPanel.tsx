import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import EventCard from '@/components/calendar/EventCard';
import { CalendarEvent } from '@/types/event';

const MONTHS = [
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

type DayEventsPanelProps = {
  date: string; // YYYY-MM-DD
  events: CalendarEvent[];
  onEventPress: (event: CalendarEvent) => void;
  onAddPress: () => void;
  onClose: () => void;
};

export default function DayEventsPanel({
  date,
  events,
  onEventPress,
  onAddPress,
  onClose,
}: DayEventsPanelProps) {
  const [year, month, day] = date.split('-').map(Number);
  const dateLabel = `${day} ${MONTHS[month - 1]} ${year}`;

  return (
    <View className="border-t-2 border-gray-200 bg-white p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">{dateLabel}</Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={onAddPress} className="rounded-lg bg-accent px-3 py-1.5">
            <Text className="text-sm font-semibold text-white">+ Ajouter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} className="rounded-lg bg-gray-100 px-3 py-1.5">
            <Text className="text-sm text-gray-600">Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {events.length === 0 ? (
        <Text className="py-4 text-center text-gray-500">Aucun événement ce jour</Text>
      ) : (
        <ScrollView style={{ maxHeight: 200 }}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} onPress={onEventPress} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
