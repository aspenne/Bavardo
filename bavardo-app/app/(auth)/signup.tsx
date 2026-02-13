import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigator = useRouter();

  const handleSignUp = () => {
    // TODO: Implement signup logic
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Sign up with:', name, email, password);
    navigator.push('/home');
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
                <Text className="mb-sm text-4xl font-bold text-primary">Bavardo</Text>
                <Text className="text-base text-gray-600">Create your account</Text>
              </View>

              {/* Sign Up Form */}
              <View className="gap-md">
                {/* Name Input */}
                <View>
                  <Text className="mb-sm text-sm font-semibold text-gray-700">Full Name</Text>
                  <TextInput
                    className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                    placeholder="Enter your full name"
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
                    placeholder="Enter your email"
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
                  <Text className="mb-sm text-sm font-semibold text-gray-700">Password</Text>
                  <TextInput
                    className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                    placeholder="Create a password"
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
                    Confirm Password
                  </Text>
                  <TextInput
                    className="rounded-md border border-gray-300 bg-white px-md py-md text-base"
                    placeholder="Confirm your password"
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
                    By signing up, you agree to our{' '}
                    <Text className="font-semibold text-secondary">Terms of Service</Text> and{' '}
                    <Text className="font-semibold text-secondary">Privacy Policy</Text>
                  </Text>
                </View>

                {/* Sign Up Button */}
                <Button
                  title="Sign Up"
                  variant="primary"
                  size="lg"
                  onPress={handleSignUp}
                  className="mt-md"
                />

                {/* Divider */}
                <View className="my-lg flex-row items-center">
                  <View className="h-[1px] flex-1 bg-gray-300" />
                  <Text className="mx-md text-gray-500">or</Text>
                  <View className="h-[1px] flex-1 bg-gray-300" />
                </View>

                {/* Login Link */}
                <View className="mb-xl flex-row justify-center">
                  <Text className="text-gray-600">Already have an account? </Text>
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Text className="font-semibold text-accent">Login</Text>
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
