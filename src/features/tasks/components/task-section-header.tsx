type OwnProps = {
  content: string;
};

const TaskSectionHeader: React.FC<OwnProps> = ({ content }) => {
  return <span className="font-medium uppercase">{content}</span>;
};

export default TaskSectionHeader;
