import { NodeType } from "./types";

export const NodeColorMap = {
  [NodeType.USER]: "blue",
  [NodeType.GROUP]: "green",
  [NodeType.ARTIFACT]: "yellow",
  [NodeType.TASK]: "purple",
};

export const StepNodeColorMap = {
  PY_RUN_FUNCTION_STEP: "blue",
  OBJECT_ACCESS_STEP: "green",
  INPUT_STEP: "yellow",
  OUTPUT_STEP: "purple",
  LOOP_STEP: "orange",
  IF_ELSE_STEP: "pink",
  STRING_MATCH_STEP: "grey",
};
