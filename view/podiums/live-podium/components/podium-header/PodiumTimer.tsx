"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PodiumTimer = ({ startTime }: any) => {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

  useEffect(() => {
    if (startTime) {
      const targetTime = new Date(
        startTime.endsWith("Z") ? startTime : `${startTime}Z`
      ).getTime();

      const updateTimer = () => {
        const currentTime = new Date().getTime();
        console.log("current time", currentTime);
        const timeDifference = currentTime - targetTime;

        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      };

      // Update the timer every second
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
    // Clear the interval when the component is unmounted
  }, [startTime]);
  return (
    <span
      className="rounded flex justify-center items-center px-2 py-0.5 gap-1"
      style={{
        backgroundColor: "rgba(243, 244, 246, 0.5)", // Transparent background (gray-100 with opacity)
      }}
    >
      <Image
        alt="kabab menu"
        width={10}
        height={10}
        src="/podiums/yellow-clock.svg"
        className="hover:cursor-pointer bg-center"
      />
      <span
        className="flex text-white font-semibold justify-center items-center"
        style={{
          fontSize: "11px",
          opacity: 1, // Ensure child elements are fully opaque
        }}
      >
        {timeLeft}
      </span>
    </span>
  );
};

export default PodiumTimer;
