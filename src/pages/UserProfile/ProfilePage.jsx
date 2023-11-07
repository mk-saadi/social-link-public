import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Box, Divider, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TopNavbar from "../../component/shared/TopNavbar";

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

	const [dominantColor, setDominantColor] = useState("");

	useEffect(() => {
		const imageUrl = user?.image;
		if (imageUrl) {
			const img = new Image();
			img.crossOrigin = "Anonymous";
			img.src = imageUrl;

			img.onload = function () {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, img.width, img.height);

				const imageData = ctx.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				).data;

				function isLightColor(r, g, b) {
					const brightness = (r * 299 + g * 587 + b * 114) / 1000;
					return brightness > 220; // Adjust the threshold for light colors
				}
				const colorCount = {};
				for (let i = 0; i < imageData.length; i += 4) {
					const hexColor = `#${(
						(1 << 24) +
						(imageData[i] << 16) +
						(imageData[i + 1] << 8) +
						imageData[i + 2]
					)
						.toString(16)
						.slice(1)}`;

					if (
						colorCount[hexColor] &&
						!isLightColor(
							imageData[i],
							imageData[i + 1],
							imageData[i + 2]
						) &&
						hexColor !== "#ffffff"
					) {
						colorCount[hexColor] += 1;
					} else if (
						!isLightColor(
							imageData[i],
							imageData[i + 1],
							imageData[i + 2]
						) &&
						hexColor !== "#ffffff"
					) {
						colorCount[hexColor] = 1;
					}
				}

				const dominantColorHex = Object.keys(colorCount).reduce(
					(a, b) => (colorCount[a] > colorCount[b] ? a : b)
				);

				setDominantColor(dominantColorHex);
			};
		}
	}, [user?.image]);

	return (
		<div className="min-h-screen">
			<div
				className="fixed top-0 w-full"
				style={{ zIndex: "999" }}
			>
				<TopNavbar />
			</div>
			<div className="relative container mx-auto pt-16">
				<div
					className="absolute rounded-t-lg top-0 h-40 lg:h-64 w-full"
					style={{
						backgroundColor: dominantColor,
					}}
				></div>
				<div className="flex flex-col md:flex-row justify-between mx-3 items-center">
					<div
						className=" flex flex-col md:flex-row justify-center items-center gap-4"
						style={{ zIndex: "9" }}
					>
						{/* <img
							className="xl:w-72 lg:w-64 w-36 xl:h-72 lg:h-52 h-40 object-cover drop-shadow-md rounded-full border-white lg:border-8 border-4"
							src={user?.image}
							alt=""
						/> */}
						<div className="flex justify-center items-center avatar w-full">
							<div className="xl:w-72 lg:w-64 w-44 xl:h-72 lg:h-52 h-4w-44 object-cover drop-shadow-md rounded-full border-white lg:border-8 border-4">
								<img
									src={user?.image}
									alt="users avatar"
								/>
							</div>
						</div>
						<div className="w-full">
							<h2 className="lg:text-4xl md:text-2xl md:text-left text-center text-xl font-bold text-white whitespace-nowrap">
								{user?.name}
							</h2>
							<div className="flex justify-center lg:justify-start items-center gap-4 font-semibold text-gray-400 mt-2 w-full">
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
						className="mt-3 w-full lg:w-fit"
						style={{ zIndex: "9" }}
					>
						{/**/}
						<div className=" flex justify-between md:flex-row flex-col items-center">
							<div className="grid grid-cols-2 lg:flex justify-end gap-4 lg:mt-0 mt-3 w-full">
								<button
									className="font-semibold normal-case text-lg border-0 py-1 rounded-md shadow-md lg:px-4"
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
									className="text-gray-600 font-semibold bg-white normal-case text-lg border-0 py-1 rounded-md shadow-md lg:px-4"
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
							<div className="flex lg:flex-row flex-col-reverse items-start gap-5">
								<div className="w-full flex flex-col gap-5 ">
									{posts?.map((post, index) => (
										<div key={index}>
											<div className="p-5 bg-white rounded-lg shadow-md">
												<div className="flex justify-between ">
													<div className="flex items-center gap-3">
														<img
															src={user?.image}
															className="w-12 h-12 rounded-full object-cover"
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
								<div className="lg:w-6/12 lg:block hidden rounded-lg shadow-md bg-white p-5">
									<div className="flex justify-between items-center mb-3">
										<h4 className="font-bold text-2xl">
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
							<div className="w-full rounded-lg shadow-md bg-white p-5">
								<div className="flex justify-between  items-center mb-3">
									<h4 className="font-bold text-2xl">
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
