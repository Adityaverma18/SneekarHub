import React, { useState } from "react";

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { activeTab, setActiveTab })
  );
};

export const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex gap-4">{React.Children.map(children, (child) => React.cloneElement(child, { activeTab, setActiveTab }))}</div>
);

export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`px-4 py-2 rounded ${
      activeTab === value ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    }`}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, children, activeTab }) => {
  if (activeTab !== value) return null;
  return <div className="mt-6">{children}</div>;
};
