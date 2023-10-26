import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Landing from "../intro/Landing";
import Home from "../home/Home";

const PrivateRoute = () => {
	const navigate = useNavigate();
	const email = localStorage.getItem("email");

	useEffect(() => {
		if (email) {
			Promise.resolve().then(() => {
				navigate("/");
			});
		}
	}, [email, navigate]);

	if (email) {
		return <Home />;
	}
	return <Landing />;
};

export default PrivateRoute;
