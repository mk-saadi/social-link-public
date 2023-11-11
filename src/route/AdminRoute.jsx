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
				const userRole = filteredUser?.role;
				setRole(userRole);
				setLoading(false); // Move the setLoading state update inside the promise chain
			})
			.catch((err) => {
				console.log(err.message);
				setLoading(false); // Ensure to set loading state in the catch block as well
			});
	}, [social_id]);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<span className="w-32 h-32 loading loading-spinner"></span>
				<p className="text-5xl">Please wait...</p>
			</div>
		);
	}

	if (!role || role !== "admin") {
		return (
			<Navigate
				state={{ from: location }}
				to="/"
				replace
			/>
		);
	}

	return children;
};

export default AdminRoute;
