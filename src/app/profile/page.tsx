"use client"; // Add this line

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");

//   useEffect(() => {
//     // Array of cartoon avatar URLs
//     const avatars = [
//       "https://example.com/cartoon1.svg",
//       "https://example.com/cartoon2.svg",
//       "https://example.com/cartoon3.svg",
//       "https://example.com/cartoon4.svg",
//       "https://example.com/cartoon5.svg",
//     ];

    // Randomly select an avatar
//     const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
//     setProfilePicture(randomAvatar);
//   }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Photo and Profile Info */}
      <div className="relative bg-white shadow-md">
        {/* Cover Photo */}
        <div className="h-56 bg-gradient-to-r from-blue-500 to-green-500"></div>
        {/* Profile Photo and Name */}
        <div className="absolute top-20 left-4 md:left-8 flex items-center">
          <img
            src={profilePicture} // Randomly selected cartoon avatar
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-900">User Name</h1>
            <p className="text-gray-600">[User's Bio or Tagline]</p>
          </div>
        </div>
      </div>

      {/* Navigation Bar
      <nav className="bg-white shadow-md mt-20">
        <div className="container mx-auto px-4 py-2 flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#timeline"
                className="text-gray-700 font-semibold hover:text-blue-600"
              >
                Timeline
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-700 font-semibold hover:text-blue-600"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#friends"
                className="text-gray-700 font-semibold hover:text-blue-600"
              >
                Friends
              </a>
            </li>
            <li>
              <a
                href="#photos"
                className="text-gray-700 font-semibold hover:text-blue-600"
              >
                Photos
              </a>
            </li>
            <li>
              <a
                href="#more"
                className="text-gray-700 font-semibold hover:text-blue-600"
              >
                More
              </a>
            </li>
          </ul>
        </div>
      </nav> */}

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        {/* Left Sidebar (e.g., Friends List, Photos) */}
        <div className="md:w-1/3 md:mr-8 mb-8 md:mb-0">
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Friends
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
              <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
              <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
              {/* Add more friend placeholders */}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Photos</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
              <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
              <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
              {/* Add more photo placeholders */}
            </div>
          </div>
        </div>

        {/* Right Content Area (e.g., Posts) */}
        <div className="md:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What's on your mind?
            </h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Write a post..."
            ></textarea>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Post
            </button>
          </div>

          {/* Example of a user post */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex items-center mb-4">
              <img
                src={profilePicture} // Use the same random avatar here
                alt="Profile Picture"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  User Name
                </h3>
                <p className="text-sm text-gray-600">Posted 1 hour ago</p>
              </div>
            </div>
            <p className="text-gray-800">
              This is an example of a user post. It could include text, images,
              or other media.
            </p>
          </div>

          {/* Add more user posts here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
