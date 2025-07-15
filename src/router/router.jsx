import { createBrowserRouter } from "react-router";

import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import ErrorPage from "../Pages/Error/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import ManageUsers from "../Pages/Role/Admin/ManageUsers";
import AssignedCustomers from "../Pages/Role/Agent/AssignedCustomers";
import Blogs from "../Pages/Role/Agent/Blogs";
import Payments from "../Pages/Role/Customer/Payments";
import MyPolicies from "../Pages/Role/Customer/MyPolicies";
import RoleRoute from "./RoleRoute";
import ManagePolicies from "../Pages/Role/Admin/ManagePolicies";
import AllPolicies from "../Pages/AllPolicies/AllPolicies";
import PolicyDetails from "../Pages/AllPolicies/PolicyDetails";
import QuotePage from "../Pages/Quote/QuotePage";
import ApplicationForm from "../Pages/Application/ApplicationForm";
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
      {
        path:'allPolicies',
        Component: AllPolicies
      },
      {
        path:'policies/:id',
        Component: PolicyDetails
      },
      {
       path:'quote/:id',
       element: <PrivateRoute>
        <QuotePage></QuotePage>
       </PrivateRoute>
      },
      {
       path:'application/:id',
       element: <PrivateRoute>
      <ApplicationForm></ApplicationForm>
       </PrivateRoute>
      }
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
    errorElement: ErrorPage,
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
   children: [
    {
      element: <RoleRoute allowedRole="admin" />,
      children: [
        { path: "admin/users", Component: ManageUsers },

        { path: "admin/managePolicies", Component: ManagePolicies },
      ],
    },
    {
      element: <RoleRoute allowedRole="agent" />,
      children: [
        { path: "agent/customers", Component: AssignedCustomers },
        { path: "agent/blogs", Component: Blogs },
      ],
    },
    {
      element: <RoleRoute allowedRole="customer" />,
      children: [
        { path: "customer/mypolicies", Component: MyPolicies },
        { path: "customer/payments", Component: Payments },
      ],
    },
  ],
  }
]);
