import { useQuery } from "@tanstack/react-query";
import { type Params, useParams } from "react-router-dom";

import { getDefinitionById } from "@/features/definitions/queries";
import { ProgrammingTask } from "@/api";
import ProgrammingTaskDisplay from "@/features/definitions/components/tasks/ProgrammingTask";

const Contest = () => {
  const { id } = useParams<Params<"id">>();
  const { data, isLoading } = useQuery(getDefinitionById(Number(id)));
  if (isLoading) {
    return <p>loading</p>;
  }
  if (!data) {
    return <p>something went wrong</p>;
  }

  const programmingTasks: ProgrammingTask[] = data.tasks.filter(
    (task) => task.type === "PROGRAMMING_TASK",
  ) as unknown as ProgrammingTask[];

  // TEMP: This is a temporary solution to show the data
  return (
    <>
      {programmingTasks.map((programmingTask) => (
        <ProgrammingTaskDisplay programmingTask={programmingTask} />
      ))}
    </>
  );
};

export default Contest;
