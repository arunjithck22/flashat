"use client";
import React, { useEffect, useState } from "react";
import { getProfile } from "@/service/profile.service"; // Import getProfile API call
import { ApiResponse } from "@/types/apiResponse";
import { ProfileResponse } from "@/types/profile";


const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(error);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: ApiResponse<ProfileResponse> = await getProfile();
        console.log("response profile", response);

        if (response?.message === "OK" && response.result) {
          setProfile(response.result);
        } else {
          setError("Failed to load profile.");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError("An error occurred while fetching the profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4 p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Profile Details</h2>
        <p><strong>Name:</strong> {profile?.name || "N/A"}</p>
        <p><strong>Email:</strong> {profile?.email || "N/A"}</p>
        <p><strong>About:</strong> {profile?.about || "N/A"}</p>
        <p><strong>Date of Birth:</strong> {profile?.dob || "N/A"}</p>
        <p><strong>Gender:</strong> {profile?.gender || "N/A"}</p>
      </div>
    </div>
  );
};

export default Dashboard;
