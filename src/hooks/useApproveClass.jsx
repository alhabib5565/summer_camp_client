import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const useAllClass = () => {
    const { loading} = useContext(AuthContext);
    // use axios secure with react query
    const {data: classes=[], isLoading: isAllClassLoaidn, refetch} = useQuery({
        queryKey: ['allClass'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://assignmenttwelv.vercel.app/allClass`);
            // console.log( 'all class',res)
            return res.data;
        }
    })
    return [classes, isAllClassLoaidn, refetch]
}
export default useAllClass;