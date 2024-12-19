import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "@/App.tsx";
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
    children: [
      {
        path: "/",
        element: <AuthenticatedPage />,
        children: [
          { path: "/", element: <Navigate to="/projects" /> },

          { path: "/organisations", element: <Organisations /> },
          { path: "/organisations/:id", element: <Organisation /> },
          { path: "/organisations/new", element: <CreateOrganisation /> },
          { path: "/projects", element: <Projects /> },
          { path: "/projects/:projectId", element: <Project /> },
          { path: "/projects/:id/roles", element: <ProjectRoles /> },
          { path: "/projects/:id/users", element: <ProjectUsers /> },
          { path: "/projects/:id/problems/new", element: <CreateProblem /> },
          { path: "/projects/:projectId/problems/:id", element: <Problem /> },
          {
            path: "/projects/:projectId/problems/:problemId/edit",
            element: <EditProblem />,
          },
          {
            path: "/projects/:projectId/problems/:problemId/tasks/new/multiple-choice",
            element: <CreateMultipleChoice />,
          },
          {
            path: "/projects/:projectId/problems/:problemId/tasks/new/multiple-response",
            element: <CreateMultipleResponse />,
          },
          {
            path: "/projects/:projectId/problems/:problemId/tasks/new/short-answer",
            element: <CreateShortAnswer />,
          },
          {
            path: "/projects/:projectId/problems/:problemId/tasks/new/programming",
            element: <CreateProgramming />,
          },
          {
            path: "/projects/:projectId/problems/:id/submit",
            element: <CreateSubmission />,
          },
          {
            path: "/projects/:projectId/submissions",
            element: <Submissions />,
          },
          {
            path: "/projects/:projectId/submissions/:id",
            element: <SubmissionResults />,
          },
          {
            path: "/organisations/:id/projects/new",
            element: <CreateProject />,
          },
        ],
      },
      { path: "/old", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,
);
