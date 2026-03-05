import type { PasswordRules } from "@/lib/types";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL_DEFAULT = "!@#$%&*";

const DEFAULT_RULES: PasswordRules = {
  minLength: 12,
  maxLength: 16,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: false,
};

function getRandomChar(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset[index];
}

function shuffle(arr: string[]): string[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generatePassword(rules?: PasswordRules): string {
  const r = rules ?? DEFAULT_RULES;
  const length = r.minLength + Math.floor(Math.random() * (r.maxLength - r.minLength + 1));

  const required: string[] = [];
  let pool = "";

  if (r.requireUppercase) {
    required.push(getRandomChar(UPPERCASE));
    pool += UPPERCASE;
  }
  if (r.requireLowercase) {
    required.push(getRandomChar(LOWERCASE));
    pool += LOWERCASE;
  }
  if (r.requireNumbers) {
    required.push(getRandomChar(NUMBERS));
    pool += NUMBERS;
  }
  if (r.requireSpecial) {
    const specialChars = r.allowedSpecialChars ?? SPECIAL_DEFAULT;
    required.push(getRandomChar(specialChars));
    pool += specialChars;
  }

  // Default pool if nothing required
  if (pool === "") {
    pool = UPPERCASE + LOWERCASE + NUMBERS;
  }

  const remaining = length - required.length;
  const chars = [...required];
  for (let i = 0; i < remaining; i++) {
    chars.push(getRandomChar(pool));
  }

  return shuffle(chars).join("");
}
