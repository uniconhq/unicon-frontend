import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { DefinitionORM } from "@/api";

type OwnProps = {
  data: DefinitionORM[];
};

const DefinitionsTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default DefinitionsTable;
