const LANGUAGES = {
  ENGLISH: "en",
  ARABIC: "ar",
} as const;

export const LOCALES = [LANGUAGES.ENGLISH, LANGUAGES.ARABIC] as const;

export const DEFAULT_LOCALE = LANGUAGES.ENGLISH;

export type Locale = (typeof LOCALES)[number];
