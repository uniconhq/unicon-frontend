"use client";

import { Trash } from "lucide-react";
import * as React from "react";

import { InputStep, Testcase as TestcaseApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NodeGraph from "@/features/problems/components/tasks/node-graph";
import { cn } from "@/lib/utils";

import { GraphAction } from "./graph-context";

type TestcaseProps = {
  index: number; // TODO: Reconcile with `Testcase::id`
  testcase: TestcaseApi;
  userInput: InputStep;
  // Node graph editor props
  edit: boolean;
  nodeGraphOnChange?: (action: GraphAction) => void;
  // UI state
  isSelected?: boolean;
  onSelected?: (index: number | null) => void;
  onDelete?: (index: number) => void;
};

const Testcase: React.FC<TestcaseProps> = ({
  index,
  testcase,
  userInput,
  edit,
  nodeGraphOnChange,
  isSelected,
  onSelected,
  onDelete,
}) => {
  return (
    <Collapsible
      defaultOpen
      open={isSelected}
      onOpenChange={(isOpen: boolean) => onSelected?.(isOpen ? index : null)}
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
        {onDelete && (
          <Button variant="destructive" onClick={() => onDelete(index)}>
            <Trash />
          </Button>
        )}
      </div>
      <CollapsibleContent className="space-y-4">
        <NodeGraph
          edit={edit}
          id={`${testcase.id}`}
          key={testcase.id}
          input={userInput}
          steps={testcase.nodes}
          edges={testcase.edges}
          onChange={nodeGraphOnChange}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Testcase;
