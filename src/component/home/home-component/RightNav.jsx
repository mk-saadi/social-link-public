import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightNav = () => {
	const [users, setUsers] = useState([]);
	const userId = localStorage.getItem("social_id");

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
		};
		fetchUsers();
	}, []);

	const matchedUser = users.find((user) => user?._id === userId);

	const randomUsers = users
		.filter((user) => user._id !== userId)
		.sort(() => Math.random() - 0.5)
		.slice(0, 5);

	// const handleFollow = async (followedUserId) => {
	// 	console.log("followedUserId", followedUserId);
	// 	try {
	// 		await axios.patch(`http://localhost:7000/users/${userId}`, {
	// 			followedUserId,
	// 		});
	// 		console.log(
	// 			`User with ID ${userId} followed user with ID ${followedUserId}`
	// 		);
	// 		// Fetch the users again to update the state after following
	// 		const updatedUsers = await getUsers();
	// 		setUsers(updatedUsers);
	// 	} catch (error) {
	// 		console.error("Error following user:", error);
	// 	}
	// };
	// const handleFollow = async (followedUserId) => {
	// 	console.log(followedUserId);
	// 	try {
	// 		const response = await axios.patch(
	// 			`http://localhost:7000/users/${userId}`,
	// 			{ followedUserId }
	// 		);

	// 		console.log(userId);

	// 		console.log(response.data); // You can handle the response as needed
	// 	} catch (error) {
	// 		console.error("Error following user:", error);
	// 	}
	// };

	const handleFollow = (userId) => {
		axios
			.patch(`http://localhost:7000/users/follow/${userId}`, {
				// user: {
				// 	follow: user.displayName,
				// },
			})
			.then(() => {
				// Update the like count in the state
				// setClickedButtons((prevState) => ({
				// 	...prevState,
				// 	[postId]: true,
				// }));
				// // Update the like count in the state
				// setAPostLikeTrigger(!aPostLikeTrigger);

				console.log("successful");
			})
			.catch((error) => {
				console.error("Error incrementing likes:", error);
			});
	};

	return (
		<div className="pt-10">
			<div className="flex gap-4 items-center">
				{matchedUser && (
					<>
						<img
							className="w-14 rounded-full"
							src={matchedUser?.image || ""}
							alt="person"
						/>
						<div>
							<h1 className="text-xl font-bold text-gray-500">
								{matchedUser?.name}
							</h1>
						</div>
					</>
				)}
			</div>

			<p className="text-xl font-bold py-6 text-gray-700">
				People you may know
			</p>

			<div>
				{randomUsers
					.filter((user) => user._id !== userId)
					.map((user) => (
						<div
							key={user._id}
							className="flex justify-between gap-2 items-center mx-5 text-lg font-semibold"
						>
							<Link className="flex justify-center items-center gap-3 my-2">
								<div className="avatar">
									<div className="w-14 rounded-full object-cover">
										<img
											src={user?.image || ""}
											alt="person"
										/>
									</div>
								</div>
								<h1 className="text-gray-700 hover:underline">
									{user?.name}
								</h1>
							</Link>
							<div
								className="text-[#32308E] font-semibold hover:underline cursor-pointer"
								onClick={() => handleFollow(user?._id)}
							>
								<p>Follow</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default RightNav;
