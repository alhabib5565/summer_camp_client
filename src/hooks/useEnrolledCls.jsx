import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useEnrolledCls = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const { data: enrolledCls = [], isLoading } = useQuery({
        queryKey: ['enrollClass', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollClass?email=${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
    return [enrolledCls, isLoading]
};

export default useEnrolledCls;