import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CalendarEvent, EventColor } from '@/types/event';

const COLORS: { value: EventColor; label: string; bg: string; selected: string }[] = [
  { value: 'blue', label: 'Bleu', bg: 'bg-blue-400', selected: 'border-blue-700' },
  { value: 'green', label: 'Vert', bg: 'bg-green-400', selected: 'border-green-700' },
  { value: 'orange', label: 'Orange', bg: 'bg-orange-400', selected: 'border-orange-700' },
  { value: 'purple', label: 'Violet', bg: 'bg-purple-400', selected: 'border-purple-700' },
  { value: 'gray', label: 'Gris', bg: 'bg-gray-400', selected: 'border-gray-700' },
];

type EventModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: () => void;
  initialData?: CalendarEvent | null;
  defaultDate?: string;
};

export default function EventModal({
  visible,
  onClose,
  onSave,
  onDelete,
  initialData,
  defaultDate = '',
}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState<EventColor>('blue');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isEditing = !!initialData;

  useEffect(() => {
    if (visible) {
      setTitle(initialData?.title || '');
      setDate(initialData?.date || defaultDate);
      setTime(initialData?.time || '');
      setDescription(initialData?.description || '');
      setColor(initialData?.color || 'blue');
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
  }, [visible, initialData, defaultDate]);

  const parseDateValue = (): Date => {
    if (date) {
      const [y, m, d] = date.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date();
  };

  const parseTimeValue = (): Date => {
    const d = new Date();
    if (time) {
      const [h, m] = time.split(':').map(Number);
      d.setHours(h, m, 0, 0);
    }
    return d;
  };

  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
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
    return `${d} ${months[m - 1]} ${y}`;
  };

  const onDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (selectedDate) {
      const y = selectedDate.getFullYear();
      const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const d = String(selectedDate.getDate()).padStart(2, '0');
      setDate(`${y}-${m}-${d}`);
    }
  };

  const onTimeChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowTimePicker(false);
    if (selectedDate) {
      const h = String(selectedDate.getHours()).padStart(2, '0');
      const m = String(selectedDate.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Le titre est obligatoire');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Erreur', 'La date est obligatoire');
      return;
    }
    onSave({ title: title.trim(), date, time, description: description.trim(), color });
  };

  const handleDelete = () => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cet événement ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: onDelete },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="max-h-[85%] rounded-t-3xl bg-white p-5">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-gray-900">
              {isEditing ? 'Modifier' : 'Nouvel événement'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-lg text-gray-500">Annuler</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Title */}
            <View className="mb-4">
              <Text className="mb-1 text-sm font-semibold text-gray-700">Titre *</Text>
              <TextInput
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-base"
                placeholder="Titre de l'événement"
                placeholderTextColor="#9E9E9E"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Date */}
            <View className="mb-4">
              <Text className="mb-1 text-sm font-semibold text-gray-700">Date *</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(!showDatePicker)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3">
                <Text className={`text-base ${date ? 'text-gray-900' : 'text-gray-400'}`}>
                  {date ? formatDateDisplay(date) : 'Choisir une date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <View className="mt-2 overflow-hidden rounded-lg bg-gray-50">
                  <DateTimePicker
                    value={parseDateValue()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={onDateChange}
                    locale="fr-FR"
                  />
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      className="items-center border-t border-gray-200 py-2">
                      <Text className="text-base font-semibold text-accent">Valider</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            {/* Time */}
            <View className="mb-4">
              <Text className="mb-1 text-sm font-semibold text-gray-700">Heure</Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(!showTimePicker)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3">
                <Text className={`text-base ${time ? 'text-gray-900' : 'text-gray-400'}`}>
                  {time || 'Choisir une heure'}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <View className="mt-2 overflow-hidden rounded-lg bg-gray-50">
                  <DateTimePicker
                    value={parseTimeValue()}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onTimeChange}
                    locale="fr-FR"
                    minuteInterval={5}
                  />
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      onPress={() => setShowTimePicker(false)}
                      className="items-center border-t border-gray-200 py-2">
                      <Text className="text-base font-semibold text-accent">Valider</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            {/* Description */}
            <View className="mb-4">
              <Text className="mb-1 text-sm font-semibold text-gray-700">Description</Text>
              <TextInput
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-base"
                placeholder="Description de l'événement"
                placeholderTextColor="#9E9E9E"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                style={{ minHeight: 80, textAlignVertical: 'top' }}
              />
            </View>

            {/* Color */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-semibold text-gray-700">Couleur</Text>
              <View className="flex-row gap-3">
                {COLORS.map((c) => (
                  <TouchableOpacity
                    key={c.value}
                    onPress={() => setColor(c.value)}
                    className={`h-10 w-10 items-center justify-center rounded-full ${c.bg} ${
                      color === c.value ? `border-4 ${c.selected}` : 'border-2 border-transparent'
                    }`}
                  />
                ))}
              </View>
            </View>

            {/* Actions */}
            <View className="mt-2 gap-3">
              <TouchableOpacity
                onPress={handleSave}
                className="items-center rounded-xl bg-accent py-4">
                <Text className="text-base font-bold text-white">
                  {isEditing ? 'Enregistrer' : 'Ajouter'}
                </Text>
              </TouchableOpacity>

              {isEditing && onDelete && (
                <TouchableOpacity
                  onPress={handleDelete}
                  className="items-center rounded-xl bg-red-50 py-4">
                  <Text className="text-base font-bold text-red-600">Supprimer</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
