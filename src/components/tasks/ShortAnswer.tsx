import { ShortAnswerTask } from "@/api";

export function ShortAnswer({ task }: { task: ShortAnswerTask }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-medium text-gray-300">QUESTION</span>
      {task.question}
    </div>
  );
}
