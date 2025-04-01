"use client";
import React, { useState } from "react";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
  defaultActiveTab?: number;
  marginSpace?: string;
}

const CountryFilterTab: React.FC<TabsProps> = ({ tabs, defaultActiveTab = 0, marginSpace = "mt-2" }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className="w-full ">
      {/* Tabs Header */}
      <div className="flex  justify-center gap-5  mb-5">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`relative cursor-pointer  transition-all  text-center items-center px-4 py-2  ${
              activeTab === index ? "text-black bg-gray-100 font-semibold  " : "text-gray-500 font-normal"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}

            {/* Active Tab Underline */}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 w-full h-[2px]  bg-primary"></div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs Content */}
      <div className={marginSpace}>{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default CountryFilterTab;
