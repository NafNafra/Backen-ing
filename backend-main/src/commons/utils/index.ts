import * as crypto from 'crypto';

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

export function mentionNote(noteString: string) {
  const note = parseFloat(noteString);
  console.log(`Note convertie : ${note} ${noteString}`); // Pour le débogage

  if (isNaN(note)) {
    return "Erreur : L'entrée n'est pas un nombre valide.";
  }
  if (note < 0 || note > 20) {
    return "Note invalide (doit être entre 0 et 20)";
  }

  switch (true) {
    case note >= 17:
      return "Très bien";
    case note >= 15.75:
      return "Bien";
    case note >= 13:
      return "Assez bien";
    case note >= 12:
      return "Passable";
    default:
      return "Échec";
  }
}

