import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DominantColorContext } from "../../hook/DominantColorProvider";
import Toast from "../../hook/Toast";
import useToast from "../../hook/useToast";

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const userId = localStorage.getItem("social_id");
	const [followingState, setFollowingState] = useState({});
	const [exclude, setExclude] = useState([]);
	const [include, setInclude] = useState([]);
	const [followers, setFollowers] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);
	const [indeedFollow, setIndeedFollow] = useState([]);
	const { toastType, toastMessage, showToast, hideToast } = useToast();
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
			// setIsLoading(false);
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
			if (response.data.success) {
				showToast("success", "Following!");

				// Find the followed user
				const followedUser = users.find((user) => user._id === id);

				// Add the followed user to the include state
				setInclude((prev) => [...prev, followedUser]);
			}

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
				const exclude = res.data.find(
					(re) => re?.followerId === userId
				);
				const followingId = exclude?.followingIds;
				setExclude(followingId);

				const data = res.data;

				const followingIds = data.find(
					(follow) => follow?.followerId === userId
				)?.followingIds;

				const followingUserDetails = users.filter((user) =>
					followingIds.includes(user._id)
				);

				setInclude(followingUserDetails);

				const followers = data.filter((item) =>
					item?.followingIds?.includes(userId)
				);

				const followerId = followers.map((foll) => foll.followerId); // all follower ids are in here

				const followerDetails = users.filter((user) =>
					followerId.includes(user._id)
				);
				console.log("followerDetails", followerDetails);
				setFollowers(followerDetails);

				const doesFollow = data.find((re) => re?.followerId === userId);
				setIndeedFollow(doesFollow.followingIds);
			});
	}, [userId, users]);

	// console.log("include", include);

	const handleUnfollow = (unfollowId) => {
		showToast("loading", `Please wait!`);

		axios
			.delete(`https://social-link-server-liard.vercel.app/follow`, {
				data: { followerId: userId, unfollowId: unfollowId },
			})
			.then((response) => {
				if (response.data.success) {
					setInclude(
						include.filter((user) => user._id !== unfollowId)
					);

					showToast("success", "Unfollow successful!");
				}
			})
			.catch((err) => {
				console.log(err.message);
				showToast("error", "Unfollow unsuccessful!");
			});
	};

	return (
		<div className="min-h-screen mx-auto overflow-x-hidden xl:w-11/12">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<div className="grid grid-cols-8">
				<div className="hidden xl:col-span-2 xl:block"></div>

				<div className=" col-span-8 lg:col-span-5 xl:col-span-4 mt-[70px] ">
					<p className="p-2 text-xl font-semibold text-gray-600 ">
						Following {include.length}
					</p>
					<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px] mb-2" />

					<div className="grid grid-cols-2 gap-4 mx-4 md:grid-cols-3 md:mx-0">
						{include.map((inc) => (
							<div
								key={inc._id}
								className="relative bg-white border-t border-gray-200 rounded-md shadow-md drop-shadow"
							>
								<div className="min-h-[320px]">
									<Link
										to={`/profilePage/${inc?.userName}`}
										className="w-full avatar"
									>
										<div className="object-cover w-full rounded-md shadow-md h-28 drop-shadow-sm">
											<img
												src={inc?.image}
												alt="person"
											/>
										</div>
									</Link>
									<div className="p-2 text-start">
										<p className="text-xl font-semibold text-gray-600">
											{inc.name}
										</p>
										<p className="text-xs font-semibold text-gray-400">
											@{inc?.userName}
										</p>
									</div>
								</div>
								<div className="absolute bottom-0 grid w-full">
									<button
										className="p-2 m-2 font-semibold text-center text-white rounded-md shadow-md"
										to={`/profilePage/${inc?.userName}`}
										style={{
											backgroundColor: dominantColor,
										}}
									>
										View Profile
									</button>
									<button
										className="text-gray-600 bg-[#e5e7eb] p-2 mx-2 mb-2 cursor-pointer font-semibold duration-300 rounded-md shadow-md"
										onClick={() => handleUnfollow(inc._id)}
									>
										Unfollow
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="my-8">
						<p className="p-2 text-xl font-semibold text-gray-600 ">
							Following you {followers.length}
						</p>
						<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px] mb-2" />
						<div className="grid grid-cols-2 gap-4 mx-4 md:grid-cols-3 md:mx-0">
							{followers.map((user) => (
								<div
									key={user._id}
									className="relative bg-white border-t border-gray-200 rounded-md shadow-md drop-shadow"
								>
									<div className="min-h-[320px]">
										<Link
											to={`/profilePage/${user?.userName}`}
											className="w-full avatar"
										>
											<div className="object-cover w-full rounded-md shadow-md h-28 drop-shadow-sm">
												<img
													src={user?.image}
													alt="person"
												/>
											</div>
										</Link>
										<div className="p-2 text-start">
											<p className="text-xl font-semibold text-gray-600">
												{user.name}
											</p>
											<p className="text-xs font-semibold text-gray-400">
												@{user?.userName}
											</p>
										</div>
									</div>
									<div className="absolute bottom-0 grid w-full">
										<div
											className="flex items-center justify-center p-2 m-2 font-semibold rounded-md shadow-md"
											style={{
												backgroundColor:
													indeedFollow.includes(
														user?._id
													)
														? "#e5e7eb"
														: dominantColor,
												color: indeedFollow.includes(
													user?._id
												)
													? dominantColor
													: "#e5e7eb",
												// display:
												// 	user?._id === userId
												// 		? "none"
												// 		: "block",
												textShadow:
													"1px 1px rgba(0, 0, 0, 0.192)",
											}}
										>
											{indeedFollow.includes(
												user?._id
											) ? (
												<button className="flex items-center justify-center gap-2 text-gray-600 ">
													<RiUserFollowFill className="text-3xl opacity-80" />{" "}
													Following
												</button>
											) : (
												<button
													className="flex items-center justify-center gap-2 text-white "
													onClick={() =>
														handleFollow(user?._id)
													}
												>
													<MdAddCircle className="text-3xl opacity-80" />{" "}
													Follow
												</button>
											)}
										</div>
										<button
											className="text-gray-600 bg-[#e5e7eb] p-2 mx-2 mb-2 cursor-pointer font-semibold duration-300 rounded-md shadow-md"
											to={`/profilePage/${user?.userName}`}
										>
											View Profile
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="my-8">
						<p className="p-2 text-xl font-semibold text-gray-600 ">
							People you may know
						</p>
						<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px] mb-2" />
						<div className="grid grid-cols-2 gap-4 mx-4 md:grid-cols-3 md:mx-0">
							{users
								.filter((user) => user._id !== userId) // exclude current user
								.filter((user) => !exclude?.includes(user?._id)) // exclude users the current user is already following
								.reverse() // reverse the array to get the latest users first
								.map((user) => (
									<div
										key={user._id}
										className="relative bg-white border-t border-gray-200 rounded-md shadow-md drop-shadow"
									>
										<div className="min-h-[320px]">
											<Link
												to={`/profilePage/${user?.userName}`}
												className="w-full avatar"
											>
												<div className="object-cover w-full rounded-md shadow-md h-28 drop-shadow-sm">
													<img
														src={user?.image}
														alt="person"
													/>
												</div>
											</Link>
											<div className="p-2 text-start">
												<p className="text-xl font-semibold text-gray-600">
													{user.name}
												</p>
												<p className="text-xs font-semibold text-gray-400">
													@{user?.userName}
												</p>
											</div>
										</div>
										<div className="absolute bottom-0 grid w-full">
											<div
												className="flex items-center justify-center p-2 m-2 font-semibold text-white rounded-md shadow-md"
												style={{
													backgroundColor:
														dominantColor,
												}}
											>
												{followingState[user?._id] ? (
													<button className="flex items-center justify-center gap-2">
														<RiUserFollowFill className="text-3xl opacity-80" />{" "}
														Following
													</button>
												) : (
													<button
														className="flex items-center justify-center gap-2"
														onClick={() =>
															handleFollow(
																user?._id
															)
														}
													>
														<MdAddCircle className="text-3xl opacity-80" />{" "}
														Follow
													</button>
												)}
											</div>
											<button
												className="text-gray-600 bg-[#e5e7eb] p-2 mx-2 mb-2 cursor-pointer font-semibold duration-300 rounded-md shadow-md"
												to={`/profilePage/${user?.userName}`}
											>
												View Profile
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="hidden xl:col-span-2 xl:block"></div>
			</div>
		</div>
	);
};

export default AllUsers;
