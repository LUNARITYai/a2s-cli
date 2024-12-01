import path from "path";

export const DIRECTORIES = {
  audio: path.join(process.cwd(), process.env.AUDIO_DIR || "audio"),
  transcripts: path.join(
    process.cwd(),
    process.env.TRANSCRIPT_DIR || "transcripts"
  ),
} as const;

export type DirectoryKey = keyof typeof DIRECTORIES;
