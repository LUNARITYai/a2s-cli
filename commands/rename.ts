import { DIRECTORIES } from "@/config";
import { renameFilesInDirectory } from "@/utils";

export const rename = async () => {
  await renameFilesInDirectory(DIRECTORIES.audio);
};
