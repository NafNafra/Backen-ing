import * as crypto from 'crypto';
import { payload } from '../types/auth';
import type { ConfigsService } from 'src/configs';

export function expirationDate(minutes = 5): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function generateOtpCode(): string {
  const code = crypto.randomInt(1000, 9999).toString();
  return code;
}

export function setOtpExpiryTime(): string {
  return new Date(Date.now() + 10 * 60 * 1000).toISOString();
}

