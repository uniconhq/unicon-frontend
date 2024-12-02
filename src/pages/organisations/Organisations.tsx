import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { getOrganisations } from "@/features/organisations/queries";

const Organisations = () => {
  const { data: organisations, isLoading } = useQuery(getOrganisations());

  return (
    <div className="m-auto flex w-full max-w-5xl flex-col gap-8 p-4 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Organisations</h1>
        <Link to="/organisations/new" className="flex gap-1">
          <Button variant="ghost" className="hover:text-purple-300">
            <Plus /> New organisation
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {!isLoading &&
          organisations?.map((organisation) => (
            <Link
              to={`/organisations/${organisation.id}`}
              key={organisation.id}
            >
              <Card className="group flex justify-between p-4 hover:opacity-80">
                <CardTitle>{organisation.name}</CardTitle>
                <ArrowRight className="hidden h-4 w-4 group-hover:block" />
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Organisations;
