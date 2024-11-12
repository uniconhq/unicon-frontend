import { useQuery } from "@tanstack/react-query";
import { type Params, useParams } from "react-router-dom";

import { getDefinitionById } from "@/features/definitions/queries";

const Contest = () => {
  const { id } = useParams<Params<"id">>();
  const { data } = useQuery(getDefinitionById(Number(id)));

  // TEMP: This is a temporary solution to show the data
  return <p>{JSON.stringify(data)}</p>;
};

export default Contest;
