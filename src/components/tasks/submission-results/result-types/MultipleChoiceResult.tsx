import { MultipleChoiceTaskResult } from "@/api";

type OwnProps = {
  taskResult: MultipleChoiceTaskResult;
};

const MultipleChoiceResult: React.FC<OwnProps> = ({ taskResult }) => {
  return (
    <div>
      {taskResult.result ? (
        <div className="bg-green-800/50 p-2">Correct!</div>
      ) : (
        <div className="bg-red-800/50 p-2">Incorrect!</div>
      )}
    </div>
  );
};

export default MultipleChoiceResult;
