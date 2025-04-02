export enum Gender {
    Male = "Male",
    Female = "Female",
    PreferNotToSay = "Prefer Not to Say",
    None = "",
  }

  export enum ProfileCheckpoints {
    HomePage = 0,
    PasswordSetup = 1,
    ProfileSetup = 2,
    UsernameSetup = 3,
    SuperStarSetup = 5,
  }
  
  export enum Devicetype{
    WEB="web"
  }

  export enum USER_CITIZENSHIP {
    VISITOR= "VISITOR",
    RESIDENT= "RESIDENT",
    CITIZEN= "CITIZEN",
    OFFICER= "OFFICER",
    AMBASSADOR= "AMBASSADOR",
    MINISTER= "MINISTER",
    PRESIDENT= "PRESIDENT",
  };
  
  export enum USER_PRIORITY  {
    MGR= "MGR",
    ADMIN="Admin",
  };
  
  export const FullLeadershipRoleList = [
    "CITIZEN",
    "CITIZEN - MGR",
    "CITIZEN - ADMIN",
  
    "OFFICER",
    "OFFICER - MGR",
    "OFFICER - ADMIN",
  
    "AMBASSADOR",
    "AMBASSADOR - MGR",
    "AMBASSADOR - ADMIN",
  
    "MINISTER",
    "MINISTER - MGR",
    "MINISTER - ADMIN",
  
    "VIP",
    "VIP - MGR",
    "VIP - ADMIN",
  
    "VISITOR",
    "VISITOR - MGR",
  
    "RESIDENT",
    "RESIDENT - MGR",
  ];
  
  