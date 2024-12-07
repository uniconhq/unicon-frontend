import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "@/App.tsx";
import Layout from "@/components/layout/layout.tsx";
import Contest from "@/pages/contest";
import CreateContest from "@/pages/create-contest";
import CreateSubmission from "@/pages/create-submission";
import Error from "@/pages/error";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Organisation from "@/pages/organisations/organisation";
import Organisations from "@/pages/organisations/organisations";
import CreateProject from "@/pages/projects/create-project";
import Project from "@/pages/projects/project";
import ProjectRoles from "@/pages/projects/project-roles";
import Projects from "@/pages/projects/projects";
import SubmissionResults from "@/pages/submission-results";
import Submissions from "@/pages/submissions";
import { StoreProvider } from "@/store/store-provider.tsx";

import CreateOrganisation from "./pages/organisations/create-organisation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/old", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/", element: <Home /> },
      { path: "/submissions", element: <Submissions /> },
      { path: "/projects/:id/problems/new", element: <CreateContest /> },
      { path: "/contests/:id", element: <Contest /> },
      { path: "/contests/:id/submit", element: <CreateSubmission /> },
      { path: "/submissions/:id", element: <SubmissionResults /> },
      { path: "/organisations", element: <Organisations /> },
      { path: "/organisations/:id", element: <Organisation /> },
      { path: "/organisations/new", element: <CreateOrganisation /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <Project /> },
      { path: "/projects/:id/roles", element: <ProjectRoles /> },
      { path: "/organisations/:id/projects/new", element: <CreateProject /> },
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
