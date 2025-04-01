import ButtonFilter from "@/components/ui/Tabs/ButtonFilter";
import React from "react";

const Page = () => {

  const btn = [
    { label: "My Huddles", content: <div>My Huddles Content</div> },
    { label: "Admin", content: <div>Admin Content</div> },
    { label: "Joined", content: <div>Joined Content</div> },
    { label: "Others", content: <div>Others Content</div> },
  ];

  return (
    <div className="p-4">
     
      <ButtonFilter tabs={btn} />
    </div>
  );
};

export default Page;
