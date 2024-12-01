import { cleanDirectory } from "@/utils";
import { DIRECTORIES } from "@/config";
import chalk from "chalk";

async function main() {
  try {
    await Promise.all(
      Object.values(DIRECTORIES).map((dir) => cleanDirectory(dir))
    );
    console.log(chalk.green.bold("✅ All directories cleaned successfully"));
  } catch (error) {
    console.error(
      chalk.red.bold("❌ Failed to clean directories:"),
      chalk.red(error)
    );
    process.exit(1);
  }
}

main();
