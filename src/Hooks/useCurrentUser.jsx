// hooks/useCurrentUser.js
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useCurrentUser = () => {
  const { user: authUser } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const {
    data: user = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["currentUser", authUser?.email],
    enabled: !!authUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${authUser.email}`);
      return res.data;
    },
  });

  return { user, isLoading, refetch };
};

export default useCurrentUser;
