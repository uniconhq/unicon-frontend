import "@/index.css";

import { Navigate, UIMatch } from "react-router-dom";

import { Problem as ProblemType, ProjectPublicWithProblems } from "@/api";
import AuthenticatedPage from "@/components/layout/authenticated-page";
import Layout from "@/components/layout/layout.tsx";
import CreateSubmission from "@/pages/create-submission";
import Error from "@/pages/error";
import Login from "@/pages/login";
import CreateOrganisation from "@/pages/organisations/create-organisation";
import Organisation from "@/pages/organisations/organisation";
import Organisations from "@/pages/organisations/organisations";
import CreateProblem from "@/pages/problems/create-problem";
import EditProblem from "@/pages/problems/edit-problem";
import Problem from "@/pages/problems/problem";
import CreateProject from "@/pages/projects/create-project";
import Project from "@/pages/projects/project";
import ProjectGroups from "@/pages/projects/project-groups";
import ProjectRoles from "@/pages/projects/project-roles";
import ProjectUsers from "@/pages/projects/project-users";
import Projects from "@/pages/projects/projects";
import SignUp from "@/pages/signup";
import SubmissionResults from "@/pages/submission-results";
import Submissions from "@/pages/submissions";
import CreateMultipleChoice from "@/pages/tasks/create-multiple-choice";
import CreateMultipleResponse from "@/pages/tasks/create-multiple-response";
import CreateProgramming from "@/pages/tasks/create-programming";
import CreateShortAnswer from "@/pages/tasks/create-short-answer";

import { problemLoader, projectLoader } from "./loaders";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        element: <AuthenticatedPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/projects" />,
          },
          {
            path: "organisations",
            children: [
              { index: true, element: <Organisations /> },
              { path: "new", element: <CreateOrganisation /> },
              {
                path: ":id",
                children: [
                  { index: true, element: <Organisation /> },
                  { path: "projects/new", element: <CreateProject /> },
                ],
              },
            ],
          },
          {
            path: "projects",
            children: [
              { index: true, element: <Projects /> },
              {
                path: ":projectId",
                handle: {
                  crumb: (match: UIMatch<ProjectPublicWithProblems>) => {
                    return {
                      label: match.data.name,
                      href: "/projects/" + match.data.id,
                    };
                  },
                },
                loader: projectLoader,
                children: [
                  { index: true, element: <Project /> },
                  {
                    path: "roles",
                    element: <ProjectRoles />,
                    handle: {
                      crumb: () => ({ label: "Roles" }),
                    },
                  },
                  {
                    path: "users",
                    element: <ProjectUsers />,
                    handle: {
                      crumb: () => ({ label: "Users" }),
                    },
                  },
                  {
                    path: "groups",
                    element: <ProjectGroups />,
                    handle: {
                      crumb: () => ({ label: "Groups" }),
                    },
                  },
                  {
                    path: "submissions",
                    handle: {
                      crumb: (match: UIMatch) => ({
                        label: "Submissions",
                        href: `/projects/${match.params.projectId}/submissions`,
                      }),
                    },
                    children: [
                      {
                        index: true,
                        element: <Submissions />,
                      },
                      {
                        path: ":id",
                        element: <SubmissionResults />,
                        handle: {
                          crumb: (match: UIMatch) => ({
                            label: match.params.id,
                          }),
                        },
                      },
                    ],
                  },
                  {
                    path: "problems",
                    loader: problemLoader,
                    handle: {
                      crumb: (match: UIMatch<ProblemType>) => {
                        return {
                          label: match.data.name,
                          href: `/projects/${match.params.projectId}/problems/${match.params.problemId}`,
                        };
                      },
                    },
                    children: [
                      { path: "new", element: <CreateProblem /> },
                      {
                        path: ":problemId",
                        children: [
                          { index: true, element: <Problem /> },
                          {
                            path: "edit",

                            handle: {
                              crumb: (match: UIMatch) => ({
                                label: "Edit",
                                href: `/projects/${match.params.projectId}/problems/${match.params.problemId}/edit`,
                              }),
                            },
                            children: [
                              {
                                index: true,
                                element: <EditProblem />,
                              },
                              {
                                path: "tasks/new",
                                children: [
                                  {
                                    path: "multiple-choice",
                                    element: <CreateMultipleChoice />,
                                    handle: {
                                      crumb: () => ({
                                        label: "New multiple choice task",
                                      }),
                                    },
                                  },
                                  {
                                    path: "multiple-response",
                                    element: <CreateMultipleResponse />,
                                    handle: {
                                      crumb: () => ({
                                        label: "New multiple response task",
                                      }),
                                    },
                                  },
                                  {
                                    path: "short-answer",
                                    element: <CreateShortAnswer />,
                                    handle: {
                                      crumb: () => ({
                                        label: "New short answer task",
                                      }),
                                    },
                                  },
                                  {
                                    path: "programming",
                                    element: <CreateProgramming />,
                                    handle: {
                                      crumb: () => ({
                                        label: "New programming task",
                                      }),
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            path: "submissions/new",
                            element: <CreateSubmission />,
                            handle: {
                              crumb: () => ({ label: "New Submission" }),
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
];
