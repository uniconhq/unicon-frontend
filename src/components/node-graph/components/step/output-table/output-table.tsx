import { OutputSocketConfig } from "@/api";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

type OwnProps = {
  data: OutputSocketConfig[];
};

const OutputTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} hidePagination />;
};

export default OutputTable;
