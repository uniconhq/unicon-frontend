import { useState } from "react";

import { InputStep, ProgrammingTask } from "@/api";
import Testcase from "@/features/problems/components/tasks/testcase";

import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import ProgrammingSubmitForm from "./programming-submit";

export function Programming({
  submit,
  problemId,
  task,
}: {
  submit: boolean;
  problemId: number;
  task: ProgrammingTask;
}) {
  const userInput: InputStep = {
    id: 0,
    type: "INPUT_STEP",
    inputs: [],
    outputs: task.required_inputs,
  };

  const [selectedTestcaseIdx, setSelectedTestcaseIdx] = useState<number | null>(
    task.testcases.length ? 0 : null,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-medium">QUESTION</span>
        <span className="text-gray-300">{task.question}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">ENVIRONMENT</span>
        <div className="w-fit">
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableCell>{task.environment.language}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Time Limit</TableHead>
                <TableCell>{task.environment.time_limit_secs}s</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Memory Limit</TableHead>
                <TableCell>{task.environment.memory_limit_mb}MB</TableCell>
              </TableRow>
              {task.environment.extra_options && (
                <>
                  <TableRow>
                    <TableHead>Extra Options</TableHead>
                    <TableCell>
                      <Table className="w-fit">
                        <TableBody>
                          {Object.entries(task.environment.extra_options).map(
                            ([key, value]) =>
                              !!value && (
                                <TableRow key={key}>
                                  <TableHead>{key}</TableHead>
                                  <TableCell className="whitespace-pre-line">
                                    {value}
                                  </TableCell>
                                </TableRow>
                              ),
                          )}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">TESTCASES</span>
        <div className="flex gap-2 font-mono text-gray-300">
          {task.testcases.map((testcase, index) => (
            <Testcase
              edit={false}
              key={testcase.id}
              index={index}
              testcase={testcase}
              userInput={userInput}
              isSelected={selectedTestcaseIdx === index}
              onSelected={setSelectedTestcaseIdx}
            />
          ))}
        </div>
      </div>
      {submit && <ProgrammingSubmitForm problemId={problemId} task={task} />}
    </div>
  );
}
