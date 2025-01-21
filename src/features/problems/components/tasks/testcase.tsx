"use client";

import * as React from "react";

import { InputStep, ProgrammingTask, Testcase } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NodeGraph from "@/features/problems/components/tasks/node-graph";
import { cn } from "@/lib/utils";

type OwnProps = {
  testcase: Testcase;
  index: number;
  task: ProgrammingTask;
  isSelected: boolean;
  onSelected: (index: number | null) => void;
};

const TestcaseDisplay: React.FC<OwnProps> = ({
  testcase,
  index,
  task,
  isSelected,
  onSelected,
}) => {
  // TODO: Decouple graph level invariants from display logic
  const userInputNode: InputStep = {
    id: 0,
    type: "INPUT_STEP",
    inputs: [],
    outputs: task.required_inputs,
  };

  const onOpenChange = (isOpen: boolean) => onSelected(isOpen ? index : null);

  return (
    <Collapsible
      open={isSelected}
      onOpenChange={onOpenChange}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            key={index}
            className={cn({
              "border-2 border-purple-400 text-purple-400": isSelected,
            })}
          >
            #{index + 1}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">
        <NodeGraph
          id={`${testcase.id}`}
          steps={testcase.nodes.concat([userInputNode])}
          edges={testcase.edges}
          isEditing={false}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TestcaseDisplay;
