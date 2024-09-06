import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseApiAuth } from "../helpers/baseApi";
import { useNavigate } from "react-router-dom";

export default function Form() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Initialize state with username from localStorage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleOnChange = (e) => {
      console.log(e.target.value)
        setUsername(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const id = localStorage.getItem("id");
            if (!id) {
                throw new Error("ID not found in localStorage");
            }


            const response = await baseApiAuth.put(`/update/${id}`, { username:username });
            console.log(response, "Response");

           
            localStorage.setItem("username", username);

            toast.success("Username updated successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/generate");
        } catch (error) {
          console.log(error)
            toast.error(error.response?.data?.error || error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

  return (
    <div className="w-full my-auto">
      <div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-6 font-[sans-serif] text-[#333]">
        <div > 
          <labe className="mb-2 text-lg block">Ubah Username</labe>
          <input
            type="text"
            name = "username" 
            placeholder="Input Username"
            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            onChange
            value={username.username}
            onChange={handleOnChange}
          />
        </div>
          <button
          onClick={handleUpdate}
            type="button"
            className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-700 hover:bg-green-800 active:bg-green-700">
            Submit
          </button>
      </div>
    </div>
  );
}
