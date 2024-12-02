# Contributing to A2S-CLI

Thank you for your interest in contributing to A2S-CLI!

## 👩‍💻 Development Setup

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

# Development commands
bun transcribe
bun rename
bun format
bun clean
bun youtube
```

## 📁 Project Structure

```
.
├── audio/          # Default input directory
├── transcripts/    # Default output directory
├── api/            # API related files
├── index.ts        # Main application file
└── utils.ts        # Utility functions
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Submit a Pull Request

## Code Style

[Add your code style guidelines here]

## Testing

[Add testing guidelines here]
