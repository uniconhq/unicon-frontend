import { useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getProblemById, useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";
import ProgrammingForm, {
  ProgrammingFormType,
} from "@/features/tasks/forms/programming-form";

import { Unauthorized } from "../error";

const CreateProgramming = () => {
  const problemId = useProblemId();
  const projectId = useProjectId();

  const createTaskMutation = useCreateTask(problemId);
  const navigate = useNavigate();

  const { data } = useQuery(getProblemById(problemId));
  if (data && !data.edit) {
    throw Unauthorized;
  }

  const onSubmit: SubmitHandler<ProgrammingFormType> = async (data) => {
    createTaskMutation.mutate(
      {
        ...data,
        type: "PROGRAMMING_TASK",
        id: -1,
      },
      {
        onSuccess: () => {
          navigate(`/projects/${projectId}/problems/${problemId}/edit`);
        },
      },
    );
  };

  return <ProgrammingForm title="New programming task" onSubmit={onSubmit} />;
};

export default CreateProgramming;
