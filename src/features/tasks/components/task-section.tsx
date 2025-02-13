import { PropsWithChildren } from "react";

const TaskSection: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default TaskSection;
