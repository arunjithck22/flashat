import type { Config } from "tailwindcss";
import rtlPlugin from "tailwindcss-rtl";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./view/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-ministerBg",
    "bg-ambassadorBg",
    "bg-presidentBg",
    "bg-citizenBg",
    "bg-residentBg",
    "bg-officerBg",
    "bg-visitorBg",
  ],
  theme: {
    extend: {
      animation: {
        moveLoader: "moveLoader 1.5s linear infinite",
      },
      letterSpacing: {
        "extra-wide": "0.15em",
      },
      keyframes: {
        moveLoader: {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
      },
      zIndex: {
        max: "9999",
        "super-max": "2147483647",
      },

      colors: {
        primary: "#B227C1",
        secondary: "#F7F6FB",
        lightPink: "#FBE8FF40",
        tsecond: "#747D87",
        bgGray: "#D4D4D4",
        postPink: "#FEF3FF",
        postYellow: "#FFFEE9",
        postGrey: "#F4F4F4",
        primaryLight: "#DB91E2",
        visitorText: "#3F464E",
        visitorBg: "#E0E0E0",
        residentText: "#FFFFFF",
        residentBg: "#8E8E8E",
        citizenText: "#771082",
        citizenBg: "#FFF5BB",
        officerText: "#B227C1",
        officerBg: "#E6CD17",
        ambassadorText: "#B227C1",
        ambassadorBg: "#FFAFFD",
        ministerText: "#FFFFFF",
        ministerBg: "#B227C1",
        presidentText: "#FFFFFF",
        presidentBg: "president-gradient",
        bgLightPink: "#FEF3FF",
        bgPinkSecondary: "#ecd5f0",
        podiumItemBg: "#F7F6FB",
        softGray: "#F1F1F6",
        mediumGray: "#CACACA",
        grayShade: "#7A7A7A",
        textGray: "#7F7F7F",
        headingGray: "#454545",
        disabledGray: "#C4C4C4",
        customGray: "#8B8B8B",
        Golden:"#FFE900",
        lightGray: "#DBDBDB",
        darkGray:"#373737",
        yellowLite:"#F3D802",

        light: {
          900: "#FFFFFF",
          800: "F7F6FB",
        },
        dark: {
          100: "#000000",
        },
      },
      backgroundImage: {
        "gradient-red": "linear-gradient(to right, #4F0000, #B50000)",
        "president-bg-gradient":
          "linear-gradient(to right, #A37A1E 0%, #D3A84C 14%, #FFEC95 31%, #E6BE69 44%, #FFD87B 61%, #B58F3E 71%, #B58F3E 83%)",
      },
      screens: {
        xs: "420px",
      },
      spacing: {
        medium: "1.5rem",
      },

      fontSize: {
        small: "10px",
      },
      padding:{
        normal:"1.2rem"
      }
     
    },
  },
  plugins: [rtlPlugin, animatePlugin],  
};
export default config;
