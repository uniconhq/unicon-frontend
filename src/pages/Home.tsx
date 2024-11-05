import { useUserStore } from "@/store/user/user-store-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useUserStore((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4"></div>
  );
};

export default Home;
