import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
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
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    try {
      await login(email, password);
      router.replace('/home');
    } catch {
      // L'erreur est déjà dans le store
    }
  };

  return (
    <View className="flex-1 bg-background p-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <Container>
          <View className="flex-1 justify-center">
            {/* Logo/Title */}
            <View className="mb-2xl items-center">
              <View className="mb-md h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Text className="text-5xl">🐢</Text>
              </View>
              <Text className="mb-sm text-4xl font-bold text-primary">Bavardo</Text>
              <Text className="text-base text-secondary">Bon retour !</Text>
            </View>

            {/* Login Form */}
            <View className="gap-md">
              {/* Email Input */}
              <View>
                <Text className="mb-sm text-sm font-semibold text-gray-700">Email</Text>
                <TextInput
                  className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                  placeholder="Entrez votre email"
                  placeholderTextColor="#9E9E9E"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              {/* Password Input */}
              <View>
                <Text className="mb-sm text-sm font-semibold text-gray-700">Mot de passe</Text>
                <TextInput
                  className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                  placeholder="Entrez votre mot de passe"
                  placeholderTextColor="#9E9E9E"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </View>

              {/* Forgot Password */}
              <Link href="/forgot-password" asChild>
                <TouchableOpacity>
                  <Text className="text-right text-sm font-semibold text-accent">
                    Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </Link>

              {/* Error Message */}
              {error && (
                <Text className="text-center text-sm text-red-500">{error}</Text>
              )}

              {/* Login Button */}
              <Button
                title={isLoading ? 'Connexion...' : 'Se connecter'}
                variant="primary"
                size="lg"
                onPress={handleLogin}
                disabled={isLoading}
                className="mt-md"
              />

              {/* Divider */}
              <View className="my-lg flex-row items-center">
                <View className="h-[1px] flex-1 bg-gray-300" />
                <Text className="mx-md text-gray-500">ou</Text>
                <View className="h-[1px] flex-1 bg-gray-300" />
              </View>

              {/* Sign Up Link */}
              <View className="flex-row justify-center">
                <Text className="text-gray-600">Pas encore de compte ? </Text>
                <Link href="/signup" asChild>
                  <TouchableOpacity>
                    <Text className="font-semibold text-accent">S&apos;inscrire</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </View>
  );
}
