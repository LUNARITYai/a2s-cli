import path from "path";

export const DIRECTORIES = {
  audio: path.join(process.cwd(), "audio"),
  transcripts: path.join(process.cwd(), "transcripts"),
} as const;

export const SUPPORTED_AUDIO_FORMATS = [
  ".m4a",
  ".mp3",
  ".mp4",
  ".mpeg",
  ".mpga",
  ".wav",
  ".webm",
] as const;

export const OPENAI_CONFIG = {
  defaultModel: "whisper-1",
  defaultLanguage: "en",
  maxFileSizeMB: 25,
} as const;

export const SUPPORTED_LANGUAGES = [
  "af", // Afrikaans
  "ar", // Arabic
  "hy", // Armenian
  "az", // Azerbaijani
  "be", // Belarusian
  "bs", // Bosnian
  "bg", // Bulgarian
  "ca", // Catalan
  "zh", // Chinese
  "hr", // Croatian
  "cs", // Czech
  "da", // Danish
  "nl", // Dutch
  "en", // English
  "et", // Estonian
  "fi", // Finnish
  "fr", // French
  "gl", // Galician
  "de", // German
  "el", // Greek
  "he", // Hebrew
  "hi", // Hindi
  "hu", // Hungarian
  "is", // Icelandic
  "id", // Indonesian
  "it", // Italian
  "ja", // Japanese
  "kn", // Kannada
  "kk", // Kazakh
  "ko", // Korean
  "lv", // Latvian
  "lt", // Lithuanian
  "mk", // Macedonian
  "ms", // Malay
  "mr", // Marathi
  "mi", // Maori
  "ne", // Nepali
  "nb", // Norwegian Bokmål
  "fa", // Persian
  "pl", // Polish
  "pt", // Portuguese
  "ro", // Romanian
  "ru", // Russian
  "sr", // Serbian
  "sk", // Slovak
  "sl", // Slovenian
  "es", // Spanish
  "sw", // Swahili
  "sv", // Swedish
  "tl", // Tagalog
  "ta", // Tamil
  "th", // Thai
  "tr", // Turkish
  "uk", // Ukrainian
  "ur", // Urdu
  "vi", // Vietnamese
  "cy", // Welsh
] as const;

export type DirectoryKey = keyof typeof DIRECTORIES;
export type SupportedAudioFormat = typeof SUPPORTED_AUDIO_FORMATS[number];
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];
