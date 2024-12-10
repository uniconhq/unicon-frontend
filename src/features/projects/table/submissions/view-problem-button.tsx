import { Link } from "react-router-dom";

import { useProjectId } from "../../hooks/use-project-id";

type OwnProps = {
  problemId: number;
};

const ViewProblemButton = ({ problemId }: OwnProps) => {
  const projectId = useProjectId();
  return (
    <Link
      to={`/projects/${projectId}/problems/${problemId}`}
      className="font-mono hover:text-purple-300 hover:underline"
    >
      #{problemId}
    </Link>
  );
};

export default ViewProblemButton;
