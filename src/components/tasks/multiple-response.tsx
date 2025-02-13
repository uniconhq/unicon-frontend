import { MultipleResponseTask } from "@/api";
import TaskContainer from "@/features/tasks/components/task-container";
import TaskSection from "@/features/tasks/components/task-section";
import TaskSectionHeader from "@/features/tasks/components/task-section-header";

export function MultipleResponse({ task }: { task: MultipleResponseTask }) {
  return (
    <TaskContainer>
      <TaskSection>
        <TaskSectionHeader content="Question" />
        <span className="text-gray-300">{task.question}</span>
      </TaskSection>
      <TaskSection>
        <TaskSectionHeader content="Options" />
        <ul className="list-inside list-decimal space-y-2">
          {task.choices.map((option) => (
            <li key={option.id}>{option.text}</li>
          ))}
        </ul>
      </TaskSection>
    </TaskContainer>
  );
}
