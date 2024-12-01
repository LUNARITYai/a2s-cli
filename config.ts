import path from "path";

export const DIRECTORIES = {
  audio: path.join(process.cwd(), "audio"),
  transcripts: path.join(process.cwd(), "transcripts"),
} as const;

export type DirectoryKey = keyof typeof DIRECTORIES;
