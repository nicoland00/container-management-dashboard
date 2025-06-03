import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "destructive" | "secondary";
}

const variants: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  destructive: "bg-red-100 text-red-800",
  secondary: "bg-gray-100 text-gray-800"
};

export function Badge({ children, variant = "secondary" }: BadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
