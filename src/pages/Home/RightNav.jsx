import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightNav = () => {
	const [users, setUsers] = useState([]);
	const userId = localStorage.getItem("social_id");
	const [followingState, setFollowingState] = useState({});

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

	const handleFollow = async (id) => {
		const followData = {
			followerId: userId,
			followingIds: [id],
		};

		try {
			const response = await axios.post(
				"https://social-link-server-liard.vercel.app/follow",
				followData
			);

			console.log("follow successful:", response);

			setFollowingState((prev) => ({
				...prev,
				[id]: true,
			}));
			// const users = users.filter(
			// 	(user) => !followingIds.includes(user._id)
			// );

			// // Set the users state variable to the filtered list of users.
			// setUsers(users);
		} catch (error) {
			console.error("Error following user:", error);
		}
	};

	return (
		<div className="bg-white shadow-md rounded-lg w-[340px]">
			<div className="flex flex-col">
				<p className="text-xl font-bold p-4 text-gray-600">
					People you may know
				</p>

				<div>
					{users
						.filter((user) => user._id !== userId) // Exclude current user
						.map((user) => (
							<div
								key={user._id}
								className="flex justify-between gap-2 items-center mx-4 text-base font-semibold"
							>
								<Link
									className="flex justify-center items-center gap-3 my-2"
									to={`/profilePage/${user?.userName}`}
								>
									<div className="avatar">
										<div className="w-14 rounded-full object-cover">
											<img
												src={user?.image || ""}
												alt="person"
											/>
										</div>
									</div>
									<div>
										<p className="text-gray-600 hover:underline">
											{user?.name}
										</p>
										<p className="text-sm text-gray-500 font-semibold">
											{user?.userName}
										</p>
									</div>
								</Link>
								<div
									className="text-[#32308E] font-semibold hover:underline cursor-pointer"
									onClick={() => handleFollow(user?._id)}
								>
									{followingState[user?._id]
										? "Following"
										: "Follow"}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default RightNav;

{
	/* <div className="flex gap-4 items-center">
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
			</div> */
}
