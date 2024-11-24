import { ProgrammingTaskResult } from "@/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type OwnProps = {
  taskResult: ProgrammingTaskResult;
};

enum Status {
  OK = "OK",
  WA = "WA",
  TLE = "TLE",
  MLE = "MLE",
  RTE = "RTE",
}
type TestcaseResult = {
  status: Status;
  stderr: string;
  stdout: string;
};

const getTestcaseResultBadge = (status: Status) => {
  switch (status) {
    case Status.OK:
      return <Badge className="bg-green-300 hover:bg-green-300">OK</Badge>;
    case Status.WA:
      return <Badge className="bg-red-300 hover:bg-red-300">WA</Badge>;
    case Status.TLE:
      return <Badge className="bg-red-300 hover:bg-red-300">TLE</Badge>;
    case Status.MLE:
      return <Badge className="bg-red-300 hover:bg-red-300">MLE</Badge>;
    case Status.RTE:
      return <Badge className="bg-red-300 hover:bg-red-300">RTE</Badge>;
  }
};

const ProgrammingResult: React.FC<OwnProps> = ({ taskResult }) => {
  if (taskResult.result === null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      {(taskResult.result as TestcaseResult[]).map((testcaseResult, index) => (
        <div>
          <div className={cn("flex gap-4")}>
            <span>Testcase {index + 1}</span>
            {getTestcaseResultBadge(testcaseResult.status)}
          </div>
          <Accordion type="multiple" className="mt-2">
            <AccordionItem value={`stderr-${index}`}>
              <AccordionTrigger>stderr</AccordionTrigger>
              <AccordionContent>
                <pre>{testcaseResult.stderr}</pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value={`stdout-${index}`}>
              <AccordionTrigger>stdout</AccordionTrigger>
              <AccordionContent>
                <pre>{testcaseResult.stdout}</pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default ProgrammingResult;
