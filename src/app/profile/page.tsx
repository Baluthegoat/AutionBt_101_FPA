"use client";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    // Retrieve avatar URL from local storage
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setProfilePicture(storedAvatar);
    } else {
      // Fallback to a default avatar if none is found in local storage
      const defaultAvatars = ["../assets/female.png", "../assets/male.png"];
      const randomAvatar =
        defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
      setProfilePicture(randomAvatar);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative bg-white shadow-md">
        <div className="h-56 bg-gradient-to-r from-blue-500 to-green-500"></div>

        <div className="absolute top-20 left-4 md:left-8 flex items-center">
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-900">User Name</h1>
            <p className="text-gray-600">[User's Bio or Tagline]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
