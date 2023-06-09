import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/login&reg/Login";
import Register from "../pages/login&reg/Register";
import Dashboard from "../layout/Dashboard";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {path: '/', element: <Home></Home>},
            {path: '/login', element: <Login></Login>},
            {path: '/register', element: <Register></Register>}
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
    }
])