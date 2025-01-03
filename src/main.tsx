import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "@/components/layout/layout.tsx";
import CreateSubmission from "@/pages/create-submission";
import Error from "@/pages/error";
import Login from "@/pages/login";
import Organisation from "@/pages/organisations/organisation";
import Organisations from "@/pages/organisations/organisations";
import CreateProblem from "@/pages/problems/create-problem";
import Problem from "@/pages/problems/problem";
import CreateProject from "@/pages/projects/create-project";
import Project from "@/pages/projects/project";
import ProjectRoles from "@/pages/projects/project-roles";
import Projects from "@/pages/projects/projects";
import SubmissionResults from "@/pages/submission-results";
import Submissions from "@/pages/submissions";
import { StoreProvider } from "@/store/store-provider.tsx";

import AuthenticatedPage from "./components/layout/authenticated-page";
import CreateOrganisation from "./pages/organisations/create-organisation";
import EditProblem from "./pages/problems/edit-problem";
import ProjectUsers from "./pages/projects/project-users";
import SignUp from "./pages/signup";
import CreateMultipleChoice from "./pages/tasks/create-multiple-choice";
import CreateMultipleResponse from "./pages/tasks/create-multiple-response";
import CreateProgramming from "./pages/tasks/create-programming";
import CreateShortAnswer from "./pages/tasks/create-short-answer";

const router = createBrowserRouter([
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
                children: [
                  { index: true, element: <Project /> },
                  { path: "roles", element: <ProjectRoles /> },
                  { path: "users", element: <ProjectUsers /> },
                  {
                    path: "submissions",
                    children: [
                      { index: true, element: <Submissions /> },
                      { path: ":id", element: <SubmissionResults /> },
                    ],
                  },
                  {
                    path: "problems",
                    children: [
                      { path: "new", element: <CreateProblem /> },
                      {
                        path: ":problemId",
                        children: [
                          { index: true, element: <Problem /> },
                          { path: "edit", element: <EditProblem /> },
                          {
                            path: "submissions/new",
                            element: <CreateSubmission />,
                          },
                          {
                            path: "tasks/new",
                            children: [
                              {
                                path: "multiple-choice",
                                element: <CreateMultipleChoice />,
                              },
                              {
                                path: "multiple-response",
                                element: <CreateMultipleResponse />,
                              },
                              {
                                path: "short-answer",
                                element: <CreateShortAnswer />,
                              },
                              {
                                path: "programming",
                                element: <CreateProgramming />,
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
        ],
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,
);
