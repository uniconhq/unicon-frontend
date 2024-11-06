import { getDefinitions } from "@/features/definitions/queries";
import DefinitionsTable from "@/features/definitions/table/definitions-table";
import { useUserStore } from "@/store/user/user-store-provider";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useUserStore((store) => store);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(getDefinitions());

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return;
  }

  return (
    <div className="flex h-full w-full flex-col gap-8 p-4 px-8">
      <h1 className="text-2xl font-semibold">Contests</h1>
      {!isLoading && data && <DefinitionsTable data={data} />}
    </div>
  );
};

export default Home;
