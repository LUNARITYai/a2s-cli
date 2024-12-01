import { DIRECTORIES } from "@/config";
import { renameFilesInDirectory } from "@/utils";

await renameFilesInDirectory(DIRECTORIES.audio);
