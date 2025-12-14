import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/HomePage/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      }
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register,
        loader: async () => {
          const districts = await fetch('/districts.json').then(res => res.json());
          const upazilas = await fetch('/upazilas.json').then(res => res.json());
          return { districts, upazilas };
        }
      }

    ]
  },
]);
