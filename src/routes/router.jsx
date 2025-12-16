import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/HomePage/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile/Profile";

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
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
        loader: async () => {
          const districts = await fetch('/districts.json').then(res => res.json());
          const upazilas = await fetch('/upazilas.json').then(res => res.json());
          return { districts, upazilas };
        }
      }
    ]
  }
]);
