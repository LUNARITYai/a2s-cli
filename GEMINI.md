# @lunarity/a2s-cli

## Project Overview

**@lunarity/a2s-cli** is a command-line interface (CLI) tool designed to transcribe audio files into subtitles (SRT format) using OpenAI's Whisper model. It supports batch processing, multiple audio formats, and various languages.

**Key Technologies:**
*   **Runtime/Package Manager:** [Bun](https://bun.sh/)
*   **Language:** TypeScript
*   **CLI Framework:** [Commander.js](https://github.com/tj/commander.js)
*   **API Integration:** [OpenAI Node.js SDK](https://github.com/openai/openai-node)
*   **Styling:** [Chalk](https://github.com/chalk/chalk) for terminal output.

## Architecture & Directory Structure

*   `index.ts`: The entry point of the CLI application. Sets up commands and the program description.
*   `config.ts`: Central configuration file containing constants for supported formats, languages, directories, and OpenAI settings.
*   `commands/`: Contains the logic for each CLI command.
    *   `transcribe.ts`: Core logic for audio transcription.
    *   `rename.ts`: Utility to rename audio files (sanitizing names).
    *   `format.ts`: Utility to format subtitle files.
    *   `clean.ts`: Utility to clean up input/output directories.
*   `api/`: Contains API client initializations (e.g., `openai.ts`).
*   `utils.ts`: Helper functions for file system operations.
*   `audio/`: Default input directory for audio files to be processed.
*   `transcripts/`: Default output directory for generated subtitle files.

## Building and Running

This project uses **Bun** as its runtime and package manager.

### Prerequisites

*   [Bun](https://bun.sh/) installed.
*   OpenAI API Key (set as `OPENAI_API_KEY` environment variable).

### Installation

```bash
bun install
```

### Development

To run the CLI directly from source:

```bash
bun index.ts [command] [options]
```

Example:
```bash
bun index.ts transcribe --help
```

### Building

To build the project for production (outputs to `./dist`):

```bash
bun run build
```

This compiles `index.ts` to a standalone Node.js-compatible script in `dist/index.js`.

## Usage

### Environment Setup

Ensure you have your OpenAI API key set:

```bash
export OPENAI_API_KEY="sk-..."
# OR create a .env file
```

### Key Commands

*   `a2s transcribe`: Transcribe audio files.
    *   Options:
        *   `-l, --lang <language>`: Target language (default: "en").
        *   `-i, --input-dir <dir>`: Input directory.
        *   `-o, --output-dir <dir>`: Output directory.
*   `a2s rename`: Rename audio files in the input directory to be filesystem-safe.
*   `a2s clean`: Remove files from audio and transcripts directories.
*   `a2s format`: Format subtitle files (logic in `commands/format.ts`).

## Development Conventions

*   **Imports:** Uses path aliases (e.g., `@/config`) defined in `tsconfig.json`.
*   **Formatting/Linting:** Follows standard TypeScript conventions.
*   **Error Handling:** Commands implement try-catch blocks and use `chalk` to display user-friendly error messages.
*   **Async/Await:** Heavy use of async/await for file I/O and API calls.
