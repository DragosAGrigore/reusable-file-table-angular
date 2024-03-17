import { FileStatus } from "./file-status";

export interface FileInfo {
  name: string;
  device: string;
  path: string;
  status: FileStatus;
}
