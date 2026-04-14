import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Label } from "../../ui/label";

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error == "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }
  return String(error);
};

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};
  
const Appfield = ({
  field,
  label,
  type = "text",
  placeholder,
  append,
  prepend,
  className,
  disabled = false,
}: AppFieldProps) => {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;

  const hasError = firstError !== null;

  return (
    <div className={cn("", className)}>
      <Label htmlFor={field.name} className={cn(hasError && "text-destructive")}>
        {label}
      </Label>
      <div className="relative">
        {prepend && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
            {prepend}
          </div>
        )}
        <input
          type={type}
          id={field.name}
          name={field.name}
          value={field.state.value}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${field.name}-error` : undefined}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prepend && "pl-10",
              append && "pr-10",
            hasError && "border-destructive focus-visible:ring-destructive",
            className,
          )}
        />
        {append && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            {append}
          </div>
        )}
              
        {hasError && (
          <p
                      id={`${field.name}-error`}
                      role="alert"
            className="text-sm text-destructive"
          >
            {firstError}
          </p>
        )}

      </div>
    </div>
  );
};

export default Appfield;
