# Contributing to A2S-CLI

Thank you for your interest in contributing to A2S-CLI!

## 💻 Development Setup

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

3. Set up your environment:
   - Copy `.env.example` to create `.env`
   - Add your OpenAI API key

### Development Commands

```bash
# Run in development mode
bun dev

# Build the project
bun run build

# Build before publishing
bun run prepublishOnly
```

## 📁 Project Structure

```
.
├── api/            # OpenAI API client configuration
├── audio/          # Default input directory for audio files
├── commands/       # CLI command implementations
├── transcripts/    # Default output directory for transcriptions
├── config.ts       # Configuration constants and types
├── index.ts        # Main CLI application entry point
├── utils.ts        # Utility functions
└── youtube.ts      # YouTube download functionality
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Submit a Pull Request

## Code Style

[TBD]

## Testing

[TBD]
