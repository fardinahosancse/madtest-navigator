import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderPlus, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FolderNode {
  id: string;
  name: string;
  children: FolderNode[];
}

const FolderTree = () => {
  const [folders, setFolders] = useState<FolderNode[]>([
    {
      id: "1",
      name: "functional",
      children: [
        { id: "1-1", name: "login", children: [] },
        { id: "1-2", name: "dashboard", children: [] },
      ],
    },
    {
      id: "2",
      name: "non-functional",
      children: [],
    },
  ]);
  
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["1"]));
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [parentFolderId, setParentFolderId] = useState<string | null>(null);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const startCreatingFolder = (parentId: string | null = null) => {
    setIsCreatingFolder(true);
    setParentFolderId(parentId);
    setNewFolderName("");
  };

  const createFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: FolderNode = {
      id: Date.now().toString(),
      name: newFolderName.trim(),
      children: [],
    };

    if (!parentFolderId) {
      setFolders([...folders, newFolder]);
    } else {
      const updateFolders = (nodes: FolderNode[]): FolderNode[] => {
        return nodes.map((node) => {
          if (node.id === parentFolderId) {
            return {
              ...node,
              children: [...node.children, newFolder],
            };
          }
          return {
            ...node,
            children: updateFolders(node.children),
          };
        });
      };

      setFolders(updateFolders(folders));
    }

    setIsCreatingFolder(false);
    setNewFolderName("");
    setParentFolderId(null);
  };

  const renderFolder = (folder: FolderNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.id);

    return (
      <div key={folder.id} style={{ marginLeft: `${level * 12}px` }}>
        <div className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-lg cursor-pointer group">
          <div 
            className="flex items-center gap-2 flex-1"
            onClick={() => toggleFolder(folder.id)}
          >
            <button className="w-4 h-4 flex items-center justify-center">
              {folder.children.length > 0 && (
                isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
              )}
            </button>
            <Folder size={16} />
            <span>{folder.name}</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => startCreatingFolder(folder.id)}>
                Add Subfolder
              </DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isExpanded && (
          <div className="mt-1">
            {folder.children.map((child) => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => startCreatingFolder(null)}
        >
          <FolderPlus size={16} />
          New Folder
        </Button>
      </div>

      {isCreatingFolder && (
        <div className="flex gap-2 items-center p-2">
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="h-8"
            onKeyDown={(e) => {
              if (e.key === "Enter") createFolder();
              if (e.key === "Escape") setIsCreatingFolder(false);
            }}
          />
          <Button size="sm" onClick={createFolder}>
            <Plus size={16} />
          </Button>
        </div>
      )}

      <div className="space-y-1">
        {folders.map((folder) => renderFolder(folder))}
      </div>
    </div>
  );
};

export default FolderTree;