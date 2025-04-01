// components/ui/Tabs.tsx
import React, { useState } from "react";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
  defaultActiveTab?: number;
  marginSpace?: string;
  gap?:string
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab = 0, marginSpace = "mt-2" ,gap="gap-3" }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className="w-full">
      <div className={`flex ${gap} overflow-x-auto `}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer pb-2 font-semibold ${
              activeTab === index ? "text-black" : "text-grayShade"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <span
              className={`relative py-2 text-[10px] md:text-sm ${
                activeTab === index ? "underlineactive" : "underlineinactive"
              }`}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>

      <div className={marginSpace}>{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
