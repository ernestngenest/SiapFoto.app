// Update the sidebar layout to make it more aesthetic and descriptive

import React from "react";

export default function Sidebar() {
  return (
    <div>
      <nav className="bg-[#121e31] h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] tracking-wide overflow-auto">
        <div className="flex items-center gap-4 cursor-pointer">
          <img
            src="https://readymadeui.com/logo.png"
            alt="Logo"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-sm text-white">John Doe</p>
            <p className="text-xs text-gray-300 mt-0.5">Change Username</p>
          </div>
        </div>

        <hr className="my-6 border-gray-400" />

        <ul className="space-y-3">
          <li>
            <a
              href="javascript:void(0)"
              className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-camera w-5 ">
                <rect x="3" y="3" width="18" height="14" rx="2" ry="2"></rect>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M5 7h.01"></path>
              </svg>
              <span className="mx-3">Take Photo</span>
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-image w-5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
              <span className="mx-5">My Photo</span>
            </a>
          </li>

          <li>
            <a
              href="javascript:void(0)"
              className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512">
                {/* <!-- SVG Path for Logout --> */}
              </svg>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
