import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { requestPasswordReset, verifyResetCode } from '@/services/auth';

const CODE_LENGTH = 6;
const RESEND_DELAY = 60;

export default function VerifyCode() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleCodeChange = useCallback(
    (text: string, index: number) => {
      if (error) setError('');

      // Handle paste of full code
      if (text.length > 1) {
        const digits = text.replace(/\D/g, '').slice(0, CODE_LENGTH).split('');
        const newCode = [...code];
        digits.forEach((digit, i) => {
          if (index + i < CODE_LENGTH) {
            newCode[index + i] = digit;
          }
        });
        setCode(newCode);
        const nextIndex = Math.min(index + digits.length, CODE_LENGTH - 1);
        inputRefs.current[nextIndex]?.focus();
        return;
      }

      const digit = text.replace(/\D/g, '');
      const newCode = [...code];
      newCode[index] = digit;
      setCode(newCode);

      // Auto-focus next input
      if (digit && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [code, error]
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      // Go back on backspace when current input is empty
      if (key === 'Backspace' && !code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [code]
  );

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length < CODE_LENGTH) {
      setError('Veuillez entrer le code complet.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await verifyResetCode(email || '', fullCode);
      if (result.success) {
        router.replace({
          pathname: '/reset-password',
          params: { email: email || '', code: fullCode },
        });
      } else {
        setError('Code incorrect. Veuillez réessayer.');
      }
    } catch {
      setError('Impossible de vérifier le code. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      await requestPasswordReset(email || '');
      setResendTimer(RESEND_DELAY);
      setCode(Array(CODE_LENGTH).fill(''));
      setError('');
      inputRefs.current[0]?.focus();
    } catch {
      setError('Impossible de renvoyer le code.');
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

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
              <Text className="mb-sm text-2xl font-bold text-primary">Vérification</Text>
              <Text className="text-center text-base leading-6 text-secondary">
                Entrez le code à 6 chiffres envoyé à{' '}
                <Text className="font-semibold text-primary">{email}</Text>
              </Text>
            </View>

            {/* OTP Code Inputs */}
            <View className="mb-xl flex-row justify-center gap-sm">
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  className={`h-14 w-12 rounded-lg border-2 bg-white text-center text-2xl font-bold text-primary ${
                    digit ? 'border-primary' : error ? 'border-error' : 'border-gray-300'
                  }`}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={index === 0 ? CODE_LENGTH : 1}
                  editable={!loading}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Error Message */}
            {error ? (
              <View className="mb-md flex-row items-center justify-center gap-xs">
                <Ionicons name="alert-circle" size={18} color="#F44336" />
                <Text className="text-sm text-error">{error}</Text>
              </View>
            ) : null}

            {/* Verify Button */}
            {loading ? (
              <View className="items-center justify-center rounded-lg bg-primary py-lg">
                <ActivityIndicator color="white" />
              </View>
            ) : (
              <Button
                title="Vérifier"
                variant="primary"
                size="lg"
                onPress={handleVerify}
                disabled={!isCodeComplete}
              />
            )}

            {/* Resend Code */}
            <View className="mt-xl items-center">
              {resendTimer > 0 ? (
                <Text className="text-base text-gray-400">
                  Renvoyer le code dans {resendTimer}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend}>
                  <Text className="text-base font-semibold text-accent">Renvoyer le code</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Back to Login */}
            <TouchableOpacity onPress={() => router.replace('/login')} className="mt-lg">
              <Text className="text-center text-base text-secondary">
                Retour à la <Text className="font-semibold text-accent">connexion</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </View>
  );
}
