// Global in-memory OTP store (email -> { code, expiresAt })
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export function storeOtp(email: string, code: string) {
  const normalizedEmail = email.trim().toLowerCase();
  // 10 minutes expiry
  const expiresAt = Date.now() + 10 * 60 * 1000;
  otpStore.set(normalizedEmail, { code, expiresAt });
}

export function verifyOtp(email: string, enteredCode: string): { valid: boolean; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const record = otpStore.get(normalizedEmail);

  if (!record) {
    return { valid: false, error: "No verification code was sent to this email or it has expired." };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalizedEmail);
    return { valid: false, error: "Verification code has expired. Please request a new one." };
  }

  if (record.code !== enteredCode.trim()) {
    return { valid: false, error: "Incorrect verification code. Please check and try again." };
  }

  // Once verified, delete so it can't be re-used
  otpStore.delete(normalizedEmail);
  return { valid: true };
}
