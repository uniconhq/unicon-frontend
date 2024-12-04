import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "@/App.tsx";
import Layout from "@/components/layout/layout.tsx";
import Contest from "@/pages/Contest";
import CreateContest from "@/pages/CreateContest.tsx";
import CreateSubmission from "@/pages/CreateSubmission";
import Error from "@/pages/Error.tsx";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import SubmissionResults from "@/pages/SubmissionResults";
import Submissions from "@/pages/Submissions";
import { StoreProvider } from "@/store/store-provider.tsx";

import CreateOrganisation from "./pages/organisations/CreateOrganisation";
import Organisation from "./pages/organisations/Organisation";
import Organisations from "./pages/organisations/Organisations";
import CreateProject from "./pages/projects/CreateProject";
import Project from "./pages/projects/Project";
import Projects from "./pages/projects/Projects";

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
