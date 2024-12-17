import React from 'react';
import {
  FileImage,
  FileVideo,
  FileText,
  FileSpreadsheet,
  FileType2, // Changed from FilePresentation to FileType2
  FileArchive,
  Terminal,
  Database,
  FileCode,
  FileAudio,
  File
} from 'lucide-react';
import { getFileType } from '../utils/fileTypeUtils';

interface FileIconProps {
  filename: string;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ filename, className = "w-4 h-4" }) => {
  const type = getFileType(filename);
  const props = { className };

  switch (type) {
    case 'images':
      return <FileImage {...props} className={`${className} text-purple-500`} />;
    case 'videos':
      return <FileVideo {...props} className={`${className} text-pink-500`} />;
    case 'documents':
      return <FileText {...props} className={`${className} text-blue-500`} />;
    case 'spreadsheets':
      return <FileSpreadsheet {...props} className={`${className} text-green-500`} />;
    case 'presentations':
      return <FileType2 {...props} className={`${className} text-orange-500`} />; // Using FileType2 instead
    case 'compressed':
      return <FileArchive {...props} className={`${className} text-yellow-500`} />;
    case 'executables':
      return <Terminal {...props} className={`${className} text-red-500`} />;
    case 'database':
      return <Database {...props} className={`${className} text-indigo-500`} />;
    case 'code':
      return <FileCode {...props} className={`${className} text-cyan-500`} />;
    case 'audio':
      return <FileAudio {...props} className={`${className} text-teal-500`} />;
    default:
      return <File {...props} className={`${className} text-gray-500`} />;
  }
};