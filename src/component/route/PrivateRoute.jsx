// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import Landing from "../intro/Landing";
// import Home from "../home/Home";

// const PrivateRoute = () => {
// 	const navigate = useNavigate();
// 	const email = localStorage.getItem("email");

// 	useEffect(() => {
// 		if (email) {
// 			Promise.resolve().then(() => {
// 				navigate("/");
// 			});
// 		}
// 	}, [email, navigate]);

// 	if (email) {
// 		return <Home />;
// 	}
// 	return <Landing />;
// };

// export default PrivateRoute;

import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const [loading, setLoading] = useState(true); // Initialize the loading state variable to true
	const email = localStorage.getItem("email");
	const location = useLocation();

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<span className='loading loading-ring h-32 w-32'></span>
			</div>
		);
	}

	if (!email) {
		// Redirect the user to the login page if their email address does not exist
		return (
			<Navigate
				state={{ from: location }}
				to='/login'
				replace
			></Navigate>
		);
	}

	// Return the children component if the user is logged in
	return children;
};

export default PrivateRoute;
