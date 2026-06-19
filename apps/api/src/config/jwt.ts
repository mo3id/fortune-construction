import crypto from 'crypto';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_ISSUER = 'fortune-construction-api';
const JWT_AUDIENCE = 'fortune-construction-dashboard';
const DEFAULT_EXPIRES_IN = '24h';
const EXPIRES_IN_PATTERN = /^\d+(?:ms|s|m|h|d|w|y)$/i;

let generatedDevelopmentSecret: string | undefined;

function isWeakSecret(secret: string): boolean {
  return secret.length < 32 || /secret|password|change[-_ ]?me|replace[-_ ]?me|example|your[-_]/i.test(secret);
}

function getSecret(): string {
  const configuredSecret = process.env.JWT_SECRET?.trim();
  const isProduction = process.env.NODE_ENV === 'production';

  if (configuredSecret) {
    if (isProduction && isWeakSecret(configuredSecret)) {
      throw new Error('JWT_SECRET must be a unique random value with at least 32 characters in production.');
    }
    return configuredSecret;
  }

  if (isProduction) {
    throw new Error('JWT_SECRET is required in production.');
  }

  if (!generatedDevelopmentSecret) {
    generatedDevelopmentSecret = crypto.randomBytes(48).toString('base64url');
    console.warn('JWT_SECRET is not configured; using an ephemeral secret for this local process.');
  }

  return generatedDevelopmentSecret;
}

function getExpiresIn(): SignOptions['expiresIn'] {
  const value = process.env.JWT_EXPIRES_IN?.trim() || DEFAULT_EXPIRES_IN;
  const match = value.match(EXPIRES_IN_PATTERN);
  if (!match || Number.parseInt(value, 10) <= 0) {
    throw new Error('JWT_EXPIRES_IN must use a duration such as 15m, 24h, or 7d.');
  }
  return value as SignOptions['expiresIn'];
}

export function validateJwtConfig(): void {
  getSecret();
  getExpiresIn();
}

export function createAuthToken(adminId: string): string {
  if (!adminId) throw new Error('Cannot create an auth token without an admin id.');

  return jwt.sign({ id: adminId }, getSecret(), {
    algorithm: 'HS256',
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: getExpiresIn(),
  });
}

export function verifyAuthToken(token: string): { id: string } {
  const decoded = jwt.verify(token, getSecret(), {
    algorithms: ['HS256'],
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
  }) as JwtPayload;

  if (typeof decoded.id !== 'string' || !decoded.id) {
    throw new Error('Token does not contain a valid admin id.');
  }

  return { id: decoded.id };
}
