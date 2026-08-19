import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, label, id, type, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const isPassword = type === "password";

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
        <div className="relative">
          <input
            id={id}
            type={isPassword && visible ? "text" : type}
            ref={ref}
            className={cn(
              "peer w-full rounded-xl border border-white/40 bg-transparent px-4 py-3 text-base text-white placeholder-white/45 transition-all duration-200 placeholder-shown:text-sm focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_12px_rgba(0,243,255,0.35)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
              isPassword ? "pr-10" : "pr-4",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={0}
              aria-label={visible ? "Hide password" : "Show password"}
              aria-pressed={visible}
              onClick={() => setVisible((v) => !v)}
              className="absolute inset-y-0 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/55 opacity-100 transition-colors hover:bg-white/20 hover:text-white"
            >
              {visible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);
AuthInput.displayName = "AuthInput";

export { AuthInput };
