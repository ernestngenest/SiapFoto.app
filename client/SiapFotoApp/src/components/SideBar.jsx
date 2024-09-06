// Update the sidebar layout to make it more aesthetic and descriptive

import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const nav = useNavigate();
    const handleLogOut = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      nav("/login");
    };
  return (
    <nav className="bg-black h-screen  top-0 left-0 min-w-[260px] py-6 px-4 font-[sans-serif]">
      <div className="flex items-center gap-4 cursor-pointer">
       
        <div className="mx-5">
          <p className="text-sm text-white">{localStorage.getItem("username")}</p>
          <Link to="/update-username">
          <p className="text-xs text-gray-300 mt-0.5">Change Username</p>
          </Link>
        </div>
      </div>

      <hr className="my-6 border-gray-400" />

      <ul className="space-y-3">
        <Link to={"/generate"}>
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
        </Link>
        <Link to={"/my-photo"}>
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
              <span className="mx-3">My Photo</span>
            </a>
          </li>
        </Link>

        <li>    
        <div className="flex max-lg:ml-auto space-x-3 justify-center
         me-6">
            <button
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
              onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}
