import fs from "fs";
import path from "path";

import chalk from "chalk";

export const renameFilesInDirectory = async (
  directory: string,
  verbose: boolean = true
): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directory);

    const renamePromises = files.map(async (file) => {
      if (file === ".gitkeep") {
        return;
      }

      const filePath = path.join(directory, file);

      const stats = await fs.promises.stat(filePath);
      if (!stats.isFile()) {
        return;
      }

      const ext = path.extname(file);
      let baseName = path.basename(file, ext);
      baseName = baseName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

      const newFileName = `${baseName}${ext}`;
      const newFilePath = path.join(directory, newFileName);

      if (file !== newFileName) {
        await fs.promises.rename(filePath, newFilePath);
        if (verbose) {
          console.log(chalk.dim(`Renamed: ${file} → ${newFileName}`));
        }
      }
    });

    await Promise.all(renamePromises);
    if (verbose) {
      console.log(
        chalk.green.bold("✅ All files have been renamed successfully")
      );
    }
  } catch (error) {
    console.error(
      chalk.red.bold("❌ Error processing directory ") +
        chalk.red(directory) +
        "   " +
        chalk.red.dim(error)
    );
    throw error;
  }
};

export const getDirectoryFileNames = (
  dir: string,
  comparator?: (a: string, b: string) => number
): string[] | null => {
  try {
    const fileNames = fs.readdirSync(dir);
    const filteredFileNames = fileNames.filter(
      (fileName) => fileName !== ".gitkeep"
    );
    if (comparator) {
      filteredFileNames.sort(comparator);
    } else {
      filteredFileNames.sort();
    }
    return filteredFileNames;
  } catch (err) {
    console.error(
      chalk.red.bold("❌ Failed to read directory ") +
        chalk.red(dir) +
        "   " +
        chalk.red.dim(err)
    );
    return null;
  }
};

export const cleanDirectory = async (directory: string): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directory);
    const unlinkPromises = files
      .filter((file) => file !== ".gitkeep")
      .map((file) => fs.promises.unlink(path.join(directory, file)));

    await Promise.all(unlinkPromises);
    console.log(
      chalk.green.bold("✅ Cleaned directory: ") + chalk.green(directory)
    );
  } catch (error) {
    console.error(
      chalk.red.bold("❌ Error cleaning directory ") +
        chalk.red(directory) +
        "   " +
        chalk.red.dim(error)
    );
    throw error;
  }
};
