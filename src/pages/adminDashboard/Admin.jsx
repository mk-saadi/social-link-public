import axios from "axios";
import { useEffect, useState } from "react";

const Admin = () => {
	const [user, setUser] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const social_id = localStorage.getItem("social_id");

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/users")
			.then((res) => res.data)
			.then((data) => {
				const filteredUser = data.find((us) => us._id === social_id);
				setUsers(data);
				setUser(filteredUser);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [social_id]);

	return (
		<div>
			<p>admin dashboard</p>
		</div>
	);
};

export default Admin;
