#!/usr/bin/env node
import { Command } from "commander";
import { version } from "./package.json";

// Import your command handlers
// import { transcribe } from "./commands/transcribe";
import { rename } from "./commands/rename";
import { format } from "./commands/format";

const program = new Command();

program
  .name("a2s")
  .description("CLI tool for transcribing Audio to Subtitles")
  .version(version);

// Transcribe command (your existing main functionality)
// program
//   .command("transcribe")
//   .description("Transcribe audio files to subtitles")
//   .argument("<input>", "Input audio file path")
//   .option("-o, --output <path>", "Output file path")
//   .option("-f, --format <format>", "Output format (srt, vtt)", "srt")
//   .action(transcribe);

// Rename command
program.command("rename").description("Rename subtitle files").action(rename);

// Format command
program.command("format").description("Format subtitle files").action(format);

program.parse();
