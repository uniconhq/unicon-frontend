"use client";

import * as React from "react";

import { Testcase } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import NodeGraph from "./NodeGraph";

type OwnProps = {
  testcase: Testcase;
  index: number;
};

const TestcaseDisplay: React.FC<OwnProps> = ({ testcase, index }) => {
  const [isOpen, setIsOpen] = React.useState(true);

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
        <NodeGraph steps={testcase.nodes} edges={testcase.edges} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TestcaseDisplay;
