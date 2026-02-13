import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState('');

  useSpeechRecognitionEvent('start', () => setRecognizing(true));
  useSpeechRecognitionEvent('end', () => setRecognizing(false));
  useSpeechRecognitionEvent('result', (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent('error', (event) => {
    console.log('error code:', event.error, 'error message:', event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn('Permissions not granted', result);
      return;
    }
    ExpoSpeechRecognitionModule.start({
      lang: 'fr-FR',
      interimResults: true,
      continuous: false,
    });
  };

  const handleMicPress = () => {
    setIsListening(!isListening);
  };

  const speak = async () => {
    const thingToSay = transcript || 'Bonjour! Je suis votre assistant Bavardo.';
    const Voice = 'com.apple.ttsbundle.Thomas-compact';
    const options = {
      voice: Voice,
      pitch: 1.0,
      rate: 1.0,
    };
    Speech.speak(thingToSay, options);
  };

  return (
    <View className="flex-1 bg-background px-lg pb-md pt-xl">
      {/* Message Bubble */}
      <View className="mb-lg rounded-2xl rounded-tl-none bg-gray-300 p-lg shadow-md">
        <Text className="text-xl leading-7 text-primary">
          Appuyez sur le microphone{'\n'}pour me dire ce que vous souhaitez faire.
        </Text>
      </View>

      {/* Turtle Placeholder */}
      <View className="absolute bottom-[200px] left-0 h-48 w-48">
        <View className="h-full w-full items-center justify-center rounded-full bg-primary/10">
          <Text className="text-6xl">🐢</Text>
        </View>
        <TouchableOpacity
          className="mt-md cursor-pointer rounded-full bg-primary/20 p-md"
          onPress={speak}>
          <Text className="text-center text-white">🔊 Parler</Text>
        </TouchableOpacity>
      </View>

      {/* Microphone Button */}
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          onPress={handleMicPress}
          activeOpacity={0.8}
          className={`h-32 w-32 items-center justify-center rounded-full shadow-lg ${
            isListening ? 'bg-accent' : 'bg-primary'
          }`}>
          <Text className="text-5xl text-white">🎤</Text>
        </TouchableOpacity>
        {!recognizing ? (
          <TouchableOpacity
            onPress={handleStart}
            className={`h-32 w-32 items-center justify-center rounded-full bg-primary shadow-lg`}>
            <Text className="text-5xl text-white">🎤</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={ExpoSpeechRecognitionModule.stop}
            className={`h-32 w-32 items-center justify-center rounded-full bg-accent shadow-lg`}>
            <Text className="text-5xl text-white">🎤</Text>
          </TouchableOpacity>
        )}
        <ScrollView>
          <Text>{transcript}</Text>
        </ScrollView>
      </View>

      {/* Help Text */}
      <View className="mb-md items-center">
        <Text className="text-center text-base text-gray-600">
          Vous pouvez dire : &quot;Regarder mes messages&quot;, &quot;Me rappeler mes rdv&quot;...
        </Text>
      </View>
    </View>
  );
}
