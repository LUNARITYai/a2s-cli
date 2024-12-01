#!/usr/bin/env node
import { Command } from "commander";
import { version } from "./package.json";

import { transcribe } from "./commands/transcribe";
import { rename } from "./commands/rename";
import { format } from "./commands/format";
import { clean } from "./commands/clean";
import { DIRECTORIES, OPENAI_CONFIG } from "@/config";

const program = new Command();

program
  .name("a2s")
  .description("CLI Tool for transcribing Audio to Subtitles")
  .version(version);

// Transcribe command
program
  .command("transcribe")
  .description("Transcribe audio files to subtitles")
  .option(
    "-l, --lang <language>",
    "language to transcribe to",
    OPENAI_CONFIG.defaultLanguage
  )
  .option("-i, --input-dir <directory>", "input directory", DIRECTORIES.audio)
  .option(
    "-o, --output-dir <directory>",
    "output directory",
    DIRECTORIES.transcripts
  )
  .action(transcribe);

// Rename audio files command
program.command("rename").description("Rename audio files").action(rename);

// Subtitle Format command
program.command("format").description("Format subtitle files").action(format);

// Clean command
program
  .command("clean")
  .description("Clean ./audio and ./transcripts directories")
  .action(clean);

program.parse();
