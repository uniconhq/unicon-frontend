import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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

const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route element={<AuthenticatedPage />}>
          <Route index element={<Navigate to="/projects" />} />
          {/* Organisation routes */}
          <Route path="organisations">
            <Route index element={<Organisations />} />
            <Route path="new" element={<CreateOrganisation />} />
            <Route path=":id">
              <Route index element={<Organisation />} />
              <Route path="projects/new" element={<CreateProject />} />
            </Route>
          </Route>
          {/* Project routes */}
          <Route path="/projects">
            <Route index element={<Projects />} />
            <Route path=":projectId">
              <Route index element={<Project />} />
              <Route path="roles" element={<ProjectRoles />} />
              <Route path="users" element={<ProjectUsers />} />
              <Route path="submissions">
                <Route index element={<Submissions />} />
                <Route path=":id" element={<SubmissionResults />} />
              </Route>
              {/* Problem routes */}
              <Route path="problems">
                <Route path="new" element={<CreateProblem />} />
                <Route path=":problemId">
                  <Route index element={<Problem />} />
                  <Route path="edit" element={<EditProblem />} />
                  <Route
                    path="submissions/new"
                    element={<CreateSubmission />}
                  />
                  <Route path="tasks/new">
                    <Route
                      path="multiple-choice"
                      element={<CreateMultipleChoice />}
                    />
                    <Route
                      path="multiple-response"
                      element={<CreateMultipleResponse />}
                    />
                    <Route
                      path="short-answer"
                      element={<CreateShortAnswer />}
                    />
                    <Route path="programming" element={<CreateProgramming />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>{router}</StoreProvider>
  </StrictMode>,
);
