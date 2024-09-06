import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/register";
import MainPage from "../views/MainPage";
import RootLayout from "../views/RootLayout";
import GenerateImage from "../components/GenerateImage";
import MyPhotoList from "../components/MyPhotoList";
import Form from "../components/form";
import DetailCard from "../components/DetailCard";

const checkAuth = () => {
  console.log( localStorage.getItem("access_token")  , "ini token ")
  return localStorage.getItem("access_token") ? null : redirect("/");
};
export const router = createBrowserRouter([
 
  {
    path: "/",
    element: <MainPage />,
    loader: () => localStorage.getItem("access_token") ? redirect("/generate") : null,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => localStorage.getItem("access_token") ? redirect("/generate") : null,
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => localStorage.getItem("access_token") ? redirect("/generate") : null,
  },
  {
    element: <RootLayout/>,
    children:[
      {
        path:"/generate",
        element:<GenerateImage/>
      },
      {
        path:"/my-photo",
        element:<MyPhotoList/>
      },
      {
        path:"update-username",
        element:<Form/>
      },
      {
        path:"detail-card/:id",
        element: <DetailCard/>
      }
    ],
    loader: checkAuth,
  }
]);
