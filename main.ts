import fs from "fs";
import path from "path";

import { Command } from "commander";
import chalk from "chalk";

import {
  DIRECTORIES,
  SUPPORTED_AUDIO_FORMATS,
  SUPPORTED_LANGUAGES,
  OPENAI_CONFIG,
  SupportedAudioFormat,
} from "@/config";
import { openAIClient } from "@/api/openai";
import { getDirectoryFileNames, renameFilesInDirectory } from "@/utils";

type TranscriptionResult = {
  fileName: string;
  success: boolean;
  text?: string;
  error?: string;
};

function setupCLI() {
  const program = new Command();
  program
    .name("transcribe")
    .description("Audio transcription tool")
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
    .parse();

  return program.opts();
}

function validateAudioFile(
  filePath: string
): { isValid: boolean; error?: string } {
  const extension = path.extname(filePath).toLowerCase();
  const fileSizeInMB = fs.statSync(filePath).size / (1024 * 1024);

  if (!SUPPORTED_AUDIO_FORMATS.includes(extension as any)) {
    return {
      isValid: false,
      error: `Unsupported file format. Supported formats: ${SUPPORTED_AUDIO_FORMATS.join(
        ", "
      )}`,
    };
  }

  if (fileSizeInMB > OPENAI_CONFIG.maxFileSizeMB) {
    return {
      isValid: false,
      error: `File size (${fileSizeInMB.toFixed(1)}MB) exceeds limit of ${
        OPENAI_CONFIG.maxFileSizeMB
      }MB`,
    };
  }

  return { isValid: true };
}

async function processAudioFile(
  fileName: string,
  options: { inputDir: string; outputDir: string; language: string },
  progress: string
): Promise<TranscriptionResult> {
  console.log(
    chalk.cyan(
      `${progress} ${chalk.cyan.bold("🔄 Processing:")} ${chalk.white(
        fileName
      )}`
    )
  );

  try {
    const filePath = path.resolve(`${options.inputDir}/${fileName}`);

    const validation = validateAudioFile(filePath);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const { text } = await openAIClient.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: OPENAI_CONFIG.defaultModel,
      language: options.language,
    });

    await Bun.write(`${options.outputDir}/${fileName.split(".")[0]}.txt`, text);
    console.log(
      chalk.green.bold("✅ Successfully transcribed: ") + chalk.green(fileName)
    );
    console.log(
      chalk.gray(`📝 Content preview: "${text.substring(0, 100)}..."`)
    );
    return { fileName, success: true, text };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      chalk.red.bold("❌ Error processing: ") + chalk.red(fileName),
      "   " + chalk.red.dim(errorMessage)
    );
    return { fileName, success: false, error: errorMessage };
  }
}

function printSummary(results: TranscriptionResult[], duration: number) {
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(chalk.dim("═".repeat(50)));
  console.log(chalk.bold("📊 Transcription Summary"));
  console.log(chalk.dim("─".repeat(20)));
  console.log(chalk.green.bold(`✅ Successful: ${chalk.white(successful)}`));
  console.log(chalk.red.bold(`❌ Failed: ${chalk.white(failed)}`));
  console.log(
    chalk.blue.bold(`⏱️ Duration: ${chalk.white(duration.toFixed(2))}s`)
  );
  console.log();
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      chalk.red.bold("❌ Configuration Error: ") +
        chalk.red("Please set the OPENAI_API_KEY environment variable")
    );
    process.exit(1);
  }

  console.log(chalk.blue.bold("🎙️ Starting audio transcription process..."));
  const startTime = Date.now();

  const options = setupCLI();

  // Create directories if they don't exist
  try {
    await fs.promises.mkdir(options.inputDir, { recursive: true });
    await fs.promises.mkdir(options.outputDir, { recursive: true });
  } catch (error) {
    console.error(chalk.red("Error creating directories:"), error);
    process.exit(1);
  }

  // Rename files
  await renameFilesInDirectory(options.inputDir);

  const audioFileNames = (
    getDirectoryFileNames(options.inputDir) ?? []
  ).filter((file) =>
    SUPPORTED_AUDIO_FORMATS.includes(
      path.extname(file).toLowerCase() as SupportedAudioFormat
    )
  );

  if (!audioFileNames?.length) {
    console.log(
      chalk.yellow("⚠️ No supported audio files found in input directory")
    );
    console.log(
      chalk.dim(`Supported formats: ${SUPPORTED_AUDIO_FORMATS.join(", ")}`)
    );
    return;
  }

  if (!SUPPORTED_LANGUAGES.includes(options.lang)) {
    console.log(
      chalk.red.bold("❌ Invalid language: ") + chalk.red(options.lang)
    );
    return;
  }

  console.log(chalk.cyan("📂 Found audio files:"));
  audioFileNames.forEach((file) => {
    console.log(chalk.dim(`   • ${file}`));
  });
  console.log(chalk.cyan(`🌐 Language: ${options.lang}`));

  const transcriptionPromises = audioFileNames.map((fileName, index) =>
    processAudioFile(
      fileName,
      {
        inputDir: options.inputDir,
        outputDir: options.outputDir,
        language: options.lang,
      },
      `[${index + 1}/${audioFileNames.length}]`
    )
  );

  const results = await Promise.all(transcriptionPromises);
  const duration = (Date.now() - startTime) / 1000;
  printSummary(results, duration);
}

main().catch((error) => {
  console.error(chalk.red("Fatal error:"), error);
  process.exit(1);
});
