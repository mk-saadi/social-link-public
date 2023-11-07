import HomeIcon from "@mui/icons-material/Home";
import TextsmsIcon from "@mui/icons-material/Textsms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import MakePost from "./MakePost";
import { useEffect, useState } from "react";
import axios from "axios";
import ActiveLink from "../../hook/ActiveLink";

const LeftNav = ({ followingCount, postCount }) => {
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const [follow, setFollow] = useState([]);
	const [following, setFollowing] = useState([]);
	const [loading, setLoading] = useState(true);

	const userId = localStorage.getItem("social_id");

	const handleLogout = () => {
		localStorage.removeItem("social_id");
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
		};
		fetchUsers();
	}, []);

	const matchedUser = users.find((user) => user?._id === userId);

	useEffect(() => {
		// setLoading(true);
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				const filteredAndMappedPosts = data.filter(
					(post) => post.uploaderId === userId
				);

				setPosts(filteredAndMappedPosts);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [userId]);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/follow")
			.then((res) => res.data)
			.then((data) => {
				const filteredAndMappedPosts = data.filter(
					(post) => post?.followerId === userId
				);
				setFollow(filteredAndMappedPosts);

				const followers = data.filter((item) =>
					item?.followingIds?.includes(userId)
				);

				setFollowing(followers);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [userId]);

	const getFollowerCount = (following) => {
		const followerIds = following.map((fo) => fo?.followerId);
		const uniqueFollowerIds = new Set(followerIds);
		return uniqueFollowerIds.size;
	};

	const [dominantColor, setDominantColor] = useState("");

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
			};
		}
	}, [matchedUser?.image]);

	return (
		<div className="bg-white shadow-md rounded-lg w-[340px]">
			<div className="flex flex-col">
				<div className="relative flex flex-col items-center justify-center gap-2 px-4 text-center">
					<div
						className="absolute top-0 w-full rounded-t-lg"
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
						<p className="text-xl font-semibold text-gray-600">
							{matchedUser?.name}
						</p>
						{matchedUser?.userName && (
							<p className="mb-3 text-sm font-semibold text-gray-400">
								@{matchedUser.userName}
							</p>
						)}
					</div>

					<div className="flex items-center justify-around w-full mx-2 mt-6 text-sm text-gray-400">
						<p className="font-semibold">
							<span className="text-xl font-semibold text-gray-600">
								{posts?.length + postCount}
							</span>
							<br />
							posts
						</p>
						<p className="font-semibold cursor-pointer">
							<span className="text-xl font-semibold text-gray-600">
								{getFollowerCount(following)}
							</span>
							<br />
							Followers
						</p>
						<p className="font-semibold cursor-pointer">
							<span className="text-xl font-semibold text-gray-600">
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
						<ul className="flex md:flex-col flex-row gap-3 text-xl text-[#32308E] font-semibold">
							<ActiveLink to={"/"}>
								<li>
									<p className="flex items-center justify-start gap-3">
										<HomeIcon className="bg-transparent" />
										Home
									</p>
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
								<li>
									<p className="flex items-center justify-start gap-3">
										<TextsmsIcon className="bg-transparent" />{" "}
										Message
									</p>
								</li>
							</p>
							<p to={"/notification"}>
								<li>
									<p className="flex items-center justify-start gap-3">
										<NotificationsIcon className="bg-transparent" />
										Notification
									</p>
								</li>
							</p>
							<ActiveLink to={"/profile"}>
								<li>
									<p className="flex items-center justify-start gap-3">
										<AccountCircleIcon className="bg-transparent" />{" "}
										Profile
									</p>
								</li>
							</ActiveLink>
							<p to={"/settings"}>
								<li>
									<p className="flex items-center justify-start gap-3">
										<SettingsIcon className="bg-transparent" />{" "}
										Settings
									</p>
								</li>
							</p>
							<p onClick={handleLogout}>
								<li>
									<p className="flex items-center justify-start gap-3">
										<LogoutIcon className="bg-transparent" />{" "}
										Logout
									</p>
								</li>
							</p>
							<p to={"/more"}>
								<li>
									<p className="flex items-center justify-start gap-3">
										<MenuIcon className="bg-transparent" />
									</p>
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
