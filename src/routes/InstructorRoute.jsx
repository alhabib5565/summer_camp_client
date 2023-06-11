import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { Bars } from "react-loader-spinner";
import { useContext } from "react";
import useInstructor from "../hooks/useInstructor";


const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <div className="flex justify-center items-center">
        <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />;
    </div>
    }
    console.log(isInstructor)

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorRoute;