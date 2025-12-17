import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleLoading,
  } = useQuery({
    enabled: !!user?.uid,
    queryKey: ["user-role", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.uid}`);
      return res.data.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
