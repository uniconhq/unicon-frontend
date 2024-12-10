import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { getAllDefinitions } from "@/features/definitions/queries";
import DefinitionsTable from "@/features/definitions/table/definitions-table";

const Home = () => {
  const { data, isLoading } = useQuery(getAllDefinitions());

  return (
    <div className="flex w-full flex-col gap-8 p-4 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contests</h1>
        <Link to="/contests/new" className="flex gap-1">
          <Button variant="ghost" className="hover:text-purple-300">
            <Plus /> New contest
          </Button>
        </Link>
      </div>

      {!isLoading && data && <DefinitionsTable data={data} />}
    </div>
  );
};

export default Home;
