import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigator = useRouter();
  const { register, isLoading, error } = useAuthStore();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (!name || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ') || '';
    try {
      await register(email, password, firstName, lastName);
      navigator.replace('/home');
    } catch {
      // L'erreur est dans le store
    }
  };

  return (
    <View className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Container>
            <View className="flex-1 justify-center py-xl">
              {/* Logo/Title */}
              <View className="mb-xl items-center">
                <View className="mb-md h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Text className="text-5xl">🐢</Text>
                </View>
                <Text className="mb-sm text-4xl font-bold text-primary">Bavardo</Text>
                <Text className="text-base text-secondary">Créez votre compte</Text>
              </View>

              {/* Sign Up Form */}
              <View className="gap-md">
                {/* Name Input */}
                <View>
                  <Text className="mb-sm text-sm font-semibold text-gray-700">Nom complet</Text>
                  <TextInput
                    className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                    placeholder="Entrez votre nom complet"
                    placeholderTextColor="#9E9E9E"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoComplete="name"
                  />
                </View>

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
                    placeholder="Créez un mot de passe"
                    placeholderTextColor="#9E9E9E"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password-new"
                  />
                </View>

                {/* Confirm Password Input */}
                <View>
                  <Text className="mb-sm text-sm font-semibold text-gray-700">
                    Confirmer le mot de passe
                  </Text>
                  <TextInput
                    className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                    placeholder="Confirmez votre mot de passe"
                    placeholderTextColor="#9E9E9E"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password-new"
                  />
                </View>

                {/* Terms and Conditions */}
                <View className="mt-sm flex-row items-start">
                  <Text className="flex-1 text-xs text-gray-600">
                    En vous inscrivant, vous acceptez nos{' '}
                    <Text className="font-semibold text-secondary">
                      Conditions d&apos;utilisation
                    </Text>{' '}
                    et notre{' '}
                    <Text className="font-semibold text-secondary">
                      Politique de confidentialité
                    </Text>
                  </Text>
                </View>

                {/* Error Message */}
                {error && (
                  <Text className="text-center text-sm text-red-500">{error}</Text>
                )}

                {/* Sign Up Button */}
                <Button
                  title={isLoading ? 'Inscription...' : "S'inscrire"}
                  variant="primary"
                  size="lg"
                  onPress={handleSignUp}
                  disabled={isLoading}
                  className="mt-md"
                />

                {/* Divider */}
                <View className="my-lg flex-row items-center">
                  <View className="h-[1px] flex-1 bg-gray-300" />
                  <Text className="mx-md text-gray-500">ou</Text>
                  <View className="h-[1px] flex-1 bg-gray-300" />
                </View>

                {/* Login Link */}
                <View className="mb-xl flex-row justify-center">
                  <Text className="text-gray-600">Déjà un compte ? </Text>
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Text className="font-semibold text-accent">Se connecter</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
