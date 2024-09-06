import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { baseApiAuth } from "../helpers/baseApi";
import { Link, useNavigate } from "react-router-dom";
import { fetchMyImages } from "../features/fetchImage/fetchImage.js";

export default function MyPhoto({ image  }) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const handleDelete = async () => {
        try {
          await baseApiAuth.delete(`/image/${image.id}`)
          dispatch(fetchMyImages());
          toast.success("Succes delete image !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          nav("/my-photo")
        } catch (error) {
          console.log(error)
             toast.success('Berhasil Login !', {
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
      }
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div
        className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        style={{
          backgroundImage:
            `url(${image.imgUrl})`,
        }}
      />
      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
        <div className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white ">
          <button
            onClick={handleDelete}
            type="button"
            className="px-5 py-1 rounded-full text-white text-sm tracking-wider font-medium border border-current  bg-red-700 hover:bg-red-800 active:bg-red-700">
            Delete
          </button>
        </div>
        <div className="py-2 font-bold tracking-wide text-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
        <Link to={`/detail-card/${image.id}`}>
          <button
            type="button"
            className="px-5 py-1 rounded-full text-white text-sm tracking-wider font-medium border border-current  bg-yellow-700 hover:bg-yellow-800 active:bg-yellow-700">
            Detail
          </button>

        </Link>
        </div>
      </div>
    </div>
  );
}
