import { ShortAnswerTask } from "@/api";
import TaskContainer from "@/features/tasks/components/task-container";
import TaskSection from "@/features/tasks/components/task-section";
import TaskSectionHeader from "@/features/tasks/components/task-section-header";

export function ShortAnswer({ task }: { task: ShortAnswerTask }) {
  return (
    <TaskContainer>
      <TaskSection>
        <TaskSectionHeader content="Question" />
        <span className="text-gray-300">{task.question}</span>
      </TaskSection>
    </TaskContainer>
  );
}
