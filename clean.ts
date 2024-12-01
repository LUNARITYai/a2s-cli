import chalk from "chalk";

import { DIRECTORIES } from "@/config";
import { cleanDirectory } from "@/utils";

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
