import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/home/Home";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import PrivateRoute from "./component/route/PrivateRoute";
import Landing from "./component/intro/Landing";
import UserProfile from "./component/home/userprofile/userprofile";
import Layout from "./component/admin/Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Layout />
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

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
