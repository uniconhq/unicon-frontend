import { SubmissionORM } from "@/api";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

type OwnProps = {
  data: SubmissionORM[];
};

const SubmissionsTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default SubmissionsTable;
