import { MultipleResponseTask } from "@/api";

export function MultipleResponse({ task }: { task: MultipleResponseTask }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-medium text-gray-300">QUESTION</span>
      {task.question}
      <span className="text-xs font-medium text-gray-300">OPTIONS</span>
      <ul className="list-inside list-decimal space-y-2">
        {task.choices.map((option) => (
          <li key={option.id}>{option.text}</li>
        ))}
      </ul>
    </div>
  );
}
