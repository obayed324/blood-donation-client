import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/HomePage/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile/Profile";
import DashboardHome from "../pages/Dashboard/dashboardHome/dashboardHome";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import EditDonationRequest from "../pages/Dashboard/dashboardHome/EditDonationRequest/EditDonationRequest";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests/MyDonationRequests";
import SearchDonor from "../pages/HomePage/SearchDonor/SearchDonor";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/donation-requests',
        Component: DonationRequests,
        loader: async () => {
          const districts = await fetch('/districts.json').then(res => res.json());
          const upazilas = await fetch('/upazilas.json').then(res => res.json());
          return { districts, upazilas };
        }
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>
        ),
      },
      {
        path:"/search",
        Component:SearchDonor,
        loader: async () => {
          const districts = await fetch('/districts.json').then(res => res.json());
          const upazilas = await fetch('/upazilas.json').then(res => res.json());
          return { districts, upazilas };
        }
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
        index: true,
        Component: DashboardHome

      },
      {
        path: "profile",
        element: <Profile></Profile>,
        loader: async () => {
          const districts = await fetch('/districts.json').then(res => res.json());
          const upazilas = await fetch('/upazilas.json').then(res => res.json());
          return { districts, upazilas };
        }
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationRequest />,
        loader: async () => {
          const districts = await fetch("/districts.json").then(res => res.json());
          const upazilas = await fetch("/upazilas.json").then(res => res.json());

          return { districts, upazilas };
        }
      },
      {
        path: "/dashboard/edit-donation/:id",
        Component: EditDonationRequest,
        loader: async () => {
          const districts = await fetch("/districts.json").then(res => res.json());
          const upazilas = await fetch("/upazilas.json").then(res => res.json());

          return { districts, upazilas };
        }
      },
      {
        path: "/dashboard/my-donation-requests",
        Component: MyDonationRequests
      }


    ]
  }
]);
