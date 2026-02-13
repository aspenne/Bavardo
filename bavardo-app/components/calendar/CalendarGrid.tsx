import { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import EventCard from '@/components/calendar/EventCard';
import { CalendarEvent } from '@/types/event';

const DAYS_OF_WEEK = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

type CalendarGridProps = {
  currentDate: Date;
  today: Date;
  events: CalendarEvent[];
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
  onEventPress: (event: CalendarEvent) => void;
};

function getMonthData(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const prevMonth = new Date(year, month, 0);
  const prevMonthDays = prevMonth.getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = startingDay - 1; i >= 0; i--) {
    currentWeek.push(-(prevMonthDays - i));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }

  let nextMonthDay = 1;
  while (currentWeek.length < 7) {
    currentWeek.push(100 + nextMonthDay);
    nextMonthDay++;
  }
  weeks.push(currentWeek);

  return weeks;
}

function formatDateKey(date: Date, day: number): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CalendarGrid({
  currentDate,
  today,
  events,
  selectedDay,
  onSelectDay,
  onEventPress,
}: CalendarGridProps) {
  const { height } = useWindowDimensions();

  const cellHeight = useMemo(() => {
    const reservedSpace = 260;
    const availableHeight = height - reservedSpace;
    const numberOfWeeks = 5;
    const minCellHeight = availableHeight / numberOfWeeks;
    return Math.max(minCellHeight, 100);
  }, [height]);

  const weeks = getMonthData(currentDate);

  // Build a map of day -> events for the current month
  const eventsByDay = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const monthStr = String(month).padStart(2, '0');

    for (const event of events) {
      if (event.date.startsWith(`${year}-${monthStr}-`)) {
        const day = parseInt(event.date.split('-')[2], 10);
        if (!map[day]) map[day] = [];
        map[day].push(event);
      }
    }
    // Sort each day's events by time
    for (const day in map) {
      map[day].sort((a, b) => a.time.localeCompare(b.time));
    }
    return map;
  }, [events, currentDate]);

  const isToday = (day: number) => {
    return (
      day > 0 &&
      day < 100 &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear() &&
      day === today.getDate()
    );
  };

  return (
    <View className="flex-1">
      {/* Days header */}
      <View className="flex-row border-b border-gray-200 bg-gray-50">
        {DAYS_OF_WEEK.map((day) => (
          <View key={day} className="flex-1 items-center py-sm">
            <Text className="text-xs font-medium text-gray-500">{day}</Text>
          </View>
        ))}
      </View>

      {/* Grid */}
      <ScrollView className="flex-1">
        {weeks.map((week, weekIndex) => (
          <View
            key={weekIndex}
            className="flex-row border-b border-gray-100"
            style={{ minHeight: cellHeight }}>
            {week.map((day, dayIndex) => {
              const isPrevMonth = day !== null && day < 0;
              const isNextMonth = day !== null && day > 100;
              const actualDay = isPrevMonth ? Math.abs(day!) : isNextMonth ? day! - 100 : day;
              const isCurrentDay = day !== null && isToday(day);
              const isSelected = day === selectedDay && !isPrevMonth && !isNextMonth;
              const dayEvents = day !== null && day > 0 && day < 100 ? eventsByDay[day] || [] : [];

              return (
                <TouchableOpacity
                  key={dayIndex}
                  onPress={() => {
                    if (day !== null && day > 0 && day < 100) {
                      onSelectDay(day);
                    }
                  }}
                  className={`flex-1 border-r border-gray-100 p-1 ${
                    isCurrentDay ? 'bg-blue-50' : ''
                  } ${isSelected ? 'bg-blue-100' : ''}`}>
                  <View className="mb-1 items-center">
                    <View
                      className={`h-7 w-7 items-center justify-center rounded-full ${
                        isCurrentDay ? 'bg-primary' : ''
                      }`}>
                      <Text
                        className={`text-sm font-medium ${
                          isCurrentDay
                            ? 'text-white'
                            : isPrevMonth || isNextMonth
                              ? 'text-gray-300'
                              : 'text-gray-700'
                        }`}>
                        {actualDay}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <EventCard key={event.id} event={event} onPress={onEventPress} compact />
                    ))}
                    {dayEvents.length > 3 && (
                      <Text className="text-center text-xs text-gray-500">
                        +{dayEvents.length - 3} de plus
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export { formatDateKey };
