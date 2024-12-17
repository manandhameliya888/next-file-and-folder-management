import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, File } from 'lucide-react';
import { FolderItemProps } from '../types/folder';
import { FileIcon } from './FileIcon';
import { FolderIcon } from './FolderIcon';

export const FolderItem: React.FC<FolderItemProps> = ({
  name,
  isFile,
  content,
  level,
  onDelete,
  onRename,
  onAddItem,
  path,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [showActions, setShowActions] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onRename(path, newName.trim());
      setIsEditing(false);
    }
  };

  const handleAddItem = (isFolder: boolean) => {
    onAddItem(path, isFolder);
  };

  return (
    <div className="select-none">
      <div
        className="flex items-center py-1 px-2 hover:bg-gray-100 rounded group"
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-center flex-1">
          {!isFile && (
            <button
              onClick={handleToggle}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          {isFile ? (
            <FileIcon filename={name} className="w-4 h-4 mr-2" />
          ) : (
            <FolderIcon isOpen={isOpen} className="w-4 h-4 mr-2" />
          )}
          
          {isEditing ? (
            <form onSubmit={handleRename} className="flex-1">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-2 py-1 border rounded"
                autoFocus
                onBlur={() => setIsEditing(false)}
              />
            </form>
          ) : (
            <span className="flex-1">{name}</span>
          )}
        </div>

        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isFile && (
              <>
                <button
                  onClick={() => handleAddItem(true)}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Add folder"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAddItem(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Add file"
                >
                  <File className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-gray-200 rounded"
              title="Rename"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(path)}
              className="p-1 hover:bg-gray-200 rounded text-red-500"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {!isFile && isOpen && (
        <div>
          {Array.isArray(content) &&
            content.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <FolderItem
                    key={`${path.join('/')}-${item}-${index}`}
                    name={item}
                    isFile={true}
                    content={[]}
                    level={level + 1}
                    onDelete={onDelete}
                    onRename={onRename}
                    onAddItem={onAddItem}
                    path={[...path, item]}
                  />
                );
              } else {
                const [folderName, folderContent] = Object.entries(item)[0];
                return (
                  <FolderItem
                    key={`${path.join('/')}-${folderName}-${index}`}
                    name={folderName}
                    isFile={false}
                    content={folderContent || []}
                    level={level + 1}
                    onDelete={onDelete}
                    onRename={onRename}
                    onAddItem={onAddItem}
                    path={[...path, folderName]}
                  />
                );
              }
            })}
        </div>
      )}
    </div>
  );
};