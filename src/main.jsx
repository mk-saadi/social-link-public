import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./route/routes";
// import Home from "./component/home/Home";
// import Login from "./component/auth/Login";
// import Register from "./component/auth/Register";
// import PrivateRoute from "./component/route/PrivateRoute";
// import Landing from "./component/intro/Landing";
// import UserProfile from "./component/home/userprofile/userprofile";
// import Layout from "./component/admin/Layout";



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
