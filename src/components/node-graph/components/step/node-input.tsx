import { ClassValue } from "clsx";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";

type OwnProps = {
  className?: ClassValue[];
  value: string;
  onChange: (newValue: string) => void;
};

const NodeInput: React.FC<OwnProps> = ({ className = [], value, onChange }) => {
  const debouncedHandleChange = useDebouncedCallback(onChange, 1000);
  const [displayValue, setDisplayValue] = useState(value);

  return (
    <input
      type="text"
      className={cn(
        "inline max-w-fit rounded-sm border border-gray-500/50 bg-transparent px-1 text-xs",
        ...className,
      )}
      value={displayValue}
      onChange={(e) => {
        const newValue = e.target.value;
        setDisplayValue(newValue);
        debouncedHandleChange(newValue);
      }}
      size={displayValue.length}
    />
  );
};

export default NodeInput;
