import { renameFilesInDirectory } from "./utils";
import { DIRECTORIES } from "@/config";

await renameFilesInDirectory(DIRECTORIES.audio);
