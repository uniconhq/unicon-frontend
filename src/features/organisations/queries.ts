import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  createOrganisation,
  getAllOrganisations,
  getOrganisation,
  OrganisationCreate,
} from "@/api";

export enum OrganisationQueryKeys {
  Organisation = "Organisation",
}
export const getOrganisations = () => {
  return queryOptions({
    queryKey: [OrganisationQueryKeys.Organisation],
    queryFn: () => getAllOrganisations().then((response) => response.data),
  });
};

export const getOrganisationById = (id: number) => {
  return queryOptions({
    queryKey: [OrganisationQueryKeys.Organisation, id],
    queryFn: () =>
      getOrganisation({ path: { id } }).then((response) => response.data),
  });
};

export const useCreateOrganisation = () => {
  return useMutation({
    mutationFn: (data: OrganisationCreate) =>
      createOrganisation({ body: data }),
  });
};
