import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  addTaskToProblem,
  createProblem,
  getProblem,
  getProblemTaskAttemptResults,
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
  Project = "Project",
  Problem = "Problem",
  TaskResult = "TaskResult",
  Submission = "Submission",
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

export const getProblemById = (problemId: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Problem, problemId],
    queryFn: () =>
      getProblem({ path: { id: problemId } }).then((response) => response.data),
  });
};

export const getAllProjectSubmissions = (projectId: number) => {
  return queryOptions({
    queryKey: [
      ContestQueryKeys.Project,
      projectId,
      ContestQueryKeys.Submission,
    ],
    queryFn: () =>
      getProjectSubmissions({
        path: {
          id: projectId,
        },
      }).then((response) => response.data),
  });
};

export const useCreateTaskAttempt = (problemId: number, taskId: number) => {
  return useMutation({
    mutationFn: (data: UserInput) =>
      submitProblemTaskAttempt({
        body: data,
        path: { id: problemId, task_id: taskId },
      }),
  });
};

export const getTaskAttemptResults = (problemId: number, taskId: number) => {
  return queryOptions({
    queryKey: [
      ContestQueryKeys.Problem,
      problemId,
      ContestQueryKeys.TaskResult,
      taskId,
    ],
    queryFn: () =>
      getProblemTaskAttemptResults({
        path: { id: problemId, task_id: taskId },
      }).then((response) => response.data),
  });
};

export const getSubmissionById = (submissionId: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Submission, submissionId],
    queryFn: () =>
      getSubmission({ path: { submission_id: submissionId } }).then(
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
