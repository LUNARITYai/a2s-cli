# A2S - CLI (Audio to Subtitles - Command Line Interface)

A command-line tool that transcribes audio files using OpenAI's Whisper model to generate subtitles in SRT format.

## ⚡ Installation

### Option 1: NPM Installation (Recommended for Users)

```bash
npm install -g @lunarity/a2s-cli
```

After installation, you can use the CLI globally with the `a2s` command:

```bash
a2s --help
```

### 🔑 Environment Setup

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

## 🚀 Usage

### Available Commands

```bash
# 🎵 Transcribe audio files (with default options)
a2s transcribe

# ✨ Rename audio files to remove spaces and special characters
a2s rename

# 🗑️ Clean audio and transcripts directories
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

## ✨ Features

- Default output format for transcriptions is SRT (SubRip Subtitle)
- Supports M4A, MP3, MP4, MPEG, MPGA, WAV, and WEBM audio files
- Batch process multiple audio files
- Customizable input and output directories
- Support for multiple languages
- Progress tracking and detailed logging
- Summary report after completion

## 📁 Directory Structure

```
.
├── audio/          # Default input directory for audio files
└── transcripts/    # Default output directory for transcriptions
```

## ⚠️ Error Handling

- Detailed error messages for failed transcriptions
- Summary report shows successful and failed transcriptions
- Failed transcriptions don't stop the batch process

## 🌟 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT
