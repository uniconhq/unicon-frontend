import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Home,
  ListChecks,
  User2,
} from "lucide-react";
import { AiFillSecurityScan } from "react-icons/ai";
import { GoPeople, GoProject, GoProjectSymlink } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

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
import { getProjects } from "@/features/projects/queries";
import { useUserStore } from "@/store/user/user-store-provider";

const SIDEBAR_ITEMS = [
  {
    path: "/",
    icon: <Home />,
    label: "Home",
  },
  { path: "/organisations", icon: <GoPeople />, label: "Organisations" },
  { path: "/projects", icon: <GoProject />, label: "Projects" },
];

const PROJECT_SIDEBAR_ITEMS = [
  {
    path: "",
    icon: <FileQuestion />,
    label: "Problems",
  },
  {
    path: "/submissions",
    icon: <ListChecks />,
    label: "Submissions",
  },
  {
    path: "/users",
    icon: <GoPeople />,
    label: "Users",
  },
  {
    path: "/roles",
    icon: <AiFillSecurityScan />,
    label: "Roles",
  },
];

type OwnProps = {
  pathname: string;
};

const AppSidebar: React.FC<OwnProps> = ({ pathname }) => {
  const { user, setUser } = useUserStore((store) => store);
  const navigate = useNavigate();

  const isProjectPath = pathname.match(/\/projects\/\d+.*/)?.length ?? 0 > 0;

  const { data: projects } = useQuery(getProjects());

  if (!user) {
    return;
  }

  const currentProjectId = isProjectPath ? Number(pathname.split("/")[2]) : -1;
  const currentProject = projects?.find(
    (project) => project.id == currentProjectId,
  );

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
        {currentProject && (
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem key={"projects"}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      {<GoProjectSymlink />}
                      {currentProject.name}
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    {projects?.map((project) => (
                      <DropdownMenuItem asChild key={project.id}>
                        <Link to={`/projects/${project.id}`}>
                          {project.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
              {PROJECT_SIDEBAR_ITEMS.map(({ icon, label, path }) => {
                const fullPath = `/projects/${currentProjectId}${path}`;
                return (
                  <SidebarMenuItem key={path}>
                    <SidebarMenuButton asChild isActive={pathname === fullPath}>
                      <Link to={fullPath}>
                        {icon}
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
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
