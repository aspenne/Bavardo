import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login with:', email, password);
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
              <Text className="mb-sm text-4xl font-bold text-primary">Bavardo</Text>
              <Text className="text-base text-gray-600">Welcome back!</Text>
            </View>

            {/* Login Form */}
            <View className="gap-md">
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
                  placeholder="Enter your password"
                  placeholderTextColor="#9E9E9E"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </View>

              {/* Forgot Password */}
              <TouchableOpacity>
                <Text className="text-right text-sm text-secondary">Forgot password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                title="Login"
                variant="primary"
                size="lg"
                onPress={handleLogin}
                className="mt-md"
              />

              {/* Divider */}
              <View className="my-lg flex-row items-center">
                <View className="h-[1px] flex-1 bg-gray-300" />
                <Text className="mx-md text-gray-500">or</Text>
                <View className="h-[1px] flex-1 bg-gray-300" />
              </View>

              {/* Sign Up Link */}
              <View className="flex-row justify-center">
                <Text className="text-gray-600">Don&apos;t have an account? </Text>
                <Link href="/signup" asChild>
                  <TouchableOpacity>
                    <Text className="font-semibold text-accent">Sign up</Text>
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
