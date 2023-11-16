import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdAddCircle, MdMore } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DominantColorContext } from "../../hook/DominantColorProvider";

const RightNav = ({ updateFollowingCount, postCount }) => {
	const [users, setUsers] = useState([]);
	const userId = localStorage.getItem("social_id");
	const [followingState, setFollowingState] = useState({});
	const [exclude, setExclude] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { dominantColor } = useContext(DominantColorContext);

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

			updateFollowingCount((prevCount) => prevCount + 1);
		} catch (error) {
			console.error("Error following user:", error);
		}
	};

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/follow")
			.then((res) => {
				const exclude = res.data.find(
					(re) => re?.followerId === userId
				);
				const followingId = exclude?.followingIds;
				setExclude(followingId);
			});
	}, [userId]);

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	const formatText = (text, maxLength) => {
		if (text.length > maxLength) {
			return `${text.substring(0, maxLength)}...`;
		}
		return text;
	};

	return (
		<div className="bg-white  shadow-md drop-shadow rounded-md w-full xl:w-[340px] ">
			<div className="flex flex-col">
				<p className="p-2 text-lg font-semibold text-gray-600">
					People you may know
				</p>

				<div>
					{isLoading ? ( // Check loading state to show loading indicator
						<div className="container">
							<div className="post">
								<div className="avatar"></div>
								<div className="line"></div>
								<div className="line"></div>
							</div>
							<div className="post">
								<div className="avatar"></div>
								<div className="line"></div>
								<div className="line"></div>
							</div>
							<div className="post">
								<div className="avatar"></div>
								<div className="line"></div>
								<div className="line"></div>
							</div>
							<div className="post">
								<div className="avatar"></div>
								<div className="line"></div>
								<div className="line"></div>
							</div>
							<div className="post">
								<div className="avatar"></div>
								<div className="line"></div>
								<div className="line"></div>
							</div>
						</div>
					) : (
						<>
							{users
								.filter((user) => user._id !== userId) // exclude current user
								.filter((user) => !exclude?.includes(user?._id)) // exclude users the current user is already following
								.reverse() // reverse the array to get the latest users first
								.slice(0, 5) // get only the latest 5 users
								.map((user) => (
									<div
										key={user._id}
										className="flex items-center justify-between gap-2 mx-4 text-base font-semibold"
									>
										<Link
											className="flex items-center justify-center gap-3 my-2"
											to={`/profilePage/${user?.userName}`}
										>
											<div className="avatar">
												<div className="object-cover rounded-full w-14">
													<img
														src={user?.image || ""}
														alt="person"
													/>
												</div>
											</div>
											<div>
												<p className="font-sans text-sm text-gray-600 hover:underline">
													{formatText(user?.name, 14)}
												</p>
												<p className="hidden text-xs font-semibold text-gray-400 lg:block">
													@
													{formatText(
														user?.userName,
														14
													)}
												</p>
											</div>
										</Link>
										<div
											className="cursor-pointer"
											onClick={() =>
												handleFollow(user?._id)
											}
										>
											{followingState[user?._id] ? (
												<RiUserFollowFill
													className="text-3xl opacity-80"
													style={{
														color: dominantColor,
													}}
												/>
											) : (
												<MdAddCircle
													className="text-3xl opacity-80"
													style={{
														color: dominantColor,
													}}
												/>
											)}
										</div>
									</div>
								))}
						</>
					)}
				</div>
				<Link
					to="/allUsers"
					className="p-2 text-base font-semibold text-center text-white rounded-b-md"
					style={{ backgroundColor: dominantColor }}
				>
					<p className="flex items-center justify-center gap-3 cursor-pointer">
						Show more <MdMore className="text-2xl" />
					</p>
				</Link>
			</div>
		</div>
	);
};

export default RightNav;
