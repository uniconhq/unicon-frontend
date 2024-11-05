import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/Login.tsx";
import { StoreProvider } from "./store/store-provider.tsx";

const router = createBrowserRouter([
  { path: "/old", element: <App /> },
  { path: "/login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex h-screen w-screen flex-col bg-[#141414] p-4">
      <h1 className="mb-4 font-mono text-xl font-semibold text-purple-400">
        Unicon 🦄
      </h1>
      <div className="h-full w-full text-neutral-300">
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </div>
    </main>
  </StrictMode>,
);
