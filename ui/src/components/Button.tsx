import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
}

const baseClasses = "px-3 py-1 rounded text-sm font-medium focus:outline-none ";
const variants: Record<string, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  destructive: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({
  children,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses}${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
