import { createBrowserRouter } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/register";
import MainPage from "../views/MainPage";
import RootLayout from "../views/RootLayout";
import GenerateImage from "../components/GenerateImage";
import MyPhoto from "../components/MyPhoto";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
        element:<MyPhoto/>
      },
    ]
  }
]);
