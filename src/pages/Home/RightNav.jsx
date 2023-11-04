import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightNav = () => {
	const [users, setUsers] = useState([]);
	const userId = localStorage.getItem("social_id");
	const [followingState, setFollowingState] = useState({});
	const [exclude, setExclude] = useState([]);

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

			setFollowingState((prev) => ({
				...prev,
				[id]: true,
			}));
		} catch (error) {
			console.error("Error following user:", error);
		}
	};

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
		<div className="bg-white shadow-md rounded-lg w-[340px]">
			<div className="flex flex-col">
				<p className="text-xl font-semibold p-4 text-gray-600">
					People you may know
				</p>

				<div>
					{users
						.filter((user) => user._id !== userId) // exclude current user
						.filter((user) => !exclude.includes(user._id)) // exclude users the current user is already following
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
