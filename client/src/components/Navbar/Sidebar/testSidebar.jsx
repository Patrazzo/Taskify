import React from "react";

export const TestSidebar = () => {
  return (
    <div className="bg-gray-200 h-full max-h-screen phone:max-h-none p-4 overflow-y-auto">
      <div className="sidebar-section">
        <h2 className="text-lg font-bold mb-2">About</h2>
        <ul>
          <li>Mission</li>
          <li>Team</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="sidebar-section mt-4">
        <h2 className="text-lg font-bold mb-2">Categories</h2>
        <ul>
          <li>Technology</li>
          <li>Science</li>
          <li>Lifestyle</li>
          <li>Arts & Culture</li>
          <li>Health & Fitness</li>
        </ul>
      </div>
      <div className="sidebar-section mt-4">
        <h2 className="text-lg font-bold mb-2">Recent Posts</h2>
        <ul>
          <li>10 Ways to Improve Productivity</li>
          <li>The Future of AI in Healthcare</li>
          <li>Exploring Ancient Civilizations: A Historical Journey</li>
        </ul>
      </div>
      <div className="sidebar-section mt-4">
        <h2 className="text-lg font-bold mb-2">Popular Tags</h2>
        <ul>
          <li>#Tech</li>
          <li>#Health</li>
          <li>#Art</li>
          <li>#Science</li>
          <li>#Productivity</li>
        </ul>
      </div>
      <div className="sidebar-section mt-4">
        <h2 className="text-lg font-bold mb-2">Follow Us</h2>
        <ul>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
        </ul>
      </div>
    </div>
  );
};
