import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type OwnProps = {
  onClose: () => void;
  onSaveWithRerun: () => void;
  onSaveWithoutRerun: () => void;
};
const RerunDialog: React.FC<OwnProps> = ({
  onClose,
  onSaveWithRerun,
  onSaveWithoutRerun,
}) => {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Changes may break previous attempts.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Rerun them with the saved changes?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <div className="flex space-x-2">
            <AlertDialogAction onClick={onSaveWithoutRerun}>
              Save only
            </AlertDialogAction>
            <Button variant={"destructive"} onClick={onSaveWithRerun}>
              Save and rerun
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RerunDialog;
