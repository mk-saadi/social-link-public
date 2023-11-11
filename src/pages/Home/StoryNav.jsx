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

	// console.log("userInfos", userInfos);

	// useEffect(()=>{
	// 	axios.get("https://social-link-server-liard.vercel.app/story")
	// 		.then(res=>{
	// 			console.log(res);
	// 		});
	// },[])

	const handleStory = (event) => {
		event.preventDefault();

		const form = event.target;
		const image = form.image.value;

		// after selecting the image show an image preview
		// first compress image to less than 600kb then post it to imgbb then send it to mongodb using this url: https://social-link-server-liard.vercel.app/story
		// use axios.post for this operation
	};

	return (
		<div>
			<div>
				<form onClick={handleStory}>
					<input
						type="file"
						name="image"
						accept="image/*"
						placeholder="Photo"
						className="w-full max-w-xs bg-transparent rounded file-input file-input-ghost focus:bg-transparent focus:outline-none"
					/>
					<input
						type="text"
						placeholder="write caption"
					/>
				</form>
			</div>
		</div>
	);
};

export default StoryNav;
