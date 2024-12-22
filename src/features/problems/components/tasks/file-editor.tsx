import { Editor } from "@monaco-editor/react";
import { X } from "lucide-react";
import { useState } from "react";

import NodeInput from "@/components/node-graph/components/step/node-input";
import { Button } from "@/components/ui/button";

type OwnProps = {
  fileName: string;
  fileContent: string;
  onUpdateFileName: (newFileName: string) => void;
  onUpdateFileContent: (newFileContent: string) => void;
  onDeselectFile?: () => void;
  isEditing: boolean;
};

// Assumes debouncing is handled by the parent component onUpdateFileName and onUpdateFileContent
const FileEditor: React.FC<OwnProps> = ({
  fileName,
  fileContent,
  onUpdateFileName,
  onUpdateFileContent,
  onDeselectFile,
  isEditing,
}) => {
  const [displayFileName, setDisplayFilename] = useState(fileName);
  const [displayFileContent, setDisplayFileValue] = useState(fileContent);

  const updateFileName = (newValue: string) => {
    setDisplayFilename(newValue);
    onUpdateFileName(newValue);
  };

  const updateFileContent = (newValue: string | undefined) => {
    if (newValue === undefined) {
      return;
    }
    setDisplayFileValue(newValue);
    onUpdateFileContent(newValue);
  };

  return (
    <div className="h-full gap-2">
      {/* file tab */}
      <div className="flex w-fit gap-2 border-b border-purple-200 py-1">
        {isEditing ? (
          <NodeInput
            key={displayFileName}
            value={displayFileName}
            onChange={updateFileName}
          />
        ) : (
          <span className="px-1 text-xs">{displayFileName}</span>
        )}
        {onDeselectFile && (
          <Button
            className="h-fit p-1"
            variant={"ghost"}
            onClick={onDeselectFile}
          >
            <X />
          </Button>
        )}
      </div>
      <Editor
        className="grow"
        theme="vs-dark"
        defaultLanguage="python"
        options={{
          padding: { top: 5 },
          minimap: { enabled: false },
          ...(!isEditing ? { readOnly: true } : {}),
        }}
        value={displayFileContent}
        onChange={updateFileContent}
      />
    </div>
  );
};

export default FileEditor;
