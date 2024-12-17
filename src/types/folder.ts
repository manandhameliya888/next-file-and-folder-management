export type FileNode = string;

export interface FolderNode {
  [key: string]: (FileNode | FolderNode)[] | undefined;
}

export type TreeNode = FileNode | FolderNode;

export interface FolderItemProps {
  name: string;
  isFile: boolean;
  content: TreeNode[];
  level: number;
  onDelete: (path: string[]) => void;
  onRename: (oldPath: string[], newName: string) => void;
  onAddItem: (path: string[], isFolder: boolean) => void;
  path: string[];
}