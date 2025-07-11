import { Navigate, Outlet } from "react-router";
import useCurrentUser from "../Hooks/useCurrentUser";
import Loading from "../Components/Loading/Loading";



const RoleRoute = ({ allowedRole }) => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Loading />;
  if (user?.role === allowedRole) return <Outlet />;
  return <Navigate to="/unauthorized" />;
};

export default RoleRoute;
