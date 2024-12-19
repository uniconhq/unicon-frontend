import {
  ObjectAccessStep,
  OutputStep,
  PyRunFunctionStep,
  StepType,
} from "@/api";
import { Step } from "@/features/problems/components/tasks/types";

import InputTable from "./input-table/input-table";
import OutputTable from "./output-table/output-table";

const STEP_TYPES_WITH_METADATA: StepType[] = [
  "PY_RUN_FUNCTION_STEP",
  "OBJECT_ACCESS_STEP",
  "OUTPUT_STEP",
  "INPUT_STEP",
];

type OwnProps = {
  step: Step;
};

const StepMetadata: React.FC<OwnProps> = ({ step }) => {
  if (!STEP_TYPES_WITH_METADATA.includes(step.type)) {
    return null;
  }
  return (
    <div className="ml-7 mr-2 pb-4 text-sm text-gray-500">
      {step.type === "PY_RUN_FUNCTION_STEP" && (
        <>
          <div>{(step as PyRunFunctionStep).function_identifier}(...)</div>
          <div>
            allow_error:{" "}
            {JSON.stringify((step as PyRunFunctionStep).allow_error)}
          </div>
        </>
      )}
      {step.type === "OBJECT_ACCESS_STEP" && (
        <div>{(step as ObjectAccessStep).key}</div>
      )}
      {step.type === "OUTPUT_STEP" && (
        <OutputTable data={(step as OutputStep).socket_metadata} />
      )}
      {step.type === "INPUT_STEP" && <InputTable data={step.outputs} />}
    </div>
  );
};

export default StepMetadata;
