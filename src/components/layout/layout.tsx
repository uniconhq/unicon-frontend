import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserProfile } from "@/features/auth/queries";
import { useUserStore } from "@/store/user/user-store-provider";

const Layout: React.FC<PropsWithChildren> = () => {
  const { data: userProfile } = useQuery(getUserProfile());

  const { user, setUser } = useUserStore((store) => store);
  const { pathname } = useLocation();

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    } else {
      setUser();
    }
  }, [setUser, userProfile]);

  return (
    <main className="flex h-screen w-screen flex-col overflow-y-scroll bg-[#141414] p-4">
      <div className="flex max-h-screen w-full text-neutral-300">
        {user && (
          <SidebarProvider>
            <AppSidebar pathname={pathname} />
            <main className="w-full">
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
