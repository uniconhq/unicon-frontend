import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUserStore } from "@/store/user/user-store-provider";

const AuthenticatedPage: React.FC = () => {
  const { user, isLoading } = useUserStore((store) => store);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, navigate, isLoading]);

  return <Outlet />;
};

export default AuthenticatedPage;
