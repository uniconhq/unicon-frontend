import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import EmptyPlaceholder from "@/components/layout/empty-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import EditOrganisationDialog from "@/features/organisations/components/edit-organisation-dialog";
import { getOrganisationById } from "@/features/organisations/queries";
import { useOrganisationId } from "@/features/projects/hooks/use-id";

const Organisation = () => {
  const id = useOrganisationId();
  const { data: organisation, isLoading } = useQuery(getOrganisationById(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!organisation) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="m-auto flex w-full max-w-5xl flex-col gap-8 p-4 px-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold">{organisation.name}</h2>
          <p className="text-gray-500">{organisation.description}</p>
        </div>
        <EditOrganisationDialog organisation={organisation}>
          <Button variant="ghost" className="hover:text-purple-300">
            <Edit /> Edit details
          </Button>
        </EditOrganisationDialog>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Link to={`/organisations/${id}/projects/new`} className="flex gap-1">
          <Button variant="ghost" className="hover:text-purple-300">
            <Plus /> New Project
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {organisation.projects.length === 0 && (
          <EmptyPlaceholder description="No projects found." />
        )}
        {organisation.projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <Card className="group flex justify-between p-4 hover:opacity-80">
              <CardTitle>{project.name}</CardTitle>
              <ArrowRight className="hidden h-4 w-4 group-hover:block" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Organisation;
