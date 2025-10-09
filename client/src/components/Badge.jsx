import React from "react";

export function Badge({ children, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-600 text-white",
    red: "bg-red-600 text-white",
    green: "bg-green-600 text-white",
    gray: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full shadow ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
}
