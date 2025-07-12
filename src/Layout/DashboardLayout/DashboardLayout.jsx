import React from 'react';
import { NavLink, Outlet } from 'react-router'; // ✅ fixed import
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaSearchLocation,
  FaUserCheck,
  FaUserClock,
  FaUsers,
  FaBlog
} from 'react-icons/fa';
import Logo from '../../Components/Logo/Logo';
import useCurrentUser from '../../Hooks/useCurrentUser';
import Loading from '../../Components/Loading/Loading';

const DashboardLayout = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Loading />;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Page content here */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <Logo />

          <li>
            <NavLink to="/dashboard">
              <FaHome className="inline-block mr-2" />
              Dashboard Home
            </NavLink>
          </li>

          {/* 👉 Admin Links */}
          {user.role === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard/admin/users">
                  <FaUsers className="inline-block mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/managePolicies">
                  <FaBoxOpen className="inline-block mr-2" />
                  Manage Policies
                </NavLink>
              </li>
            </>
          )}

          {/* 👉 Agent Links */}
          {user.role === 'agent' && (
            <>
              <li>
                <NavLink to="/dashboard/agent/customers">
                  <FaUserCheck className="inline-block mr-2" />
                  Assigned Customers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/agent/blogs">
                  <FaBlog className="inline-block mr-2" />
                  Write Blogs
                </NavLink>
              </li>
            </>
          )}

          {/* 👉 Customer Links */}
          {user.role === 'customer' && (
            <>
              <li>
                <NavLink to="/dashboard/customer/mypolicies">
                  <FaBoxOpen className="inline-block mr-2" />
                  My Policies
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/customer/payments">
                  <FaMoneyCheckAlt className="inline-block mr-2" />
                  Payments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/customer/claims">
                  <FaUserEdit className="inline-block mr-2" />
                  File a Claim
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
