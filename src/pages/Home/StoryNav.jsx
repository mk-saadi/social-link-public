import axios from "axios";
import { useEffect, useState } from "react";

const StoryNav = () => {
	const [users, setUsers] = useState([]);
	const userId = localStorage.getItem("social_id");
	const [followingState, setFollowingState] = useState({});
	const [exclude, setExclude] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getUsers = async () => {
		const response = await axios.get(
			"https://social-link-server-liard.vercel.app/users"
		);
		return response.data;
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users);
			setIsLoading(false);
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/follow")
			.then((res) => {
				const exclude = res.data.find((re) => re.followerId === userId);
				const followingId = exclude?.followingIds;
				setExclude(followingId);
			});
	}, [userId]);

	return (
		<div>
			<p>story navbar here</p>
		</div>
	);
};

export default StoryNav;
