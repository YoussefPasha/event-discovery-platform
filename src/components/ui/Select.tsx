import { SelectHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full py-2 border rounded-lg transition-colors appearance-none bg-white",
              "ltr:pl-3 ltr:pr-10 rtl:pr-3 rtl:pl-10",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:bg-gray-100 disabled:cursor-not-allowed",
              "cursor-pointer",
              {
                "border-gray-300 hover:border-gray-400": !error,
                "border-red-500 focus:ring-red-500": error,
              },
              className
            )}
            {...props}
          >
            {children}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-2 rtl:pl-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
