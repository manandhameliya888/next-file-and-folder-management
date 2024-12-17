export const FILE_TYPES = {
  images: [
    ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp", ".ico",
    ".svg", ".ai", ".eps", ".pdf", ".raw", ".cr2", ".nef", ".arw", ".dng", ".orf", ".rw2"
  ],
  videos: [
    ".mp4", ".mov", ".wmv", ".avi", ".mkv", ".flv", ".webm",
    ".m4v", ".3gp", ".mts", ".m2ts", ".vob", ".ogv", ".hevc"
  ],
  documents: [
    ".txt", ".doc", ".docx", ".odt", ".rtf", ".pdf"
  ],
  spreadsheets: [
    ".xls", ".xlsx", ".csv", ".ods"
  ],
  presentations: [
    ".ppt", ".pptx", ".odp"
  ],
  compressed: [
    ".zip", ".rar", ".7z", ".tar", ".gz", ".tgz"
  ],
  executables: [
    ".exe", ".bat", ".sh", ".apk", ".jar", ".dmg"
  ],
  database: [
    ".sql", ".db", ".sqlite", ".accdb"
  ],
  code: [
    ".html", ".css", ".js", ".py", ".java", ".c", ".cpp", ".ts", ".tsx", ".jsx"
  ],
  audio: [
    ".mp3", ".wav", ".aac", ".flac", ".ogg"
  ]
} as const;