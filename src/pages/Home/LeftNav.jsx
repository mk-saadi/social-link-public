import HomeIcon from "@mui/icons-material/Home";
import TextsmsIcon from "@mui/icons-material/Textsms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ActiveLink from "../../hook/ActiveLink";
import { DominantColorContext } from "../../hook/DominantColorProvider";
import { RiAdminFill } from "react-icons/ri";

const LeftNav = ({ followingCount, postCount, handleDominantColor }) => {
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const [follow, setFollow] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [feedback, setFeedback] = useState([]);
	const [followingDetails, setFollowingDetails] = useState([]); // users details of the current user is following
	const [followersDetails, setFollowersDetails] = useState([]); // users details of the current user is being followed
	const [role, setRole] = useState("");
	const userId = localStorage.getItem("social_id");

	const handleLogout = () => {
		localStorage.removeItem("social_id");
		sessionStorage.removeItem("dominantColor");
		window.location.reload();
	};

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
			const filteredUser = users.find((us) => us._id === userId);
			const userRole = filteredUser?.role;
			setRole(userRole);
		};
		fetchUsers();
	}, [userId]);

	const matchedUser = users.find((user) => user?._id === userId);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				const filteredAndMappedPosts = data.filter(
					(post) => post.uploaderId === userId
				);

				setPosts(filteredAndMappedPosts);
			})
			.catch((err) => {});
	}, [userId]);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/follow")
			.then((res) => res.data)
			.then((data) => {
				// Get the followingIds of the current user
				const followingIds = data.find(
					(follow) => follow?.followerId === userId
				)?.followingIds;

				const followingUserDetails = users.filter((user) =>
					followingIds.includes(user._id)
				);
				console.log("followingUserDetails", followingUserDetails);

				setFollowingDetails(followingUserDetails);

				const filteredAndMappedPosts = data.filter(
					(post) => post?.followerId === userId
				);
				setFollow(filteredAndMappedPosts);

				const followers = data.filter((item) =>
					item?.followingIds?.includes(userId)
				);
				setFollowers(followers);

				const followerIds = followers.map((fol) => fol.followerId);
				const followerUserDetails = users.filter((user) =>
					followerIds.includes(user._id)
				);
				setFollowersDetails(followerUserDetails);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [userId, users]);

	const getFollowerCount = (followers) => {
		const followerIds = followers.map((fo) => fo?.followerId);
		const uniqueFollowerIds = new Set(followerIds);
		return uniqueFollowerIds.size;
	};

	// >> feedback api
	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/feedback")
			.then((res) => {
				const data = res.data;
				const sentTo = data.filter(
					(d) => d?.to === matchedUser?.userName
				);

				setFeedback(sentTo);
			});
	}, [matchedUser]);

	// const [dominantColor, setDominantColor] = useState("");
	const { dominantColor, setDominantColor } =
		useContext(DominantColorContext);

	useEffect(() => {
		const imageUrl = matchedUser?.image;
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
				handleDominantColor(dominantColorHex);
			};
		}
	}, [matchedUser?.image, handleDominantColor, setDominantColor]);

	return (
		<div className="bg-white  shadow-md drop-shadow rounded-md w-[340px]">
			<div className="flex flex-col">
				<div className="relative flex flex-col items-center justify-center gap-2 px-4 text-center">
					<div
						className="absolute top-0 w-full rounded-t-md"
						style={{
							backgroundColor: dominantColor,
							minHeight: "80px",
						}}
					></div>
					<div className="avatar">
						<div className="w-20 mt-4 border-4 border-white shadow-md md:w-28 rounded-xl">
							<img
								src={matchedUser?.image}
								onError={(e) => {
									e.target.src =
										"https://hpsnf.com/wp-content/uploads/2021/04/avatar.jpg";
								}}
								alt="avatar"
							/>
						</div>
					</div>
					<div>
						<p className="text-base font-semibold text-gray-600">
							{matchedUser?.name}
						</p>
						{matchedUser?.userName && (
							<p className="mb-3 text-xs font-semibold text-gray-400">
								@{matchedUser.userName}
							</p>
						)}
					</div>

					<div className="flex items-center justify-around w-full mx-2 mt-6 text-xs text-gray-400">
						<p className="font-semibold">
							<span className="text-lg font-semibold text-gray-600">
								{posts?.length + postCount}
							</span>
							<br />
							posts
						</p>

						<div className="divider divider-horizontal divider-info">
							|
						</div>

						<p className="font-semibold cursor-pointer">
							<span className="text-lg font-semibold text-gray-600">
								{getFollowerCount(followers)}
							</span>
							<br />
							Followers
						</p>
						<div className="divider divider-horizontal divider-info">
							|
						</div>
						<p className="font-semibold cursor-pointer">
							<span className="text-lg font-semibold text-gray-600">
								{follow.map(
									(fo) =>
										fo?.followingIds.length + followingCount
								)}
							</span>
							<br />
							Following
						</p>
					</div>
				</div>
				<hr className="bg-gray-400 border-0 h-[1px] mt-2" />

				<div>
					<nav className="my-2 ml-5">
						<ul className="flex flex-row gap-3 text-base font-semibold text-gray-600 md:flex-col">
							<ActiveLink to={"/"}>
								<li className="flex items-center justify-start gap-3">
									<HomeIcon className="bg-transparent" />
									Home
								</li>
							</ActiveLink>
							{/* <p>
								<li>
									<p>
										<AddBoxIcon className="bg-transparent" />{" "}
										<MakePost />
									</p>
								</li>
							</p> */}
							<p to={"/message"}>
								<li className="flex items-center justify-start gap-3">
									<TextsmsIcon className="bg-transparent" />{" "}
									Message
								</li>
							</p>

							<div className="drawer">
								<input
									id="my-drawer"
									type="checkbox"
									className="drawer-toggle"
								/>
								<div className="drawer-content">
									{/* Page content here */}
									<label
										// to={"/notification"}
										htmlFor="my-drawer"
									>
										<li className="flex items-center justify-start gap-3 cursor-pointer">
											<NotificationsIcon className="bg-transparent" />
											Notifications
										</li>
									</label>
								</div>
								<div className="drawer-side">
									<label
										htmlFor="my-drawer"
										aria-label="close sidebar"
										className="drawer-overlay"
									></label>
									<ul className="min-h-full menu w-80 lg:w-96 bg-[#e7e7e7] pt-16">
										{/* Sidebar content here */}
										<div>
											<h3 className="mb-2 text-xl font-bold text-gray-600">
												Notifications!
											</h3>
										</div>
										<div className="p-1 font-semibold text-gray-600 bg-white rounded-md">
											{feedback.map((feed) => (
												<div
													key={feed._id}
													className="my-2"
												>
													<p>From Admin.</p>
													{/* <p>{feed.to[0]}</p> */}
													<p>
														Feedback:{" "}
														<span className="text-gray-500">
															{feed.feedbackBody}
														</span>
													</p>
													<p>
														PostId:{" "}
														<Link
															className="cursor-pointer text-sky-400 hover:underline"
															to={`/viewPost/${feed?.postId}`}
														>
															{feed.postId}
														</Link>
													</p>
													<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px]" />
												</div>
											))}
										</div>

										{/* <li>
											<a>Sidebar Item 2</a>
										</li> */}
									</ul>
								</div>
							</div>

							{role ? (
								<>
									<ActiveLink to={"/admin"}>
										<li className="flex items-center justify-start gap-3">
											<RiAdminFill className="bg-transparent text-2xl" />{" "}
											Admin
										</li>
									</ActiveLink>
									<ActiveLink
										to={`/profilePage/${matchedUser?.userName}`}
									>
										<li className="flex items-center justify-start gap-3">
											<AccountCircleIcon className="bg-transparent" />{" "}
											Profile
										</li>
									</ActiveLink>
								</>
							) : (
								<ActiveLink
									to={`/profilePage/${matchedUser?.userName}`}
								>
									<li className="flex items-center justify-start gap-3">
										<AccountCircleIcon className="bg-transparent" />{" "}
										Profile
									</li>
								</ActiveLink>
							)}

							{/* <p to={"/settings"}>
								<li className="flex items-center justify-start gap-3">
									<SettingsIcon className="bg-transparent" />{" "}
									Settings
								</li>
							</p> */}
							<Link to="/createBlogs">
								<li className="flex items-center justify-start gap-3 cursor-pointer">
									<SettingsIcon className="bg-transparent" />{" "}
									Create blog
								</li>
							</Link>
							<p
								onClick={handleLogout}
								className="cursor-pointer"
							>
								<li className="flex items-center justify-start gap-3">
									<LogoutIcon className="bg-transparent" />{" "}
									Logout
								</li>
							</p>
							<p to={"/more"}>
								<li className="flex items-center justify-start gap-3">
									<MenuIcon className="bg-transparent" />
								</li>
							</p>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default LeftNav;
