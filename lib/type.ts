export enum FlashcardType {
  Vocabulary = "vocabulary"
}

export enum LanguageCode {
  en = "en",
  fr = "fr",
  de = "de",
  it = "it",
  ja = "ja"
}
export enum LocaleCode {
  en_US = "en_US",
  fr_FR = "fr_FR",
  fr_CA = "fr_CA",
  de_DE = "de_DE",
  it_IT = "it_IT",
  ja_JP = "ja_JP"
}

export type Flashcard = {
  id: string;
  type: FlashcardType;
  created_at: string;
  level: number;
  next_available_at?: string | null;
  flashcard_text: string;
  hint?: string | null;
  answer_infos?: string | null;
  source_language: LanguageCode;
  dest_language: LanguageCode;
  user_id: string;
};

export type FlashcardAnswer = {
  id: string;
  flashcard_id: string;
  answer: string;
  last_used_at: string | null;
};

export type Profiles = {
  id: string;
  updated_at: string;
  username: string | null;
  avatar_url: string | null;
  fcm_token: string | null;
  learning_locales: LanguageCode[];
};
