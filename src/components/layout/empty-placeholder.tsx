import { PropsWithChildren } from "react";

type OwnProps = {
  description: string;
} & PropsWithChildren;

const EmptyPlaceholder: React.FC<OwnProps> = ({ description, children }) => {
  return (
    <div className="bg-black p-4 text-center shadow-inner">
      {description} {children}
    </div>
  );
};

export default EmptyPlaceholder;
