import { createBrowserRouter } from "react-router";

import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import ErrorPage from "../Pages/Error/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path:'dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        
      }

    ]
  }
]);
