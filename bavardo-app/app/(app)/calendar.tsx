import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import CalendarGrid, { formatDateKey } from '@/components/calendar/CalendarGrid';
import DayEventsPanel from '@/components/calendar/DayEventsPanel';
import EventModal from '@/components/calendar/EventModal';
import { useEventStore } from '@/store/useEventStore';
import { CalendarEvent } from '@/types/event';

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export default function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const { events, addEvent, updateEvent, deleteEvent, getEventsForDate, fetchEvents } =
    useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const monthName = MONTHS[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const selectedDateKey = selectedDay ? formatDateKey(currentDate, selectedDay) : '';
  const selectedDayEvents = selectedDateKey ? getEventsForDate(selectedDateKey) : [];

  const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  const weekNumber = getWeekNumber(currentDate);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today.getDate());
  };

  const handleSelectDay = useCallback((day: number) => {
    setSelectedDay((prev) => (prev === day ? null : day));
  }, []);

  const handleEventPress = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setModalVisible(true);
  }, []);

  const handleAddPress = () => {
    setEditingEvent(null);
    setModalVisible(true);
  };

  const handleHeaderAddPress = () => {
    // If a day is selected, use it as default date; otherwise use today
    if (!selectedDay) {
      setSelectedDay(today.getDate());
    }
    setEditingEvent(null);
    setModalVisible(true);
  };

  const handleSave = (data: Omit<CalendarEvent, 'id'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data);
    }
    setModalVisible(false);
    setEditingEvent(null);
  };

  const handleDelete = () => {
    if (editingEvent) {
      deleteEvent(editingEvent.id);
      setModalVisible(false);
      setEditingEvent(null);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Calendar Header */}
      <View className="border-b border-gray-200 bg-white px-md pb-md pt-md">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-md items-center rounded-lg bg-primary px-sm py-xs">
              <Text className="text-xs font-medium text-white">
                {MONTHS[today.getMonth()].slice(0, 3).toUpperCase()}
              </Text>
              <Text className="text-xl font-bold text-white">{today.getDate()}</Text>
            </View>
            <View>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold text-gray-900">
                  {monthName} {year}
                </Text>
                <View className="ml-sm rounded bg-gray-100 px-sm py-xs">
                  <Text className="text-xs text-gray-600">Semaine {weekNumber}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-500">
                1 {monthName.slice(0, 3).toLowerCase()} {year} –{' '}
                {new Date(year, currentDate.getMonth() + 1, 0).getDate()}{' '}
                {monthName.slice(0, 3).toLowerCase()} {year}
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation */}
        <View className="mt-md flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={goToPrevMonth}
              className="mr-sm rounded-lg bg-gray-100 px-md py-sm">
              <Text className="text-lg text-gray-600">←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToNextMonth}
              className="mr-md rounded-lg bg-gray-100 px-md py-sm">
              <Text className="text-lg text-gray-600">→</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToToday} className="rounded-lg bg-gray-100 px-md py-sm">
              <Text className="font-medium text-gray-700">Aujourd&apos;hui</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleHeaderAddPress}
            className="flex-row items-center rounded-lg bg-accent px-md py-sm">
            <Text className="font-semibold text-white">+ Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar Grid */}
      <CalendarGrid
        currentDate={currentDate}
        today={today}
        events={events}
        selectedDay={selectedDay}
        onSelectDay={handleSelectDay}
        onEventPress={handleEventPress}
      />

      {/* Day Events Panel */}
      {selectedDay !== null && (
        <DayEventsPanel
          date={selectedDateKey}
          events={selectedDayEvents}
          onEventPress={handleEventPress}
          onAddPress={handleAddPress}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {/* Event Modal */}
      <EventModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingEvent(null);
        }}
        onSave={handleSave}
        onDelete={editingEvent ? handleDelete : undefined}
        initialData={editingEvent}
        defaultDate={selectedDateKey}
      />
    </View>
  );
}
