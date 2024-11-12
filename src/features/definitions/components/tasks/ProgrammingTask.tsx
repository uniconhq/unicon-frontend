"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ProgrammingTask } from "@/api";
import NodeGraph from "./NodeGraph";

type OwnProps = {
  programmingTask: ProgrammingTask;
};
const ProgrammingTaskDisplay: React.FC<OwnProps> = ({ programmingTask }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          {programmingTask.id}. {programmingTask.question}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {programmingTask.testcases.map((testcase) => (
          <NodeGraph steps={testcase.nodes} edges={testcase.edges} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProgrammingTaskDisplay;
