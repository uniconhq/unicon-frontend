import { ProblemORM } from "@/api";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

type OwnProps = {
  data: ProblemORM[];
};

const DefinitionsTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default DefinitionsTable;
