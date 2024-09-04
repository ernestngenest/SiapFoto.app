import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { baseApi } from "../helpers/baseApi";

export default function Login() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async e => {
    e.preventDefault(e);
    try {
      const response = await baseApi.post("/login", dataForm);
      //   console.log("response: ", response);
      localStorage.setItem("access_token", response.data?.access_token);
      toast.success("Berhasil Login !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      toast(error.response.data.error || error.message, {
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
  const handleDataFormChange = e => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const handleCredentialResponse = async (response) => {
    try {
         let apiResponse = await baseApi.post('/login/google' ,
            {
                googleToken : response.credential
            },
        );
        console.log("response: ", apiResponse);
        toast.success("Berhasil Login !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        // console.log("response: ", response);
        localStorage.setItem("access_token", response.data?.access_token);
        navigate("/")
    } catch (error) {
        console.log("error: ", error);
        toast(error.response.data.error || error.message, {
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
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt();
  }, []);
  console.log(dataForm, "ini data form");
  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Login</h3>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter email"
                    onChange={handleDataFormChange}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                    onChange={handleDataFormChange}
                  />
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Log in
                </button>
              </div>
              
              <div className="w-full" id="buttonDiv"></div>
              <p className="text-sm !mt-8 text-center text-gray-800">
                Dont have an account{" "}
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                  Register here
                </a>
              </p>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
