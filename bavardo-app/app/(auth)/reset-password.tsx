import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { resetPassword } from '@/services/auth';

export default function ResetPassword() {
  const router = useRouter();
  const { email, code } = useLocalSearchParams<{ email: string; code: string }>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!password || !confirm) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await resetPassword(email || '', code || '', password);
      Alert.alert(
        'Mot de passe réinitialisé',
        'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erreur lors de la réinitialisation.';
      setError(message);
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
            {/* Logo */}
            <View className="mb-2xl items-center">
              <View className="mb-md h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Text className="text-5xl">🐢</Text>
              </View>
              <Text className="mb-sm text-4xl font-bold text-primary">Bavardo</Text>
            </View>

            {/* Title */}
            <View className="mb-xl items-center">
              <Text className="mb-sm text-2xl font-bold text-primary">
                Nouveau mot de passe
              </Text>
              <Text className="text-center text-base leading-6 text-secondary">
                Choisissez un nouveau mot de passe pour{' '}
                <Text className="font-semibold text-primary">{email}</Text>
              </Text>
            </View>

            {/* Form */}
            <View className="gap-md">
              <View>
                <Text className="mb-sm text-sm font-semibold text-gray-700">
                  Nouveau mot de passe
                </Text>
                <View className="flex-row items-center rounded-md border border-gray-300 bg-white pr-md">
                  <TextInput
                    className="flex-1 px-md py-md text-base"
                    placeholder="Au moins 8 caractères"
                    placeholderTextColor="#9E9E9E"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                  />
                  <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text className="mb-sm text-sm font-semibold text-gray-700">
                  Confirmer le mot de passe
                </Text>
                <TextInput
                  className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                  placeholder="Retapez le mot de passe"
                  placeholderTextColor="#9E9E9E"
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                />
              </View>

              {error ? (
                <View className="flex-row items-center justify-center gap-xs">
                  <Ionicons name="alert-circle" size={18} color="#F44336" />
                  <Text className="text-sm text-error">{error}</Text>
                </View>
              ) : null}

              {loading ? (
                <View className="items-center justify-center rounded-lg bg-primary py-lg">
                  <ActivityIndicator color="white" />
                </View>
              ) : (
                <Button
                  title="Réinitialiser"
                  variant="primary"
                  size="lg"
                  onPress={handleSubmit}
                  className="mt-md"
                />
              )}

              <TouchableOpacity onPress={() => router.replace('/login')} className="mt-md">
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
