import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	// const navigate = useNavigate();

	const { userName } = useParams();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`https://social-link-server-liard.vercel.app/users/${userName}`
				);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching post:", error);
			}
		};

		fetchUser();
	}, [userName]);

	return (
		<div className="h-screen">
			<p>user profile page here</p>
		</div>
	);
};

export default ProfilePage;
