import React from "react";
import DearsList from "./DearsList";
import FansList from "./FansList";
import LikersList from "./LikersList";
import StarsList from "./StarsList";

const UserRelationsList = ({ type }: { type: string }) => {
  return (
    <div className="relative">
      {type === "dears" && <DearsList />}
      {type === "fans" && <FansList />}
      {type === "likers" && <LikersList />}
      {type === "stars" && <StarsList />}
    </div>
  );
};

export default UserRelationsList;
