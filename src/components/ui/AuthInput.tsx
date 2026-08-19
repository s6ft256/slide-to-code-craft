import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, label, id, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-medium leading-none text-white/60"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "peer w-full rounded-xl border border-white/30 bg-white/5 px-4 py-3 text-base text-white placeholder-white/45 shadow-inner transition-all duration-200 placeholder-shown:text-sm focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_12px_rgba(0,243,255,0.35)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
AuthInput.displayName = "AuthInput";

export { AuthInput };
