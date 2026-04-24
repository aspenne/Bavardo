import { api } from '@/services/api';

export async function requestPasswordReset(email: string): Promise<{ success: boolean }> {
  return api.postPublic<{ success: boolean }>('/api/auth/forgot-password/', { email });
}

export async function verifyResetCode(
  email: string,
  code: string,
): Promise<{ success: boolean }> {
  return api.postPublic<{ success: boolean }>('/api/auth/verify-code/', { email, code });
}

export async function resetPassword(
  email: string,
  code: string,
  password: string,
): Promise<{ success: boolean }> {
  return api.postPublic<{ success: boolean }>('/api/auth/reset-password/', {
    email,
    code,
    password,
  });
}
