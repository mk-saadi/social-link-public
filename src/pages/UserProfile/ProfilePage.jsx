import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Box, Divider, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TopNavbar from "../../component/shared/TopNavbar";
import { DominantColorContext } from "../../hook/DominantColorProvider";

const ProfilePage = () => {
	const [user, setUser] = useState([]);
	const [users, setUsers] = useState([]);

	const [value, setValue] = React.useState("1");
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [follow, setFollow] = useState([]);
	const [following, setFollowing] = useState([]);
	const [followingState, setFollowingState] = useState({});
	const [indeedFollow, setIndeedFollow] = useState([]);
	const { dominantColor } = useContext(DominantColorContext);

	const [newFollow, setNewFollow] = useState(0);

	const userId = localStorage.getItem("social_id");

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

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				console.log("data", data);
				const filteredAndMappedPosts = data
					.filter((post) => post.uploaderId == user?._id)
					.map((post) => ({
						...post,
						timeDifference: getTimeDifference(post.createdAt),
					}));

				setPosts(filteredAndMappedPosts);
				setLoading(false);
				console.log(filteredAndMappedPosts);
				// setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [user._id]);

	function getTimeDifference(timestamp) {
		const now = new Date();
		const createdTime = new Date(timestamp);
		const timeDifference = now - createdTime;
		const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
		const minutesDifference = Math.floor(
			(timeDifference % (60 * 60 * 1000)) / (60 * 1000)
		);

		if (hoursDifference >= 24) {
			const daysDifference = Math.floor(hoursDifference / 24);
			return `${daysDifference} days ago`;
		} else if (hoursDifference > 0) {
			return `${hoursDifference} hours ago`;
		} else if (minutesDifference > 0) {
			return `${minutesDifference} minutes ago`;
		} else {
			return "just now";
		}
	}

	// tabs
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// >> follow and following and users api
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

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/follow")
			.then((res) => res.data)
			.then((data) => {
				const filteredAndMappedPosts = data.filter(
					(fol) => fol?.followerId === user?._id
				);
				setFollow(filteredAndMappedPosts);

				const followers = data.filter((item) =>
					item?.followingIds?.includes(user?._id)
				);

				const doesFollow = data.find((re) => re?.followerId === userId);
				setIndeedFollow(doesFollow.followingIds);

				setFollowing(followers);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [user?._id, userId]);
	console.log("indeedFollow", indeedFollow);

	const getFollowerCount = (following) => {
		const followerIds = following.map((fo) => fo?.followerId);
		const uniqueFollowerIds = new Set(followerIds);
		return uniqueFollowerIds.size + newFollow;
	};

	// >> follow the user
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
			console.log("successfully following");
			setNewFollow((prev) => prev + 1);
			setFollowingState((prev) => ({
				...prev,
				[id]: true,
			}));
		} catch (error) {
			console.error("Error following user:", error);
		}
	};

	// console.log(users.find((us) => us._id === userId));

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/savePost")
			.then((res) => res.data)
			.then((data) => {
				console.log("data", data);

				// setFollowing(followers);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<div className="min-h-screen">
			<div
				className="fixed top-0 w-full"
				style={{ zIndex: "999" }}
			>
				<TopNavbar />
			</div>
			<div className="relative pt-16 mx-auto">
				<div
					className="absolute top-0 w-full h-40 rounded-t-lg lg:h-64"
					style={{
						backgroundColor: dominantColor,
					}}
				></div>
				<div className="flex flex-col items-center justify-between mx-3 md:flex-row">
					<div
						className="flex flex-col items-center justify-center gap-4 md:flex-row"
						style={{ zIndex: "9" }}
					>
						{/* <img
							className="object-cover h-40 border-4 border-white rounded-full xl:w-72 lg:w-64 w-36 xl:h-72 lg:h-52 drop-shadow-md lg:border-8"
							src={user?.image}
							alt=""
						/> */}
						<div className="flex items-center justify-center w-full avatar">
							<div className="object-cover h-auto border-4 border-white rounded-full xl:w-72 lg:w-64 w-44 drop-shadow-md lg:border-8">
								<img
									src={user?.image}
									alt="users avatar"
								/>
							</div>
						</div>
						<div className="w-full md:mb-2">
							<div className="flex flex-col items-center justify-start md:items-start">
								<h2 className="text-2xl font-bold text-center text-gray-600 md:text-white lg:text-4xl md:text-2xl md:text-left whitespace-nowrap">
									{user?.name}
								</h2>
								<p className="text-lg text-gray-400 md:text-gray-200">
									@{user?.userName}
								</p>
							</div>
							<div className="flex items-center justify-center w-full gap-4 mt-1 font-semibold text-gray-400 md:text-gray-200 lg:justify-start">
								<p>Followers - {getFollowerCount(following)}</p>
								<p>
									Following -{" "}
									{follow.map(
										(fo) => fo?.followingIds.length
									)}
								</p>
							</div>
						</div>
					</div>
					{/* 2xl:w-[78%] xl:w-[940px] lg:w-9/12 md:w-9/12 ml-auto lg:mt-5 md:mt-5 */}
					<div
						className="w-full mt-3 lg:w-fit"
						style={{ zIndex: "9" }}
					>
						{/**/}
						<div className="flex flex-col items-center justify-between md:flex-row">
							<div className="grid justify-end w-full grid-cols-2 gap-4 mt-3 lg:flex lg:mt-0">
								<button
									className="py-1 text-lg font-semibold normal-case border-0 rounded-md shadow-md lg:px-4"
									onClick={() => handleFollow(user?._id)}
									style={{
										backgroundColor: indeedFollow.includes(
											user?._id
										)
											? "#FFFFFF"
											: "#32308E",
										color: indeedFollow.includes(user?._id)
											? "#32308E"
											: "#FFFFFF",
										display:
											user?._id === userId
												? "none"
												: "block",
									}}
								>
									{indeedFollow.includes(user?._id)
										? "Following"
										: "Follow"}
								</button>

								<button
									className="py-1 text-lg font-semibold text-gray-600 normal-case bg-white border-0 rounded-md shadow-md lg:px-4"
									style={{
										display:
											user?._id === userId
												? "none"
												: "block",
									}}
								>
									<TextsmsIcon /> Message
								</button>
							</div>
						</div>
					</div>
				</div>
				<Divider
					sx={{
						mt: {
							lg: "80px",
							md: "50px",
							sm: "50px",
							xs: "40px",
						},
					}}
				/>
				<Box sx={{ width: "100%", typography: "body1" }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList
								onChange={handleChange}
								aria-label="lab API tabs example"
							>
								<Tab
									label="Posts"
									value="1"
								/>
								<Tab
									label="About"
									value="2"
								/>
								<Tab
									label="Photos"
									value="3"
								/>
							</TabList>
						</Box>
						<TabPanel value="1">
							<div className="flex flex-col-reverse items-start gap-5 lg:flex-row">
								<div className="flex flex-col w-full gap-5 ">
									{posts?.map((post, index) => (
										<div key={index}>
											<div className="p-5 bg-white rounded-lg shadow-md">
												<div className="flex justify-between ">
													<div className="flex items-center gap-3">
														<img
															src={user?.image}
															className="object-cover w-12 h-12 rounded-full"
															alt=""
														/>
														<div>
															<h3 className="font-bold">
																{user?.name}
															</h3>
															<p>
																{
																	post?.timeDifference
																}
															</p>
														</div>
													</div>
													<MoreHorizIcon />
												</div>
												<div className="mt-5">
													<p>{post?.name}</p>
													<div className="mt-5">
														<img
															src={post?.image}
															className="w-full"
															alt=""
														/>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
								<div className="hidden p-5 bg-white rounded-lg shadow-md lg:w-6/12 lg:block">
									<div className="flex items-center justify-between mb-3">
										<h4 className="text-2xl font-bold">
											Photos
										</h4>
										<Link className="text-[#6A67FF]">
											See More
										</Link>
									</div>
									<div className="grid grid-cols-2 gap-2 rounded-lg">
										{posts?.map((post, index) => (
											<div key={index}>
												<img
													src={post?.image}
													className="w-full"
													alt=""
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</TabPanel>
						<TabPanel value="2">About</TabPanel>
						<TabPanel value="3">
							<div className="w-full p-5 bg-white rounded-lg shadow-md">
								<div className="flex items-center justify-between mb-3">
									<h4 className="text-2xl font-bold">
										Photos
									</h4>
									<Link className="text-[#6A67FF]">
										See More
									</Link>
								</div>
								<div className="grid grid-cols-3 gap-5 rounded-lg">
									{posts?.map((post, index) => (
										<div key={index}>
											<img
												src={post?.image}
												className="w-full"
												alt=""
											/>
										</div>
									))}
								</div>
							</div>
						</TabPanel>
					</TabContext>
				</Box>
			</div>
		</div>
	);
};

export default ProfilePage;
