import { FILE_TYPES } from '../constants/fileTypes';

export const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.slice(lastDotIndex).toLowerCase() : '';
};

export const getFileType = (filename: string): keyof typeof FILE_TYPES | 'unknown' => {
  const extension = getFileExtension(filename);
  
  for (const [type, extensions] of Object.entries(FILE_TYPES)) {
    if (extensions.includes(extension)) {
      return type as keyof typeof FILE_TYPES;
    }
  }
  
  return 'unknown';
};