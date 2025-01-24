import { ClassValue } from "clsx";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";

type OwnProps = {
  className?: ClassValue[];
  value: string;
  onChange: (newValue: string) => void;
};

const NodeInput: React.FC<OwnProps> = ({ className = [], value, onChange }) => {
  const debouncedHandleChange = useDebouncedCallback(onChange, 1000);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
    inputRef.current?.focus();
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      className={cn(
        "inline max-w-fit rounded-sm border border-gray-500/50 bg-transparent px-1 text-xs",
        ...className,
      )}
      onChange={(e) => {
        const newValue = e.target.value;
        debouncedHandleChange(newValue);
      }}
    />
  );
};

export default NodeInput;
