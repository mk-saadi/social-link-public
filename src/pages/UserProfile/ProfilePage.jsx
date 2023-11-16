import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { Box, Divider, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TopNavbar from "../../component/shared/TopNavbar";
import { DominantColorContext } from "../../hook/DominantColorProvider";
import FriendCom from "./FriendCom";
import { MdDelete } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import PostContent from "../../hook/PostContent";
import { BsArrowThroughHeartFill, BsJournalBookmarkFill } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { SiAdblock } from "react-icons/si";
import { RiUserUnfollowFill } from "react-icons/ri";
import { ImEyeBlocked } from "react-icons/im";
import Toast from "../../hook/Toast";
import useToast from "../../hook/useToast";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import PhotoList from "./PhotoList";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "white",
	borderRadius: "7px",
	// border: "2px solid #000",
	// boxShadow: 24,
	p: 4,
};

const ProfilePage = () => {
	const [user, setUser] = useState([]);
	const [users, setUsers] = useState([]);

	const [loading, setLoading] = useState(true);
	const [follow, setFollow] = useState([]);
	const [following, setFollowing] = useState([]);
	const [followingState, setFollowingState] = useState({});
	const [indeedFollow, setIndeedFollow] = useState([]);
	const [dominantColor, setDominantColor] = useState("");

	const [posts, setPosts] = useState([]);

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

	const profileUserId = user._id;

	// >> tabs functions below
	const [activeTab, setActiveTab] = useState("post");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const renderContentPanel = () => {
		switch (activeTab) {
			case "post":
				return (
					<PostContents
						userId={userId}
						profileUserId={profileUserId}
						dominantColor={dominantColor}
						users={users}
						setPosts={setPosts}
					/>
				);
			case "about":
				return <AboutContent />;
			case "photo":
				return (
					<SavedPostsContent
						posts={posts}
						userId={userId}
						userName={userName}
					/>
				);
			case "stories":
				return <StoriesContent posts={posts} />;
			default:
				return null;
		}
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

	// console.log("profileUserId", profileUserId);

	const getFollowerCount = (following) => {
		const followerIds = following.map((fo) => fo?.followerId);
		const uniqueFollowerIds = new Set(followerIds);
		return uniqueFollowerIds.size + newFollow;
	};

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

				// Count colors in an object
				const brightnessThreshold = 220; // Adjust this value to change the brightness threshold

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

					// Calculate the brightness of the color
					const colorRed = imageData[i];
					const colorGreen = imageData[i + 1];
					const colorBlue = imageData[i + 2];
					const brightness = (colorRed + colorGreen + colorBlue) / 3;

					// Skip light colors and white color
					if (brightness > brightnessThreshold) {
						continue;
					}

					if (colorCount[hexColor]) {
						colorCount[hexColor] += 1;
					} else {
						colorCount[hexColor] = 1;
					}
				}

				const dominantColorHex = Object.keys(colorCount).reduce(
					(a, b) => (colorCount[a] > colorCount[b] ? a : b)
				);

				setDominantColor(dominantColorHex);
			};
		}
	}, [user.image]);

	return (
		// <div className="min-h-screen">
		// 	<div
		// 		className="fixed top-0 w-full"
		// 		style={{ zIndex: "999" }}
		// 	>
		// 		<TopNavbar />
		// 	</div>
		// 	<div className="relative pt-16 mx-auto">
		// 		<div
		// 			className="absolute top-0 w-full h-40 rounded-t-lg lg:h-64"
		// 			style={{
		// 				backgroundColor: dominantColor,
		// 			}}
		// 		></div>
		// 		<div className="flex flex-col items-center justify-between mx-3 md:flex-row">
		// 			<div
		// 				className="flex flex-col items-center justify-center gap-4 md:flex-row"
		// 				style={{ zIndex: "9" }}
		// 			>
		// 				{/* <img
		// 					className="object-cover h-40 border-4 border-white rounded-full xl:w-72 lg:w-64 w-36 xl:h-72 lg:h-52 drop-shadow-md lg:border-8"
		// 					src={user?.image}
		// 					alt=""
		// 				/> */}
		// 				<div className="flex items-center justify-center w-full avatar">
		// 					<div className="object-cover h-auto border-4 border-white rounded-full xl:w-72 lg:w-64 w-44 drop-shadow-md lg:border-8">
		// 						<img
		// 							src={user?.image}
		// 							alt="users avatar"
		// 						/>
		// 					</div>
		// 				</div>
		// 				<div className="w-full md:mb-2">
		// 					<div className="flex flex-col items-center justify-start md:items-start">
		// 						<h2 className="text-2xl font-bold text-center text-gray-600 md:text-white lg:text-4xl md:text-2xl md:text-left whitespace-nowrap">
		// 							{user?.name}
		// 						</h2>
		// 						<p className="text-lg text-gray-400 md:text-gray-200">
		// 							@{user?.userName}
		// 						</p>
		// 					</div>
		// 					<div className="flex items-center justify-center w-full gap-4 mt-1 font-semibold text-gray-400 md:text-gray-200 lg:justify-start">
		// 						<p>Followers - {getFollowerCount(following)}</p>
		// 						<p>
		// 							Following -{" "}
		// 							{follow.map(
		// 								(fo) => fo?.followingIds.length
		// 							)}
		// 						</p>
		// 					</div>
		// 				</div>
		// 			</div>
		// 			{/* 2xl:w-[78%] xl:w-[940px] lg:w-9/12 md:w-9/12 ml-auto lg:mt-5 md:mt-5 */}
		// 			<div
		// 				className="w-full mt-3 lg:w-fit"
		// 				style={{ zIndex: "9" }}
		// 			>
		// 				{/**/}
		// 				<div className="flex flex-col items-center justify-between md:flex-row">
		// 					<div className="grid justify-end w-full grid-cols-2 gap-4 mt-3 lg:flex lg:mt-0">
		// 						<button
		// 							className="py-1 text-lg font-semibold normal-case border-0 rounded-md shadow-md lg:px-4"
		// 							onClick={() => handleFollow(user?._id)}
		// 							style={{
		// 								backgroundColor: indeedFollow.includes(
		// 									user?._id
		// 								)
		// 									? "#FFFFFF"
		// 									: "#32308E",
		// 								color: indeedFollow.includes(user?._id)
		// 									? "#32308E"
		// 									: "#FFFFFF",
		// 								display:
		// 									user?._id === userId
		// 										? "none"
		// 										: "block",
		// 							}}
		// 						>
		// 							{indeedFollow.includes(user?._id)
		// 								? "Following"
		// 								: "Follow"}
		// 						</button>

		// 						<button
		// 							className="py-1 text-lg font-semibold text-gray-600 normal-case bg-white border-0 rounded-md shadow-md lg:px-4"
		// 							style={{
		// 								display:
		// 									user?._id === userId
		// 										? "none"
		// 										: "block",
		// 							}}
		// 						>
		// 							<TextsmsIcon /> Message
		// 						</button>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<Divider
		// 			sx={{
		// 				mt: {
		// 					lg: "80px",
		// 					md: "50px",
		// 					sm: "50px",
		// 					xs: "40px",
		// 				},
		// 			}}
		// 		/>
		// 		<Box sx={{ width: "100%", typography: "body1" }}>
		// 			<TabContext value={value}>
		// 				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
		// 					<TabList
		// 						onChange={handleChange}
		// 						aria-label="lab API tabs example"
		// 					>
		// 						<Tab
		// 							label="Posts"
		// 							value="1"
		// 						/>
		// 						<Tab
		// 							label="About"
		// 							value="2"
		// 						/>
		// 						<Tab
		// 							label="Photos"
		// 							value="3"
		// 						/>
		// 					</TabList>
		// 				</Box>
		// 				<TabPanel value="1">
		// 					<div className="flex flex-col-reverse items-start gap-5 lg:flex-row">
		// 						<div className="flex flex-col w-full gap-5 ">
		// 							{posts?.map((post, index) => (
		// 								<div key={index}>
		// 									<div className="p-5 bg-white rounded-lg shadow-md">
		// 										<div className="flex justify-between ">
		// 											<div className="flex items-center gap-3">
		// 												<img
		// 													src={user?.image}
		// 													className="object-cover w-12 h-12 rounded-full"
		// 													alt=""
		// 												/>
		// 												<div>
		// 													<h3 className="font-bold">
		// 														{user?.name}
		// 													</h3>
		// 													<p>
		// 														{
		// 															post?.timeDifference
		// 														}
		// 													</p>
		// 												</div>
		// 											</div>
		// 											<MoreHorizIcon />
		// 										</div>
		// 										<div className="mt-5">
		// 											<p>{post?.name}</p>
		// 											<div className="mt-5">
		// 												<img
		// 													src={post?.image}
		// 													className="w-full"
		// 													alt=""
		// 												/>
		// 											</div>
		// 										</div>
		// 									</div>
		// 								</div>
		// 							))}
		// 						</div>
		// 						<div className="hidden p-5 bg-white rounded-lg shadow-md lg:w-6/12 lg:block">
		// 							<div className="flex items-center justify-between mb-3">
		// 								<h4 className="text-2xl font-bold">
		// 									Photos
		// 								</h4>
		// 								<Link className="text-[#6A67FF]">
		// 									See More
		// 								</Link>
		// 							</div>
		// 							<div className="grid grid-cols-2 gap-2 rounded-lg">
		// 								{posts?.map((post, index) => (
		// 									<div key={index}>
		// 										<img
		// 											src={post?.image}
		// 											className="w-full"
		// 											alt=""
		// 										/>
		// 									</div>
		// 								))}
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</TabPanel>
		// 				<TabPanel value="2">About</TabPanel>
		// 				<TabPanel value="3">
		// 					<div className="w-full p-5 bg-white rounded-lg shadow-md">
		// 						<div className="flex items-center justify-between mb-3">
		// 							<h4 className="text-2xl font-bold">
		// 								Photos
		// 							</h4>
		// 							<Link className="text-[#6A67FF]">
		// 								See More
		// 							</Link>
		// 						</div>
		// 						<div className="grid grid-cols-3 gap-5 rounded-lg">
		// {posts?.map((post, index) => (
		// 	<div key={index}>
		// 		<img
		// 			src={post?.image}
		// 			className="w-full"
		// 			alt=""
		// 		/>
		// 	</div>
		// ))}
		// 						</div>
		// 					</div>
		// 				</TabPanel>
		// 			</TabContext>
		// 		</Box>
		// 	</div>
		// </div>
		<section className="min-h-screen mx-auto overflow-x-hidden">
			<div
				className="fixed top-0 w-full"
				style={{ zIndex: "999" }}
			>
				<TopNavbar />
			</div>

			<div className="grid grid-cols-8 gap-4 mx-auto lg:w-auto md:w-11/12 lg:ml-4 xl:ml-0">
				<div className="xl:col-span-2 xl:fixed top-[70px] left-4 hidden xl:block max-w-[311px]">
					<PhotoList
						profileUserId={profileUserId}
						dominantColor={dominantColor}
						posts={posts}
					/>
				</div>
				<div className="hidden xl:col-span-2 xl:block  lg:mt-[70px] xl:mt-[280px]"></div>

				<div className="col-span-8 lg:col-span-5 xl:col-span-4 mt-[50px] lg:mt-[70px] relative">
					<div
						className="absolute top-0 w-full shadow-md lg:rounded-md h-44 lg:h-52"
						style={{
							backgroundColor: dominantColor,
						}}
					></div>
					<div className="flex flex-col items-center justify-center mx-3 mt-12 lg:mt-20">
						<div
							className="flex flex-col items-center justify-center gap-4"
							style={{ zIndex: "9" }}
						>
							{/* <img
							className="object-cover h-40 border-4 border-white rounded-full xl:w-72 lg:w-64 w-36 xl:h-72 lg:h-52 drop-shadow-md lg:border-8"
							src={user?.image}
							alt=""
						/> */}
							<div className="avatar">
								<div className="object-cover h-auto border-4 border-white rounded-full xl:w-44 lg:w-52 w-44 drop-shadow-md">
									<img
										src={user?.image}
										alt="users avatar"
									/>
								</div>
							</div>
							<div className="w-full md:mb-2">
								<div className="flex flex-col items-center justify-center">
									<h2 className="text-2xl font-bold text-center text-gray-600 lg:text-2xl md:text-2xl whitespace-nowrap">
										{user?.name}
									</h2>
									<p className="text-base text-center text-gray-400">
										@{user?.userName}
									</p>
								</div>
								<div className="flex items-center justify-center w-full gap-4 mt-2 font-semibold text-gray-400">
									<p>
										Followers -{" "}
										{getFollowerCount(following)}
									</p>
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
								<div className="grid justify-end w-full grid-cols-2 gap-4 mt-3 lg:flex lg:mt-0 md:mx-16">
									<button
										className="py-1 text-lg font-semibold normal-case border-0 rounded-md shadow-md lg:px-4"
										onClick={() => handleFollow(user?._id)}
										style={{
											backgroundColor:
												indeedFollow.includes(user?._id)
													? "#FFFFFF"
													: "#32308E",
											color: indeedFollow.includes(
												user?._id
											)
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

					<div className="mt-6 tabs-container">
						<div className="flex items-center justify-center gap-4 text-base font-semibold text-gray-600 border-b border-gray-400 tabs-nav">
							<button
								className={`tab-button ${
									activeTab === "post" ? "active" : ""
								}`}
								onClick={() => handleTabChange("post")}
								style={{
									backgroundColor:
										activeTab === "post"
											? dominantColor
											: "",
								}}
							>
								Posts
							</button>
							<button
								className={`tab-button ${
									activeTab === "about" ? "active" : ""
								}`}
								onClick={() => handleTabChange("about")}
								style={{
									backgroundColor:
										activeTab === "about"
											? dominantColor
											: "",
								}}
							>
								About
							</button>
							{userId === profileUserId ? (
								<button
									className={`tab-button ${
										activeTab === "photo" ? "active" : ""
									}`}
									onClick={() => handleTabChange("photo")}
									style={{
										backgroundColor:
											activeTab === "photo"
												? dominantColor
												: "",
									}}
								>
									Saved posts
								</button>
							) : (
								<button
									className={`tab-button ${
										activeTab === "stories" ? "active" : ""
									}`}
									onClick={() => handleTabChange("stories")}
									style={{
										backgroundColor:
											activeTab === "stories"
												? dominantColor
												: "",
									}}
								>
									Stories
								</button>
							)}
						</div>
						<div className="tabs-content">
							{renderContentPanel()}
						</div>
					</div>
				</div>

				<div className="hidden lg:col-span-3 xl:col-span-2 lg:block lg:mt-[70px]  fixed top-0 w-fit right-4">
					<FriendCom
						profileUserId={profileUserId}
						dominantColor={dominantColor}
					/>
				</div>
			</div>
		</section>
	);
};

const PostContents = ({ profileUserId, dominantColor, setPosts }) => {
	const [postsId, setPostsId] = useState("");
	const [show, setShow] = useState(false);
	const [showId, setShowId] = useState(false);
	const [users, setUsers] = useState([]);
	const [include, setInclude] = useState([]);
	const [recom, setRecom] = useState("");
	const [comments, setComments] = useState([]);
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [isFormVisible, setFormVisible] = useState(true);
	const [loading, setLoading] = useState(true);

	const [localPosts, setLocalPosts] = useState([]);

	// material modal
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const customBackdropStyle = {
		backgroundColor: "rgba(0, 0, 0, 0.192)",
		opacity: 0.2,
	};

	const [uploaderName, setUploaderName] = useState("");

	const handleOpen = (uploaderName) => {
		setOpen(true);
		setUploaderName(uploaderName);
	};

	const userId = localStorage.getItem("social_id"); // CURRENT USER

	const matchedUser = users.find((user) => user?._id === userId);

	const isSameUser = profileUserId === userId;

	const handleUnfollow = (unfollowId) => {
		showToast("loading", `Please wait!`);

		axios
			.delete(`https://social-link-server-liard.vercel.app/follow`, {
				data: { followerId: userId, unfollowId: unfollowId },
			})
			.then((response) => {
				if (response.data.success) {
					const updatedPosts = localPosts.filter(
						(post) => post.uploaderId !== unfollowId
					);
					// Update the posts state
					setPosts(updatedPosts);
					showToast("success", "Unfollow successful!");
				}
			})
			.catch((err) => {
				console.log(err.message);
				showToast("error", "Unfollow unsuccessful!");
			});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const comment = form.comment.value;

		fetch("https://social-link-server-liard.vercel.app/comments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				post_id: postsId,
				user_name: matchedUser.name,
				user_image: matchedUser.image,
				userName: matchedUser.userName,
				comment,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				if (data.acknowledged) {
					// alert("comment added");
					setRecom(recom + 1);
				}
				form.reset();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// >> main fetch function
	useEffect(() => {
		setLoading(true);
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				console.log("data", data);

				setLoading(false);
				const filterPosts = data
					.filter((po) => po.uploaderId === profileUserId)
					.reverse()
					.map((post) => ({
						...post,
						timeDifference: getTimeDifference(post.createdAt),
					}));

				setPosts(filterPosts);
				setLocalPosts(filterPosts);
				console.log("filterPosts", filterPosts);
				// console.log("filteredAndMappedPosts", filteredAndMappedPosts);
				// setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [profileUserId, setPosts]);

	useEffect(() => {
		axios("https://social-link-server-liard.vercel.app/comments").then(
			(res) => {
				const commentsWithTimeDifference = res.data.map((com) => ({
					...com,
					timeDifferenceCom: getTimeDifferenceCom(com.createdAt),
				}));

				const reversedComments = commentsWithTimeDifference.reverse();

				setComments(reversedComments);
			}
		);
	}, [recom]);

	useEffect(() => {
		axios("https://social-link-server-liard.vercel.app/users").then(
			(res) => {
				setUsers(res.data);
			}
		);
	}, []);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/follow")
			.then((res) => {
				const includeUser = res.data.find(
					(re) => re.followerId === userId
				);
				const followingId = includeUser?.followingIds;
				setInclude(followingId);
			});
	}, [userId]);

	// for post
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

	// for comment
	function getTimeDifferenceCom(timestamp) {
		const now = new Date();
		const createdTime = new Date(timestamp);
		const timeDifferenceCom = now - createdTime;
		const hoursDifference = Math.floor(
			timeDifferenceCom / (60 * 60 * 1000)
		);
		const minutesDifference = Math.floor(
			(timeDifferenceCom % (60 * 60 * 1000)) / (60 * 1000)
		);

		if (hoursDifference >= 24) {
			const daysDifference = Math.floor(hoursDifference / 24);
			return `${daysDifference}d`;
		} else if (hoursDifference > 0) {
			return `${hoursDifference}h`;
		} else if (minutesDifference > 0) {
			return `${minutesDifference}m`;
		} else {
			return "now";
		}
	}

	const handleReport = (event, postId, userName, name, image) => {
		event.preventDefault();

		showToast("loading", "Please wait!");

		const form = event.target;
		const reportType = form["radio-1"].value;

		const report = {
			reportType,
			postId,
			reporter: matchedUser?.userName,
			postMaker: userName,
			body: name,
			postImage: image,
		};

		if (report === "" || null) {
			return showToast("error", "Please try again!");
		}

		event.target.reset(); // Resets the form fields

		axios
			.post("https://social-link-server-liard.vercel.app/report", report)
			.then((res) => {
				showToast("success", "Reported!");
				setFormVisible(false);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				showToast("error", "Failed to report!");
			});
	};

	const saveHandle = (postId, userName) => {
		axios.post("https://social-link-server-liard.vercel.app/savePost", {
			postId: postId,
			userName: userName,
		});
		showToast("success", "Post saved!");
	};

	const handleDelete = (id) => {
		showToast("loading", "Please wait!");
		axios
			.delete(`https://social-link-server-liard.vercel.app/posts/${id}`)
			.then(() => {
				showToast("success", "Post deleted!");
				// Success callback
				setLocalPosts(localPosts.filter((po) => po._id !== id));
				// Update the UI to reflect the deleted post
			})
			.catch((error) => {
				showToast("error", "Delete unsuccessful!");
				// Error callback
				console.error(`Failed to delete post with ID ${id}`, error);
			});
	};

	return (
		<div className="min-h-screen content-panel">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			{localPosts.map((po) => (
				<div key={po._id}>
					<div className="pt-4 mx-4 my-4 bg-white rounded-lg shadow-md drop-shadow md:mx-8">
						{/* top bar */}
						<div className="flex items-center justify-between mx-4">
							<div className="flex items-center justify-center bg-transparent">
								<div className="avatar">
									<div className="z-10 object-cover w-10 rounded-full lg:w-14">
										<img
											src={po?.uploaderImage}
											alt="person"
										/>
									</div>
								</div>
								<div className="flex flex-col ml-4 bg-transparent">
									<Link
										className="text-base font-semibold text-gray-600 bg-transparent cursor-pointer hover:underline"
										to={`/profilePage/${po?.userName}`}
									>
										{po?.uploaderName}
									</Link>
									<p className="text-sm text-gray-400">
										{po.timeDifference}
									</p>
								</div>
							</div>

							{/* <CiMenuKebab className="ml-2 text-2xl font-semibold text-gray-600 bg-transparent cursor-pointer lg:text-3xl" /> */}
							<details className="dropdown dropdown-end">
								<summary
									// onClick={toggleDropdown}
									className="ml-1 text-xl btn btn-circle btn-ghost"
								>
									<CiMenuKebab />
								</summary>

								{isSameUser ? (
									<div className="z-50 p-2 font-semibold text-gray-600 bg-white rounded-md shadow-lg drop-shadow-lg menu dropdown-content w-80">
										<li>
											<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb] whitespace-nowrap">
												<BiEdit className="text-2xl " />
												Edit post
											</p>
										</li>
										<li
											onClick={() => handleDelete(po._id)}
										>
											<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb] whitespace-nowrap">
												<MdDelete className="text-2xl " />
												Delete post
											</p>
										</li>
									</div>
								) : (
									<div
										className="p-2 font-semibold text-gray-600 bg-white rounded-md shadow-lg drop-shadow-lg menu dropdown-content w-80"
										style={{ zIndex: "9999999" }}
									>
										<li
											onClick={() =>
												saveHandle(
													po._id,
													matchedUser.userName
												)
											}
										>
											<p className="flex items-center gap-4 rounded-md hover:[#e5e7eb]">
												<BsJournalBookmarkFill className="text-2xl " />{" "}
												Save Post
											</p>
										</li>

										<li>
											<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]">
												<ImEyeBlocked className="text-2xl " />
												Hide all post from{" "}
												{po?.uploaderName}
											</p>
										</li>
										<li
											onClick={() =>
												handleUnfollow(po.uploaderId)
											}
										>
											<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]">
												<RiUserUnfollowFill className="text-2xl " />
												Unfollow {po?.uploaderName}
											</p>
										</li>
										<li>
											<button
												// href="#post-modal-block"
												className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]"
												// htmlFor="my_modal_7"
												// htmlFor={`modal_${po._id}`}
												// onClick={() => openModal(po._id)}
												onClick={() =>
													handleOpen(po.uploaderName)
												}
											>
												<SiAdblock className="text-2xl " />
												Block {po?.uploaderName}
											</button>
										</li>
										<li>
											<label
												className="flex items-center gap-4 rounded-md hover:[#e5e7eb]"
												// htmlFor="my_modal_6"
												htmlFor={`modal_${po._id}`}
											>
												<MdReport className="text-2xl " />{" "}
												Report to admin
											</label>
										</li>
									</div>
								)}
							</details>
						</div>

						{/* block user */}
						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							open={open}
							onClose={handleClose}
							closeAfterTransition
							slots={{ backdrop: Backdrop }}
							slotProps={{
								backdrop: {
									style: customBackdropStyle, // Apply the custom backdrop style
									timeout: 500,
								},
							}}
						>
							<Fade in={open}>
								<Box sx={style}>
									<Typography
										id="transition-modal-title"
										variant="h6"
										component="h2"
									>
										Text in a modal
									</Typography>
									<Typography
										id="transition-modal-description"
										sx={{ mt: 2 }}
									>
										Are you sure that you want to block{" "}
										{uploaderName}
									</Typography>
								</Box>
							</Fade>
						</Modal>

						{/* <div
							id="post-modal-block"
							className="modal"
						>
							<div className="bg-white rounded-md modal-box">
								<h3 className="text-xl font-bold text-gray-600">
									Block!
								</h3>
								<p className="mt-4 mb-8 font-semibold text-gray-600">
									Are you sure you want to block
								</p>
								<div className="flex items-center justify-between text-base">
									<div className="modal-action">
										<a
											// htmlFor="my_modal_7"
											// className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 -mt-6 px-5"
											href="#"
											className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md modal__close "
										>
											Go back
										</a>
									</div>
									<button className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300">
										Block
									</button>
								</div>
							</div>
						</div> */}

						{/* report post to admin modal */}
						<input
							type="checkbox"
							// id="my_modal_6"
							id={`modal_${po._id}`}
							className="modal-toggle"
						/>
						{isFormVisible && (
							<div className="modal">
								<div className="relative bg-white rounded-md modal-box">
									{/* body starts here */}
									<h3 className="text-xl font-semibold text-gray-600">
										Report post {po.uploaderName}
									</h3>
									<form
										// onSubmit={handleReport}
										onSubmit={(event) =>
											handleReport(
												event,
												po?._id,
												po?.userName,
												po.name,
												po?.image
											)
										}
										className="font-semibold text-gray-600"
									>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="misinformation"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Misinformation</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="spam"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Spam or misleading</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="bullying"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Harassment or bullying</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="hateful"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Hateful or abusive content</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="harmful"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Harmful or dangerous acts</p>
										</div>
										<div className="flex items-center justify-start gap-2 mt-4 mb-8">
											<input
												value="terrorism"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Promotes terrorism</p>
										</div>
										<div className="flex items-center justify-end">
											<input
												type="submit"
												value="Submit"
												className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 text-base"
											/>
										</div>
									</form>

									<div className="absolute bottom-6 left-6 modal-action">
										<label
											// htmlFor="my_modal_6"
											htmlFor={`modal_${po._id}`}
											className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md"
										>
											Go back
										</label>
									</div>
								</div>
							</div>
						)}
						{/* top bar */}

						{/* body */}
						<div className="mt-8 mb-5 bg-transparent">
							<Link to={`/viewPost/${po?._id}`}>
								<div className="mx-4">
									<PostContent content={po?.name} />
								</div>

								<img
									src={po?.image}
									alt="post image"
									className="w-full my-4"
									loading="lazy"
									style={{
										display: po?.image ? "block" : "none",
									}}
								/>
							</Link>
						</div>
						<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px]" />

						{/* comment and like button */}
						<div
							className="flex items-center justify-around h-full"
							style={{ color: dominantColor }}
						>
							<div className="flex items-center justify-center w-full duration-300   gap-2 cursor-pointer hover:bg-[#e5e7eb] py-2 ">
								<button
									className="flex items-center justify-center gap-2 text-sm"
									onClick={(postId) => {
										fetch(
											`http://localhost:7000/posts/like/${postId}`,
											{
												method: "PATCH",
												headers: {
													"Content-Type":
														"application/json",
												},
												body: JSON.stringify({
													postId: po?._id,
													likedId: userId,
												}),
											}
										)
											.then((res) => res.json())
											.then((data) => {
												// setLike(false);
												// console.log(data);
											});
									}}
								>
									<AiFillHeart className="text-xl cursor-pointer" />{" "}
									Like
									<p>{po?.likes}</p>
								</button>
							</div>
							<button
								className="flex items-center justify-center w-full duration-300   gap-2 cursor-pointer hover:bg-[#e5e7eb] py-2  text-sm"
								onClick={() => {
									setShow(!show);
									setShowId(po?._id);
								}}
							>
								<FaComment className="text-xl cursor-pointer" />{" "}
								Comment
							</button>
							<div className="flex items-center justify-center w-full duration-300   gap-2 cursor-pointer hover:bg-[#e5e7eb] py-3 text-sm">
								<FaShare className="text-xl cursor-pointer" />{" "}
								Share
							</div>
						</div>

						{show && showId === po?._id && (
							<div
								className={`${
									comments?.filter(
										(comment) =>
											comment?.post_id === po?._id
									).length > 5
										? "max-h-[350px] overflow-y-auto duration-200"
										: ""
								}`}
							>
								<form
									onSubmit={onSubmit}
									className="flex items-center p-2"
								>
									<input
										type="text"
										name="comment"
										onChange={() => setPostsId(po?._id)}
										placeholder="comment"
										className="w-full p-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md outline-none max-h-10 input border-e-0 rounded-e-none focus:outline-0 placeholder:text-xs placeholder:lg:text-sm"
									/>
									<button
										type="submit"
										className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-xl lg:text-2xl font-semibold  hover:bg-opacity-80 duration-300 border border-gray-300 border-s-0 rounded-s-none rounded-md py-[9px] lg:py-[7px] px-4"
									>
										<FaComment />
									</button>
									{/* <input
										type="submit"
										value="submit"
										className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-sm lg:text-lg font-semibold  hover:bg-opacity-80 duration-300 border border-gray-400 border-s-0 rounded-s-none rounded-md py-[9px] px-4"
									/> */}
								</form>
								<div
									className="rounded-b-md"
									style={{ backgroundColor: dominantColor }}
								>
									{comments
										?.filter(
											(com) => com?.post_id === po?._id
										)
										.map((com) => (
											<div
												className="grid grid-cols-7 py-1 pr-2 mt-2 font-semibold text-gray-600 lg:px-4"
												key={com?._id}
											>
												<div className="flex items-center justify-center avatar">
													<div className="z-10 object-cover h-8 -mt-4 rounded-full lg:mt-0 lg:h-12 drop-shadow-md">
														<img
															src={
																com?.user_image
															}
															alt="commenter avatar"
														/>
													</div>
												</div>
												<div className="col-span-6 bg-[#e5e7eb] flex flex-col gap-1 pl-3 rounded-md shadow-md">
													<div className="flex items-center justify-start gap-2">
														<Link
															className="text-sm font-bold hover:underline"
															to={`/profilePage/${com?.userName}`}
														>
															{com?.user_name}
														</Link>
														<span className="text-xs text-gray-400">
															-{" "}
															{
																com?.timeDifferenceCom
															}
														</span>
													</div>
													<div className="text-sm">
														<h1>{com?.comment}</h1>
													</div>
												</div>
											</div>
										))}
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

const AboutContent = () => {
	return (
		<div className="min-h-screen content-panel">
			<h2>About Content</h2>
			<p>This is the content for the About tab.</p>
		</div>
	);
};

const SavedPostsContent = ({ posts, userId, userName }) => {
	const [saved, setSaved] = useState([]);

	console.log("userName", userName);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/savePost")
			.then((res) => {
				const data = res?.data;

				const filterSaved = data.filter(
					(sa) => sa?.userName === userName
				);

				setSaved(filterSaved);
			});
	}, [userName]);

	console.log("saved", saved);
	return (
		<div className="min-h-screen content-panel">
			<p>saved posts</p>
		</div>
	);
};
const StoriesContent = () => {
	return (
		<div className="min-h-screen content-panel">
			<p>stories com</p>
		</div>
	);
};

export default ProfilePage;
