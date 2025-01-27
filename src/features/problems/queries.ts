import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  addTaskToProblem,
  createProblem,
  getProblem,
  getProjectSubmissions,
  getSubmission,
  makeSubmission,
  MultipleChoiceTask,
  MultipleResponseTask,
  Problem,
  ProgrammingTask,
  ShortAnswerTask,
  submitProblemTaskAttempt,
  updateProblem,
  UserInput,
} from "@/api";

export enum ContestQueryKeys {
  Definitions = "definitions",
  Definition = "definition",
  Submissions = "submissions",
}

export const useCreateProblem = (project_id: number) => {
  return useMutation({
    mutationFn: (data: Problem) =>
      createProblem({ body: data, path: { id: project_id } }),
  });
};

export const useUpdateProblem = (problemId: number) => {
  return useMutation({
    mutationFn: (data: Problem) =>
      updateProblem({ body: data, path: { id: problemId } }),
  });
};

export type TaskType =
  | ProgrammingTask
  | MultipleChoiceTask
  | MultipleResponseTask
  | ShortAnswerTask;

export const useCreateTask = (problemId: number) => {
  return useMutation({
    mutationFn: (data: TaskType) =>
      addTaskToProblem({ body: data, path: { id: problemId } }),
  });
};

export const getProblemById = (id: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Definition, id],
    queryFn: () =>
      getProblem({ path: { id } }).then((response) => response.data),
  });
};

export const getAllProjectSubmissions = (projectId: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Submissions],
    queryFn: () =>
      getProjectSubmissions({
        path: {
          id: projectId,
        },
      }).then((response) => response.data),
  });
};

export const getSubmissionById = (id: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Submissions, id],
    queryFn: () =>
      getSubmission({ path: { submission_id: id } }).then(
        (response) => response.data,
      ),
  });
};

type Submission = {
  user_inputs: UserInput[];
};
export const useCreateSubmission = (problemId: number) => {
  return useMutation({
    mutationFn: (data: Submission) => {
      return Promise.all(
        data.user_inputs.map((input) =>
          submitProblemTaskAttempt({
            body: input,
            path: {
              id: problemId,
              task_id: input.task_id,
            },
          }),
        ),
      ).then((response) =>
        makeSubmission({
          body: response
            .map((res) => res.data?.id)
            .filter((id) => id !== undefined),
          path: { id: problemId },
        }),
      );
    },
  });
};
