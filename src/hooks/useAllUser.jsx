import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const useAllUser = () => {
    const { loading } = useContext(AuthContext);
    // use axios secure with react query
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['allClass'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://assignmenttwelv.vercel.app/allUser`);
            // console.log('all user', res)
            return res.data;
        }
    })
    return [classes, refetch]
}
export default useAllUser;