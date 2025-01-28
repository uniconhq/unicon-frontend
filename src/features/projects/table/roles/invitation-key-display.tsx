import { useToast } from "@/hooks/use-toast";

type OwnProps = {
  invitationKey: string | undefined;
};
const InvitationKeyDisplay: React.FC<OwnProps> = ({ invitationKey }) => {
  const toast = useToast();
  if (!invitationKey) return <div>-</div>;

  const onClick = () => {
    navigator.clipboard.writeText(invitationKey);
    toast.toast({
      title: `Invitation key copied to clipboard.`,
      description: invitationKey,
    });
  };
  return (
    <div onClick={onClick} className="hover:cursor-pointer">
      {invitationKey ?? "-"}
    </div>
  );
};

export default InvitationKeyDisplay;
