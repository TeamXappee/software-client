"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideEyeOff, LucideEye } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

const LabeledInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, labelClassName, ...props }, ref) => {
    const [hidden, setHidden] = React.useState(type === "password");
    const [vale, setVal] = React.useState<any>();
    const [isFocus, setIsFocus] = React.useState(false);

    const handleBlur = () => {
      setIsFocus(vale?.length > 0 ? true : false); // Set focus based on value length
    };
    return (
      <div className="relative flex items-center">
        {label && !props.placeholder && (
          <label
            className={cn(
              `absolute  left-3 text-base ease-in-out duration-150  rounded-2xl px-2 py-1  ${
                isFocus && "-mt-14 -ml-2 px-2 text-xs bg-muted text-muted-foreground"
              }`,
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <input
          onBlur={handleBlur}
          onFocus={() => setIsFocus(true)}
          onChange={(e) => setVal(e.target.value)}
          type={hidden ? "password" : "text"}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-transparent pl-3 pr-12 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            onClick={() => setHidden(!hidden)}
            type="button"
            className="absolute right-0 mr-2 hover:bg-muted p-2 rounded-full grid place-content-center"
          >
            {hidden ? <LucideEyeOff size={18} /> : <LucideEye size={18} />}
          </button>
        )}
      </div>
    );
  }
);
LabeledInput.displayName = "LabeledInput";

export { LabeledInput };
