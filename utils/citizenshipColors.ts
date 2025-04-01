"use client";

export const getCitizenShipColors = (item: string) => {
  if (!item) return "";

  const citizenship = item.toLowerCase();
  console.log("func", citizenship);

  const citizenshipClasses: { [key: string]: string } = {
    minister: "bg-ministerBg text-ministerText",
    citizen: "bg-citizenBg text-citizenText",
    resident: "bg-residentBg text-residentText",
    officer: "bg-officerBg text-officerText",
    president: "bg-president-bg-gradient text-presidentText",
    ambassador: "bg-ambassadorBg text-ambassadorText",
    visitor: "bg-visitorBg text-visitorText",
  };

  return citizenshipClasses[citizenship] || "";
};
