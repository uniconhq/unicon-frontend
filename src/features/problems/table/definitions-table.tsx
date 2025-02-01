import { ProblemOrm } from "@/api";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

type OwnProps = {
  data: ProblemOrm[];
};

const DefinitionsTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default DefinitionsTable;
