// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import Landing from "../intro/Landing";
// import Home from "../home/Home";

// const PrivateRoute = () => {
// 	const navigate = useNavigate();
// 	const social_id = localStorage.getItem("social_id");

// 	useEffect(() => {
// 		if (social_id) {
// 			Promise.resolve().then(() => {
// 				navigate("/");
// 			});
// 		}
// 	}, [social_id, navigate]);

// 	if (social_id) {
// 		return <Home />;
// 	}
// 	return <Landing />;
// };

// export default PrivateRoute;

import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const [loading, setLoading] = useState(true); // Initialize the loading state variable to true
	const social_id = localStorage.getItem("social_id");
	const location = useLocation();
	console.log("social_id", social_id);

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<span className="loading loading-spinner h-32 w-32"></span>
				<p className="text-5xl">Please wait...</p>
			</div>
		);
	}

	if (!social_id) {
		// Redirect the user to the login page if their social_id address does not exist
		return (
			<Navigate
				state={{ from: location }}
				to="/login"
				replace
			></Navigate>
		);
	}

	// Return the children component if the user is logged in
	return children;
};

export default PrivateRoute;
