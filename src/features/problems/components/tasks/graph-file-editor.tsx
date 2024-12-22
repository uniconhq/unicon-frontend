import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

import { File } from "@/api";

import FileEditor from "./file-editor";
import { GraphContext, GraphDispatchContext } from "./graph-context";

const GraphFileEditor = () => {
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
    <FileEditor
      key={selectedStepId + file.name}
      fileName={file.name}
      fileContent={file.content}
      onUpdateFileName={updateFileName}
      onUpdateFileContent={updateFileContent}
      onDeselectFile={deselectFile}
      isEditing={isEditing && selectedStepId !== 0}
    />
  );
};

export default GraphFileEditor;
