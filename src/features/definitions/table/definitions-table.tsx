import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { BaseDefinitionDTO } from "@/api";

type OwnProps = {
  data: BaseDefinitionDTO[];
};
const DefinitionsTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default DefinitionsTable;
