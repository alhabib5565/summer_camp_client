import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSelectClass = () => {
    // const { user } = useContext(AuthContext)
   const {user, loading} = useContext(AuthContext)
   const [axiosSecure] = useAxiosSecure()
   const {data: seleteClass =[], refetch, isLoading} = useQuery({
    queryKey: ['mySelectClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/mySelectClass/${user?.email}`)
            return res.data;
        },
   })
   return [seleteClass, refetch, isLoading]
};

export default useSelectClass;