import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type OwnProps = {
  invitationKey: string | undefined;
  className?: string;
  variant?: "default" | "border";
};
const InvitationKeyDisplay: React.FC<OwnProps> = ({
  invitationKey,
  variant,
  className,
}) => {
  const toast = useToast();
  if (!invitationKey) return <div>-</div>;

  const onClick = () => {
    navigator.clipboard.writeText(invitationKey);
    toast.toast({
      title: `Invitation key copied to clipboard.`,
      description: invitationKey,
    });
  };

  const variantClasses =
    variant === "border"
      ? "text-mono w-fit cursor-pointer text-nowrap rounded-md border border-slate-500 p-2 text-slate-300"
      : "cursor-pointer";
  return (
    <div onClick={onClick} className={cn(variantClasses, className)}>
      {invitationKey ?? "-"}
    </div>
  );
};

export default InvitationKeyDisplay;
