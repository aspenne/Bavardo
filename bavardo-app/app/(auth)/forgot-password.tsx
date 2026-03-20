import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { requestPasswordReset } from '@/services/auth';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError('Veuillez entrer votre adresse email.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await requestPasswordReset(email.trim());
      if (result.success) {
        router.push({ pathname: '/verify-code', params: { email: email.trim() } });
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background p-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <Container>
          <View className="flex-1 justify-center">
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-0 top-0 flex-row items-center p-md">
              <Ionicons name="arrow-back" size={24} color="#003E3A" />
              <Text className="ml-xs text-base font-semibold text-primary">Retour</Text>
            </TouchableOpacity>

            {/* Logo */}
            <View className="mb-2xl items-center">
              <View className="mb-md h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Text className="text-5xl">🐢</Text>
              </View>
              <Text className="mb-sm text-4xl font-bold text-primary">Bavardo</Text>
            </View>

            {/* Title & Description */}
            <View className="mb-xl items-center">
              <Text className="mb-sm text-2xl font-bold text-primary">Mot de passe oublié</Text>
              <Text className="text-center text-base leading-6 text-secondary">
                Entrez votre adresse email et nous vous enverrons un code de vérification.
              </Text>
            </View>

            {/* Form */}
            <View className="gap-md">
              {/* Email Input */}
              <View>
                <Text className="mb-sm text-sm font-semibold text-gray-700">Email</Text>
                <TextInput
                  className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                  placeholder="Entrez votre email"
                  placeholderTextColor="#9E9E9E"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!loading}
                />
              </View>

              {/* Error Message */}
              {error ? (
                <View className="flex-row items-center gap-xs">
                  <Ionicons name="alert-circle" size={18} color="#F44336" />
                  <Text className="text-sm text-error">{error}</Text>
                </View>
              ) : null}

              {/* Send Button */}
              {loading ? (
                <View className="mt-md items-center justify-center rounded-lg bg-primary py-lg">
                  <ActivityIndicator color="white" />
                </View>
              ) : (
                <Button
                  title="Envoyer le code"
                  variant="primary"
                  size="lg"
                  onPress={handleSendCode}
                  className="mt-md"
                />
              )}

              {/* Back to Login Link */}
              <TouchableOpacity onPress={() => router.replace('/login')} className="mt-lg">
                <Text className="text-center text-base text-secondary">
                  Retour à la <Text className="font-semibold text-accent">connexion</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </View>
  );
}
