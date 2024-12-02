import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Plus } from "lucide-react";
import { Link, Params, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { getOrganisationById } from "@/features/organisations/queries";

const Organisation = () => {
  const { id } = useParams<Params<"id">>();
  const { data: organisation, isLoading } = useQuery(
    getOrganisationById(Number(id)),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!organisation) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="m-auto flex w-full max-w-5xl flex-col gap-8 p-4 px-8">
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold">{organisation.name}</h2>
        <p className="text-gray-500">{organisation.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Link to="/organisations/new" className="flex gap-1">
          <Button variant="ghost" className="hover:text-purple-300">
            <Plus /> New Project
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {organisation.projects?.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
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

export default Organisation;
