import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createOrganisation,
  getAllOrganisations,
  getOrganisation,
  OrganisationCreate,
  OrganisationUpdate,
  updateOrganisation,
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganisationCreate) =>
      createOrganisation({ body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: OrganisationQueryKeys.Organisation,
      });
    },
  });
};

export const useUpdateOrganisation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganisationUpdate) =>
      updateOrganisation({ path: { id }, body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OrganisationQueryKeys.Organisation, id],
      });
    },
  });
};
