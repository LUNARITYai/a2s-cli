# A2S - CLI (Audio to Subtitles - Command Line Interface)

A command-line tool that transcribes audio files using OpenAI's Whisper model.

## Installation

### Option 1: NPM Installation (Recommended for Users)

```bash
npm install -g @lunarity/a2s-cli
```

After installation, you can use the CLI globally with the `a2s` command:

```bash
a2s --help
```

### Environment Setup

#### Obtain OpenAI API Key

You can get your OpenAI API key from: https://platform.openai.com/api-keys

#### Option 1: Export Command

You can set the API key directly in your terminal:

```bash
export OPENAI_API_KEY=your-api-key-here
```

#### Option 2: Environment File

1. Create a `.env` file in your working directory
2. Add your OpenAI API key:

```
OPENAI_API_KEY=your-api-key-here
```

## Usage

### Available Commands

```bash
# Transcribe audio files (with default options)
a2s transcribe

# Rename audio files to remove spaces and special characters
a2s rename

# Format existing transcript files
a2s format

# Clean audio and transcripts directories
a2s clean
```

### Command Options

- `-l, --lang <language>` - Specify the language to transcribe to (default: "en")
- `-i, --input-dir <directory>` - Set input directory (default: "./audio")
- `-o, --output-dir <directory>` - Set output directory (default: "./transcripts")

Example with options:

```bash
a2s transcribe --lang pl --input-dir ./my-audio --output-dir ./my-transcripts
```

## Features

- Batch process multiple audio files
- Support for multiple languages
- Customizable input and output directories
- Progress tracking and detailed logging
- Summary report after completion
- Supports MP3 and WAV audio files
- Optimized for Polish language transcription
- Automatically formats output with proper sentence breaks

## Directory Structure

```
.
├── audio/          # Default input directory for audio files
└── transcripts/    # Default output directory for transcriptions
```

## Error Handling

- Detailed error messages for failed transcriptions
- Summary report shows successful and failed transcriptions
- Failed transcriptions don't stop the batch process

---

## Development Guide

### Prerequisites

- [Bun](https://bun.sh/) runtime
- OpenAI API key

### Local Setup

1. Clone the repository:

```bash
git clone https://github.com/LUNARITYai/a2s-cli.git
```

2. Install dependencies:

```bash
bun install
```

3. Set up your OpenAI API key:
   - Copy `.env.example` to create a new `.env` file
   - Add your OpenAI API key

### Development Commands

```bash
# Run in development mode
bun dev

# Build the project
bun run build

# Run specific commands during development
bun transcribe
bun rename
bun format
bun clean
bun youtube
```

### Project Structure

```
.
├── audio/          # Default input directory
├── transcripts/    # Default output directory
├── api/            # API related files
├── index.ts        # Main application file
└── utils.ts        # Utility functions
```

## Contributing

Feel free to submit issues and pull requests.

## License

MIT
