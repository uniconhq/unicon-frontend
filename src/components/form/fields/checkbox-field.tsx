import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CheckboxFieldProps {
  name: string;
  label?: string;
  description?: string;
  className?: string;
}

function CheckboxField({
  name,
  label,
  description,
  className,
}: CheckboxFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="justify-left flex w-fit items-center gap-x-2">
            {label && <FormLabel className="!text-current">{label}</FormLabel>}
            <FormControl>
              <Input
                type="checkbox"
                placeholder={""}
                {...field}
                checked={field.value === true}
                className={className}
              />
            </FormControl>
          </div>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export default CheckboxField;
