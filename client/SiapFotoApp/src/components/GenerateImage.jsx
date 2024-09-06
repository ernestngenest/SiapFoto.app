import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseApiAuth } from "../helpers/baseApi";
import { useNavigate } from "react-router-dom";

export default function GenerateImage() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    imgName: "",
  });

  const [image, setImage] = useState(null);

  const [file, setFile] = useState(null);



  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFile(e.target.files[0]);
  };

  const dataForm = new FormData();
        dataForm.append('photo', file);

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(image, "ini image");
      const response = await baseApiAuth.post(
        "/image",
        dataForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Berhasil Generate Gambar", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      nav("/my-photo");
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
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
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Upload Your Photo
        </h2>
        <div className="flex flex-col items-center">
          {/* Image Preview */}
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
              <span>No Image Selected</span>
            </div>
          )}

          {/* File Input */}
          <label className="flex flex-col items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-500 border border-gray-300 rounded-lg p-4 cursor-pointer">
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8a3 3 0 100 6 3 3 0 000-6zM19 10.5V6a2 2 0 00-2-2h-2l-2-2H9a2 2 0 00-2 2H5a2 2 0 00-2 2v4.5L1 13v1h2l2 2v1h14v-1l2-2h2v-1l-2-2z"
              />
            </svg>
            <span className="text-sm">Select a photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
      <div className="relative inline-block w-64 my-5">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-3 pr-8 py-2 text-gray-700">
          <option value="Male">Male</option>
          <option disabled value="option2">
            Female
          </option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <button
        className="transition-all font-bold border border-blue-400 hover:ring-2 hover:ring-yellow-400 px-4 py-2 text-center text-sm text-blue-800 after:transition-all after:duration-500 hover:after:bg-blue-400 lg:border lg:text-base relative after:content-[''] after:block after:absolute after:w-full after:h-full after:top-2 after:left-2 after:bg-blue-400/20 after:z-[-1] hover:after:inset-0"
        onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
