import React from 'react';
import { Folder, FolderOpen } from 'lucide-react';

interface FolderIconProps {
  isOpen: boolean;
  className?: string;
}

export const FolderIcon: React.FC<FolderIconProps> = ({ isOpen, className = "w-4 h-4" }) => {
  return isOpen ? (
    <FolderOpen className={`${className} text-yellow-500`} />
  ) : (
    <Folder className={`${className} text-yellow-500`} />
  );
};