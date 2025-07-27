import React from "react";
import clsx from "clsx";

type Variant = "default" | "outline" | "success" | "destructive" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium text-sm transition-all duration-200";

  const variants: Record<Variant, string> = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
    success:
      "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {isLoading && (
        <svg
          className="w-4 h-4 animate-spin text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
