import { UserPublicWithRolesAndGroups } from "@/api";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

type OwnProps = {
  data: UserPublicWithRolesAndGroups[];
};

const UsersTable: React.FC<OwnProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default UsersTable;
