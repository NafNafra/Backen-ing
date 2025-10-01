import * as crypto from 'crypto';


export function expirationDate(minutes = 5): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function generate2FaCode(): string {
  const code = crypto.randomInt(1000, 9999).toString();
  return code;
}

export function set2FaExpiryTime(): string {
  return new Date(Date.now() + 10 * 60 * 1000).toISOString();
}
