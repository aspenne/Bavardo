import { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

  const isEditing = !!initialData;

  useEffect(() => {
    if (visible) {
      setTitle(initialData?.title || '');
      setDate(initialData?.date || defaultDate);
      setTime(initialData?.time || '');
      setDescription(initialData?.description || '');
      setColor(initialData?.color || 'blue');
    }
  }, [visible, initialData, defaultDate]);

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
              <Text className="mb-1 text-sm font-semibold text-gray-700">Date * (AAAA-MM-JJ)</Text>
              <TextInput
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-base"
                placeholder="2026-02-15"
                placeholderTextColor="#9E9E9E"
                value={date}
                onChangeText={setDate}
              />
            </View>

            {/* Time */}
            <View className="mb-4">
              <Text className="mb-1 text-sm font-semibold text-gray-700">Heure (HH:mm)</Text>
              <TextInput
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-base"
                placeholder="14:30"
                placeholderTextColor="#9E9E9E"
                value={time}
                onChangeText={setTime}
              />
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
