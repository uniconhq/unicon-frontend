import { RolePublicWithInvitationKeys } from "@/api";
import { Button } from "@/components/ui/button";

import { useDeleteInvitationKey } from "../../queries";

type OwnProps = {
  role: RolePublicWithInvitationKeys;
};

const DeleteInvitationKeyButton: React.FC<OwnProps> = ({ role }) => {
  const deleteInvitationKeyMutation = useDeleteInvitationKey(
    role.project_id,
    role.id,
  );

  return (
    <Button
      variant="destructive"
      onClick={() => deleteInvitationKeyMutation.mutate()}
    >
      delete
    </Button>
  );
};

export default DeleteInvitationKeyButton;
