import axios from "axios";
import { useEffect, useState } from "react";

const StoryNav = () => {
	// const [isLoading, setIsLoading] = useState(true);
	const userId = localStorage.getItem("social_id");
	const [userInfos, setUserInfos] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usersResponse = await axios.get(
					"https://social-link-server-liard.vercel.app/users"
				);
				const followResponse = await axios.get(
					"https://social-link-server-liard.vercel.app/follow"
				);

				const users = usersResponse.data;
				const followingData = followResponse.data.find(
					(data) => data.followerId === userId
				);
				const followingIds = followingData?.followingIds || [];

				const followedUsers = users.filter((user) =>
					followingIds.includes(user._id)
				);
				setUserInfos(followedUsers);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, [userId]);

	console.log("userInfos", userInfos);

	return (
		<div>
			<p>story navbar here</p>
		</div>
	);
};

export default StoryNav;
