import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import UserProfile from "../pages/UserProfile/UserProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Landing from "../pages/UserProfile/UserProfile";
import ProfilePage from "../pages/UserProfile/ProfilePage";

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
	{
		path: "/profilePage/:userName",
		element: (
			<PrivateRoute>
				<ProfilePage />
			</PrivateRoute>
		),
	},
]);

export default router;
