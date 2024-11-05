import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{ path: "/old", element: <App /> }]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex h-screen w-screen flex-col bg-[#141414] p-4 font-mono">
      <h1 className="mb-4 text-xl font-semibold text-purple-400">Unicon 🦄</h1>
      <RouterProvider router={router} />
    </main>
  </StrictMode>,
);
