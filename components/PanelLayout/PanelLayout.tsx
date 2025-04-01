import React from "react";
import ButtonFilter from "../ui/Tabs/ButtonFilter";
import NoDataFound from "../NoDataFound/NoDataFound";


interface Tab {
  label: string;
  content: React.ReactNode;
}

interface PanelLayoutProps {
  tabs?: Tab[];
  tabDisabled?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  dataAvailable?: boolean;
  rightHeader?: React.ReactNode;
}

const PanelLayout: React.FC<PanelLayoutProps> = ({
  tabs,
  tabDisabled = false,
  leftComponent,
  rightComponent,
  dataAvailable = true,
  rightHeader,
}) => {
  return (
    <div
      className="flex gap-1"
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      {/* Left Panel */}
      <div className="w-4/12 bg-white border-r border-lightGray flex flex-col">
        {!tabDisabled && tabs && (
          <div className="h-16 p-3 font-bold text-lg">
            <ButtonFilter tabs={tabs} />
          </div>
        )}
        {leftComponent}
      </div>

      {/* Right Panel */}
      <div
        className={`w-8/12 bg-white border-l ${
          !dataAvailable ? "border-none" : "border-lightGray"
        } border-lightGray flex flex-col`}
      >
        {dataAvailable && rightHeader && (
          <div className="h-16 p-3 border-b border-lightGray font-bold text-lg">
            {rightHeader}
          </div>
        )}

        <div className="p-4 overflow-auto flex-1">
          {dataAvailable ? rightComponent : <NoDataFound huddle />}
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;
