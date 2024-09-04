import { createBrowserRouter } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
        path : "/login",
        element: <Login/>
    },
    {
        path:"/register",
        element: <Register/>
    }
    
  ]);