import fs from "fs";
import path from "path";
import { getDirectoryFileNames } from "@/utils";
import { DIRECTORIES } from "@/config";

const fileNames = getDirectoryFileNames(DIRECTORIES.transcripts);

if (!fileNames) {
  throw new Error("No file names");
}

for (const fileName of fileNames) {
  const inputFile = path.join(DIRECTORIES.transcripts, fileName);
  const outputPrefix = "m_"; // Add your desired prefix here
  const outputFileName = path.basename(inputFile);
  const outputFile = path.join(outputPrefix + outputFileName);

  // Read the file content
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Add new lines after each '.' but remove ' ' and '\n' after each '.'
    const modifiedContent = data.replace(/\. /g, ".\n\n").replace(/\n /g, "\n");

    // Write the modified content to a new file with the specified prefix
    fs.writeFile(
      path.join(DIRECTORIES.transcripts, outputFile),
      modifiedContent,
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  });
}
