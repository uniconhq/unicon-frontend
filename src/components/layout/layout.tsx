import { getUserProfile } from "@/queries/user";
import { useUserStore } from "@/store/user/user-store-provider";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";

const Layout: React.FC<PropsWithChildren> = () => {
  const { data: userProfile } = useQuery(getUserProfile());

  const { user, setUser } = useUserStore((store) => store);

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
  }, [setUser, userProfile]);

  return (
    <main className="flex h-screen w-screen flex-col bg-[#141414] p-4">
      <div className="flex h-full w-full text-neutral-300">
        {user && (
          <SidebarProvider>
            <AppSidebar />
            <main className="h-full w-full">
              <div className="flex justify-between">
                <SidebarTrigger />
              </div>
              <Outlet />
            </main>
          </SidebarProvider>
        )}
        {!user && <Outlet />}
      </div>
    </main>
  );
};

export default Layout;
