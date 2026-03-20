/**
 * Auth service — stubs for password reset flow.
 * TODO: Replace with real API calls to your backend (Resend).
 *
 * Example backend endpoint:
 *   POST /api/auth/forgot-password { email }
 *   POST /api/auth/verify-code { email, code }
 */

const API_BASE_URL = ''; // TODO: Set your backend URL

/**
 * Request a password reset code to be sent via email.
 * Stub: simulates a 1.5s network delay and returns success.
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean }> {
  if (API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log(`[STUB] Password reset code sent to: ${email}`);
  return { success: true };
}

/**
 * Verify the 6-digit code entered by the user.
 * Stub: accepts any code and returns success after 1s.
 */
export async function verifyResetCode(email: string, code: string): Promise<{ success: boolean }> {
  if (API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    return response.json();
  }

  // Stub: simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`[STUB] Code "${code}" verified for: ${email}`);
  return { success: true };
}
