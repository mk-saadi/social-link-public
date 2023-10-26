import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./component/admin/Admin";
import Home from "./component/home/Home";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import PrivateRoute from "./component/route/PrivateRoute";
import Landing from "./component/intro/Landing";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<Admin />
			</PrivateRoute>
		),
		children: [
			{
				path: "/home",
				element: <Home />,
			},
		],
	},
	{
		path: "/landing",
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
