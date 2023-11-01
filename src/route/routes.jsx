import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import Home from "../pages/Home/Home/Home";
import Main from '../Layout/Main'
import UserProfile from "../pages/UserProfile/UserProfile";
import Login from '../pages/Login'
import Register from '../pages/Register'
import Landing from '../pages/UserProfile/UserProfile'



const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Main />
            </PrivateRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/profile",
                element: <UserProfile />,
            },
        ],
    },
    {
        path: "/welcomeToSocialLink",
        element: <Landing />,
    },

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router