import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/login&reg/Login";
import Register from "../pages/login&reg/Register";
import Dashboard from "../layout/Dashboard";
import UserHome from "../dashboard/user/UserHome";
import SelectedClass from "../dashboard/user/SelectedClass";
import Payment from "../dashboard/user/Payment";
import EnroledClass from "../dashboard/user/EnroledClass";
import AdminHome from "../dashboard/admin/AdminHome";
import ManageUser from "../dashboard/admin/ManageUser";
import ManageClass from "../dashboard/admin/manageClass";
import AddClass from "../dashboard/instructors/AddClass";
import MyClass from "../dashboard/instructors/MyClass";
import UpdateClass from "../components/UpdateClass";
import Instructors from "../pages/allinstructor/Instructors";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/login', element: <Login></Login> },
            { path: '/register', element: <Register></Register> },
            {path: '/instructor', element: <Instructors></Instructors>}
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // user related
            { path: 'userHome', element: <UserHome></UserHome> },
            { path: 'selectedClass', element: <SelectedClass></SelectedClass>},
            {path: 'payment', element: <Payment></Payment>},
            {path: 'enrolled', element: <EnroledClass></EnroledClass>},
            //admin related
            {path: 'adminHome', element: <AdminHome></AdminHome>},
            {path: 'manageUser', element: <ManageUser></ManageUser>},
            {path: 'manageClass', element: <ManageClass></ManageClass>},
            //instructors related route
            {path: 'addClass', element: <AddClass></AddClass>},
            {path: 'myClass', element: <MyClass></MyClass>},
            {path: 'updateClass/:id', element: <UpdateClass></UpdateClass>}
        ]
    }
])