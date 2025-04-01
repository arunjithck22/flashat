"use client";
import React, { useState, useEffect } from "react";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs?: TabProps[];
  defaultActiveTab?: number;
}

const ButtonFilter: React.FC<TabsProps> = ({ tabs = [], defaultActiveTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  useEffect(() => {
    // Reset activeTab if tabs change and activeTab is out of bounds
    if (activeTab >= tabs.length) {
      setActiveTab(0);
    }
  }, [tabs, activeTab]);

  if (!tabs.length) return null;

  return (
    <div className="w-full">
      {/* Tabs Buttons */}
      <div className="flex gap-2 justify-between">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 px-3 py-2 text-xs rounded-md text-center transition-all duration-300 transform
              ${
                activeTab === index
                  ? "bg-primary text-white font-medium scale-105 shadow-lg"
                  : "bg-secondary text-tsecond font-light hover:bg-gray-200 hover:scale-102"
              }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default ButtonFilter;
