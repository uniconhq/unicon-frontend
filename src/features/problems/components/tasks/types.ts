import {
  IfElseStep,
  InputStep,
  LoopStep,
  ObjectAccessStep,
  OutputStep,
  PyRunFunctionStep,
  StringMatchStep,
} from "@/api";

export type Step =
  | OutputStep
  | InputStep
  | PyRunFunctionStep
  | LoopStep
  | IfElseStep
  | StringMatchStep
  | ObjectAccessStep;
