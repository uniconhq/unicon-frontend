import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC<PropsWithChildren> = () => {
  return (
    <main className="flex h-screen w-screen flex-col bg-[#141414] p-4">
      <h1 className="mb-4 font-mono text-xl font-semibold text-purple-400">
        Unicon 🦄
      </h1>
      <div className="h-full w-full text-neutral-300">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
