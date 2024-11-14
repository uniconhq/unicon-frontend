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
import { StoreProvider } from "@/store/store-provider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/old", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/", element: <Home /> },
      { path: "/contests/new", element: <CreateContest /> },
      { path: "/contests/:id", element: <Contest /> },
      { path: "/contests/:id/submit", element: <CreateSubmission /> },
      { path: "/submissions/:id/results", element: <SubmissionResults /> },
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
