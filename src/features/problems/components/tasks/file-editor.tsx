import { Editor } from "@monaco-editor/react";
import { X } from "lucide-react";
import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

import { File } from "@/api";
import NodeInput from "@/components/node-graph/components/step/node-input";
import { Button } from "@/components/ui/button";

import { GraphContext, GraphDispatchContext } from "./graph-context";

const FileEditor = () => {
  const { selectedStepId, selectedSocket, isEditing } =
    useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  const updateFileName = (newValue: string) => {
    dispatch({
      type: "UPDATE_STEP_SOCKET",
      stepId: selectedStepId!,
      oldSocketId: selectedSocket!.id,
      newSocketId: selectedSocket!.id,
      data: {
        ...file,
        name: newValue,
      },
      isInput: false,
    });
  };

  const updateFileContent = useDebouncedCallback(
    (newValue: string | undefined) => {
      if (newValue === undefined) {
        return;
      }
      dispatch({
        type: "UPDATE_STEP_SOCKET",
        stepId: selectedStepId!,
        oldSocketId: selectedSocket!.id,
        newSocketId: selectedSocket!.id,
        data: {
          ...file,
          content: newValue,
        },
        isInput: false,
      });
    },
    1000,
  );

  const deselectFile = () => {
    dispatch({ type: "DESELECT_STEP" });
  };

  if (selectedSocket === null || selectedStepId === null) {
    return null;
  }

  const file = selectedSocket.data as File;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-fit gap-2 border-b border-purple-200 py-1">
        {isEditing ? (
          <NodeInput
            key={file.name}
            value={file.name}
            onChange={updateFileName}
          />
        ) : (
          <span className="px-1 text-xs">{file.name}</span>
        )}
        <Button className="h-fit p-1" variant={"ghost"} onClick={deselectFile}>
          <X />
        </Button>
      </div>
      <Editor
        theme="vs-dark"
        defaultLanguage="python"
        options={{
          padding: { top: 5 },
          minimap: { enabled: false },
          ...(!isEditing ? { readOnly: true } : {}),
        }}
        value={file.content}
        onChange={updateFileContent}
      />
    </div>
  );
};

export default FileEditor;
