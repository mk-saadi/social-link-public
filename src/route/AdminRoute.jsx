import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const social_id = localStorage.getItem("social_id");
	const location = useLocation();
	const [role, setRole] = useState();

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/users")
			.then((res) => res.data)
			.then((data) => {
				const filteredUser = data.find((us) => us._id === social_id);
				const UserRole = filteredUser.role;
				// console.log("social_id", UserRole);

				setRole(UserRole);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [social_id]);

	console.log("role", role);

	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<span className="w-32 h-32 loading loading-spinner"></span>
				<p className="text-5xl">Please wait...</p>
			</div>
		);
	}

	if (!role) {
		// Redirect the user to the home "/" page if their role "admin" does not exist
		return (
			<Navigate
				state={{ from: location }}
				to="/"
				replace
			></Navigate>
		);
	}

	// Return the children component if the user who is logged in has role "admin"
	return children;
};

export default AdminRoute;
