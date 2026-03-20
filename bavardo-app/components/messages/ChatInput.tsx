import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

type ChatInputProps = {
  onSend: (text: string) => void;
  onMicPress?: () => void;
};

export function ChatInput({ onSend, onMicPress }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <View className="flex-row items-end border-t border-gray-200 bg-white px-md py-sm">
      {/* Mic Button */}
      {onMicPress && (
        <TouchableOpacity
          onPress={onMicPress}
          className="mb-xs mr-sm items-center justify-center rounded-full bg-gray-100 p-sm">
          <Ionicons name="mic-outline" size={24} color="#4A897A" />
        </TouchableOpacity>
      )}

      {/* Text Input */}
      <TextInput
        className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-lg py-sm text-base"
        placeholder="Écrivez un message..."
        placeholderTextColor="#9E9E9E"
        value={text}
        onChangeText={setText}
        multiline
        maxLength={1000}
        style={{ maxHeight: 100 }}
      />

      {/* Send Button */}
      <TouchableOpacity
        onPress={handleSend}
        disabled={!text.trim()}
        className={`mb-xs ml-sm items-center justify-center rounded-full p-sm ${
          text.trim() ? 'bg-primary' : 'bg-gray-200'
        }`}>
        <Ionicons name="send" size={22} color={text.trim() ? 'white' : '#9E9E9E'} />
      </TouchableOpacity>
    </View>
  );
}
