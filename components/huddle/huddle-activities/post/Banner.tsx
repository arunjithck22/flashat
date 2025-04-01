import { USER_CITIZENSHIP } from "@/common/constant";
import { getCitizenShipColors } from "@/utils/citizenshipColors";


export const Banner = ({
  role,
  citizenship,
}: {
  citizenship: string | undefined;
  role: string | undefined;
}) => {
  
   const backgroundcn = getCitizenShipColors(citizenship || "")

  return (
    <div
      className={`${backgroundcn} relative h-2 pl-16 rounded-t-lg flex justify-center border  border-primary`}
    >
      <div
        className={`${backgroundcn}  absolute border   border-t-primary border-primary  h-8 w-1/3 rounded uppercase font-bold text-xs flex justify-center items-center`}
        style={{
          clipPath: "polygon(0 0, 16px 100%, calc(100% - 19px) 100%, 100% 0)",
          top: "-0.9px",
        }}
      >
        <div
          className="absolute   left-2 "
          style={{
            top: "5.2px",
            border: "0.5px solid #53025B",
            height: "27px",
            transform: "rotate(-26deg)",
          }}
        ></div>
        <div
          className="absolute base-semibold  "
          style={{
            right: "10px",
            top: "5.2px",
            border: "0.5px solid #53025B",
            height: "27px",
            transform: "rotate(30deg)",
          }}
        ></div>
        {`${citizenship === USER_CITIZENSHIP.PRESIDENT ? "VIP" : citizenship}${
          role === "manager" ? "-MGR" : ""
        }`}
      </div>
    </div>
  );
};
