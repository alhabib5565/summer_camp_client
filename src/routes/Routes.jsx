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
import AddClass from "../dashboard/instructors/AddClass";
import MyClass from "../dashboard/instructors/MyClass";
import UpdateClass from "../components/UpdateClass";
import Instructors from "../pages/allinstructor/Instructors";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import Classes from "../pages/AllClass/Classes";
import ManageClass from "../dashboard/admin/ManageClass";
import ClassDetails from "../pages/AllClass/ClassDetails";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/login', element: <Login></Login> },
            { path: '/register', element: <Register></Register> },
            {path: '/instructor', element: <Instructors></Instructors>},
            {path: 'allClass', element: <Classes></Classes>},
            {path: 'class/:id', element: <ClassDetails/>}
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
            {path: 'adminHome', element: <AdminRoute><AdminHome></AdminHome></AdminRoute>},
            {path: 'manageUser', element: <AdminRoute> <ManageUser></ManageUser></AdminRoute>},
            {path: 'manageClass', element: <AdminRoute><ManageClass></ManageClass></AdminRoute>},
            //instructors related route
            {path: 'addClass', element: <AddClass></AddClass>},
            {path: 'myClass', element: <InstructorRoute><MyClass></MyClass></InstructorRoute>},
            {path: 'updateClass/:id', element: <UpdateClass></UpdateClass>}
        ]
    }
])