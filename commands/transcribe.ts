import fs from "fs";
import path from "path";

import chalk from "chalk";

import {
  SUPPORTED_AUDIO_FORMATS,
  SUPPORTED_LANGUAGES,
  OPENAI_CONFIG,
  SupportedAudioFormat,
  SupportedLanguage,
} from "@/config";
import { openAIClient } from "@/api/openai";
import { getDirectoryFileNames, renameFilesInDirectory } from "@/utils";

type TranscriptionResult = {
  fileName: string;
  success: boolean;
  text?: string;
  error?: string;
};

function validateAudioFile(filePath: string): {
  isValid: boolean;
  error?: string;
} {
  const extension = path.extname(filePath).toLowerCase();
  const fileSizeInMB = fs.statSync(filePath).size / (1024 * 1024);

  if (!SUPPORTED_AUDIO_FORMATS.includes(extension as SupportedAudioFormat)) {
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
      `🔄 ${progress} ${chalk.cyan.bold("Processing:")} ${chalk.white(
        fileName
      )}`
    )
  );

  const startTime = Date.now();
  try {
    const filePath = path.resolve(`${options.inputDir}/${fileName}`);

    const validation = validateAudioFile(filePath);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const transcription = await openAIClient.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: OPENAI_CONFIG.defaultModel,
      language: options.language,
      response_format: "srt",
    });

    await fs.promises.writeFile(
      `${options.outputDir}/${fileName.split(".")[0]}.srt`,
      transcription
    );

    const duration = (Date.now() - startTime) / 1000;
    console.log(
      chalk.green.bold("✅ Successfully transcribed: ") +
        chalk.green(fileName) +
        chalk.green.dim(` in ${duration.toFixed(2)}s`)
    );
    return { fileName, success: true, text: transcription };
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
  console.log(chalk.bold("📈 Transcription Summary"));
  console.log(chalk.dim("─".repeat(24)));
  console.log(chalk.green.bold(`✅ Successful: ${chalk.white(successful)}`));
  console.log(chalk.red.bold(`❌ Failed: ${chalk.white(failed)}`));
  console.log(
    chalk.blue.bold(`⏱️  Duration: ${chalk.white(duration.toFixed(2))}s`)
  );
  console.log();
}

export const transcribe = async (options: {
  inputDir: string;
  outputDir: string;
  lang: SupportedLanguage;
}) => {
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      chalk.red.bold("❌ Configuration Error: ") +
        chalk.red("Please set the OPENAI_API_KEY environment variable")
    );
    process.exit(1);
  }

  console.log(chalk.blue.bold("🚀 Starting audio transcription process..."));
  const startTime = Date.now();

  // Create directories if they don't exist
  try {
    await fs.promises.mkdir(options.inputDir, { recursive: true });
    await fs.promises.mkdir(options.outputDir, { recursive: true });
  } catch (error) {
    console.error(chalk.red("Error creating directories:"), error);
    process.exit(1);
  }

  // Rename files
  await renameFilesInDirectory(options.inputDir, false);

  const audioFileNames = (getDirectoryFileNames(options.inputDir) ?? []).filter(
    (file) =>
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

  console.log(
    chalk.cyan(
      `📂 Found (${audioFileNames.length}) audio files in ${options.inputDir}`
    )
  );
  console.log(chalk.cyan(`🌐 Language: ${options.lang.toUpperCase()}`));

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
};
