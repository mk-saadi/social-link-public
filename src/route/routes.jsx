import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import UserProfile from "../pages/UserProfile/UserProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Landing from "../pages/UserProfile/UserProfile";
import ProfilePage from "../pages/UserProfile/ProfilePage";
import AdminRoute from "./AdminRoute";
import Admin from "../pages/adminDashboard/Admin";
import ViewPost from "../pages/Home/ViewPost";
import AllUsers from "../pages/allUsers/AllUsers";
import AllBlogs from "../pages/blogs/AllBlogs";
import Blog from "../pages/blogs/Blogs";

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
				// loader: () => fetch("http://localhost:7000/totalPosts"),
			},
			{
				path: "/profile",
				element: <UserProfile />,
			},
			{
				path: "/allUsers",
				element: <AllUsers />,
			},
			{
				path: "/allBlogs",
				element: <AllBlogs />,
			},
			{
				path: "/blog/:title",
				element: <Blog />,
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
	{
		path: "/viewPost/:id",
		element: (
			<PrivateRoute>
				<ViewPost />
			</PrivateRoute>
		),
	},
	{
		path: "/admin",
		element: (
			<AdminRoute>
				<Admin />
			</AdminRoute>
		),
	},
]);

export default router;
