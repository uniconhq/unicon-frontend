import { PropsWithChildren } from "react";

const TaskContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-6">{children}</div>;
};

export default TaskContainer;
