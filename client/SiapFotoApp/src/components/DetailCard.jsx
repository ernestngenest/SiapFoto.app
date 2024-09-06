import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseApiAuth } from "../helpers/baseApi";
import { Link, useParams } from "react-router-dom";

export default function DetailCard() {
  const [detailData, setDetailData] = useState([]);
  const { id } = useParams();
  console.log(id);
  const fetchImage = async () => {
    try {
      const response = await baseApiAuth.get(`/getimgById/${id}`);
      setDetailData(response.data);
    } catch (error) {
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

  const handleSendEmail = async () => {
    try {
        let response = await baseApiAuth.post(`/sendEmail/${id}`)
        console.log(response)
        toast.success("Success send email !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    } catch (error) {
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
  }
  useEffect(() => {
    fetchImage();
  }, [id]);

 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 w-full">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={detailData.imgUrl}
          alt={detailData.title}
          className="w-50  object-cover object-center"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {detailData.title}
          </h2>
          <p className="mt-4 text-gray-600">{detailData.description}</p>
          <div className="mt-6 flex justify-end">
            <button className="px-5 py-2 mx-4 bg-green-600 text-white rounded-full hover:bg-green-700" onClick={handleSendEmail}> 
              Send Email
            </button>
            <Link to={"/my-photo"}>
              <button className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
