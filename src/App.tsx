import { useState } from 'react';
import { FolderItem } from './components/FolderItem';
import { TreeNode } from './types/folder';
import { Folder, Plus } from 'lucide-react';

const initialData: TreeNode[] = [
  {
    Documents: [
      "Document1.jpg",
      "Document2.jpg",
      "Document3.jpg"
    ]
  },
  {
    Desktop: [
      "Screenshot1.jpg",
      "videopal.mp4"
    ]
  },
  {
    Downloads: [
      {
        Drivers: [
          "Printerdriver.dmg",
          "cameradriver.dmg"
        ]
      }
    ]
  },
  {
    Applications: [
      "Webstorm.dmg",
      "Pycharm.dmg",
      "FileZila.dmg",
      "Mattermost.dmg"
    ]
  },
  "chromedriver.dmg"
];

function App() {
  const [data, setData] = useState<TreeNode[]>(initialData);

  const handleDelete = (path: string[]) => {
    setData(prevData => {
      const newData = [...prevData];
      let current: any = newData;
      
      for (let i = 0; i < path.length - 1; i++) {
        const segment = path[i];
        if (!Array.isArray(current)) return prevData;
        const found = current.find((item: any) => 
          typeof item === 'object' && Object.keys(item)[0] === segment
        );
        if (!found) return prevData;
        current = found[segment];
      }

      if (Array.isArray(current)) {
        const index = current.findIndex((item: any) => 
          typeof item === 'string' 
            ? item === path[path.length - 1]
            : Object.keys(item)[0] === path[path.length - 1]
        );
        if (index !== -1) {
          current.splice(index, 1);
        }
      }

      return newData;
    });
  };

  const handleRename = (path: string[], newName: string) => {
    setData(prevData => {
      const newData = [...prevData];
      let current: any = newData;
      
      // Handle root level items
      if (path.length === 1) {
        const index = newData.findIndex((item: any) => 
          typeof item === 'string' 
            ? item === path[0]
            : Object.keys(item)[0] === path[0]
        );
        if (index !== -1) {
          if (typeof newData[index] === 'string') {
            newData[index] = newName;
          } else {
            const content = newData[index][path[0]];
            newData[index] = { [newName]: content };
          }
        }
        return newData;
      }

      // Handle nested items
      for (let i = 0; i < path.length - 1; i++) {
        const segment = path[i];
        if (!Array.isArray(current)) return prevData;
        const found = current.find((item: any) => 
          typeof item === 'object' && Object.keys(item)[0] === segment
        );
        if (!found) return prevData;
        current = found[segment];
      }

      if (Array.isArray(current)) {
        const index = current.findIndex((item: any) => 
          typeof item === 'string' 
            ? item === path[path.length - 1]
            : Object.keys(item)[0] === path[path.length - 1]
        );
        if (index !== -1) {
          if (typeof current[index] === 'string') {
            current[index] = newName;
          } else {
            const oldContent = current[index][path[path.length - 1]];
            current[index] = { [newName]: oldContent };
          }
        }
      }

      return newData;
    });
  };

  const handleAddItem = (path: string[], isFolder: boolean) => {
    setData(prevData => {
      const newData = [...prevData];
      let current: any = newData;
      
      // If path is empty, add to root
      if (path.length === 0) {
        const newName = isFolder 
          ? `New Folder ${newData.length}`
          : `new_file_${newData.length}.txt`;
        newData.push(isFolder ? { [newName]: [] } : newName);
        return newData;
      }

      // Otherwise, navigate to the target folder
      for (const segment of path) {
        const found = current.find((item: any) => 
          typeof item === 'object' && Object.keys(item)[0] === segment
        );
        if (!found) return prevData;
        current = found[segment];
      }

      if (Array.isArray(current)) {
        const newName = isFolder 
          ? `New Folder ${current.length}`
          : `new_file_${current.length}.txt`;
        current.push(isFolder ? { [newName]: [] } : newName);
      }

      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Folder className="w-6 h-6 text-yellow-500" />
              <h1 className="text-2xl font-bold">File Explorer</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAddItem([], true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Folder
              </button>
              <button
                onClick={() => handleAddItem([], false)}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New File
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg">
            {data.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <FolderItem
                    key={`root-${item}-${index}`}
                    name={item}
                    isFile={true}
                    content={[]}
                    level={0}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    onAddItem={handleAddItem}
                    path={[item]}
                  />
                );
              } else {
                const [folderName, folderContent] = Object.entries(item)[0];
                return (
                  <FolderItem
                    key={`root-${folderName}-${index}`}
                    name={folderName}
                    isFile={false}
                    content={folderContent || []}
                    level={0}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    onAddItem={handleAddItem}
                    path={[folderName]}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;