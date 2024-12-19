import { StepSocket } from "@/api";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

type OwnProps = {
  data: StepSocket[];
};

const InputTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} hidePagination />;
};

export default InputTable;
