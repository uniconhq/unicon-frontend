import { MultipleChoiceTask } from "@/api";

export function MultipleChoice({ task }: { task: MultipleChoiceTask }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-medium text-gray-300">QUESTION</span>
      {task.question}
      <span className="text-xs font-medium text-gray-300">CHOICES</span>
      <ul className="list-inside list-disc space-y-2">
        {task.choices.map((choice, index) => (
          <li key={index}>{choice}</li>
        ))}
      </ul>
    </div>
  );
}
