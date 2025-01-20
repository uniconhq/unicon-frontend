"use client";

import * as React from "react";

import { InputStep, ProgrammingTask, Testcase } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import NodeGraph from "./node-graph";

type OwnProps = {
  testcase: Testcase;
  index: number;
  task: ProgrammingTask;
};

const TestcaseDisplay: React.FC<OwnProps> = ({ testcase, index, task }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const userInputNode: InputStep = {
    id: 0,
    type: "INPUT_STEP",
    inputs: [],
    outputs: task.required_inputs,
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button key={index} className="hover:text-purple-500">
            Testcase #{index + 1}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">
        <NodeGraph
          steps={testcase.nodes.concat([userInputNode])}
          edges={testcase.edges}
          isEditing={false}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TestcaseDisplay;
