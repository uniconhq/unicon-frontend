import { ChevronUp, Home, ListChecks, User2 } from "lucide-react";
import { GoPeople, GoProject } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { logout } from "@/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/user/user-store-provider";

const SIDEBAR_ITEMS = [
  {
    path: "/",
    icon: <Home />,
    label: "Home",
  },
  { path: "/organisations", icon: <GoPeople />, label: "Organisations" },
  { path: "/projects", icon: <GoProject />, label: "Projects" },
  {
    path: "/submissions",
    icon: <ListChecks />,
    label: "Submissions",
  },
];

const AppSidebar = () => {
  const { user, setUser } = useUserStore((store) => store);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  if (!user) {
    return;
  }

  const signout = async () => {
    await logout({ withCredentials: true });
    setUser();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="bg-[#2e2931]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Unicon</SidebarGroupLabel>
          <SidebarMenu>
            {SIDEBAR_ITEMS.map(({ icon, label, path }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton asChild isActive={pathname === path}>
                  <Link to={path}>
                    {icon}
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={signout} className="cursor-pointer">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
