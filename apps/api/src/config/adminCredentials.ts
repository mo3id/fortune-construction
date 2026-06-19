import crypto from 'crypto';

interface SeedAdminCredentials {
  username: string;
  password: string;
  generatedPassword: boolean;
}

const WEAK_PASSWORDS = new Set([
  'admin',
  'password',
  'password123',
  '123456',
  '12345678',
  'qwerty',
]);

export function getSeedAdminCredentials(context: string): SeedAdminCredentials {
  const isProduction = process.env.NODE_ENV === 'production';
  const username = process.env.ADMIN_USERNAME?.trim() || (isProduction ? '' : 'admin');
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!username) {
    throw new Error(`${context}: ADMIN_USERNAME is required in production.`);
  }

  if (configuredPassword) {
    const normalizedPassword = configuredPassword.toLowerCase();
    const normalizedUsername = username.toLowerCase();

    if (WEAK_PASSWORDS.has(normalizedPassword) || normalizedPassword.includes(normalizedUsername)) {
      throw new Error(`${context}: ADMIN_PASSWORD is too weak. Choose a unique strong password.`);
    }

    if (isProduction && configuredPassword.length < 12) {
      throw new Error(`${context}: ADMIN_PASSWORD must be at least 12 characters in production.`);
    }

    return { username, password: configuredPassword, generatedPassword: false };
  }

  if (isProduction) {
    throw new Error(`${context}: ADMIN_PASSWORD is required in production.`);
  }

  return {
    username,
    password: crypto.randomBytes(24).toString('base64url'),
    generatedPassword: true,
  };
}
