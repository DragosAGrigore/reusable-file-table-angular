export type FileStatus = "available" | "scheduled" | "unavailable";

export type FileStatusDisplay = {
  [key in FileStatus]: string;
}

export const statusDisplayMap: FileStatusDisplay = {
  "available": "Available",
  "scheduled": "Scheduled",
  "unavailable": "Unavailable"
}

export type FileStatusIcon = "available" | "unavailable";

export type FileStatusIconColor = {
  [key in FileStatusIcon]: string;
}

export const fileStatusIconMap: FileStatusIconColor = {
  "available": "lime",
  "unavailable": "red"
}
