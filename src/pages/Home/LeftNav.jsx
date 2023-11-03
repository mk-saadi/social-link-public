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

const LeftNav = () => {
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
					(post) => post.followerId === userId
				);
				setFollow(filteredAndMappedPosts);

				const followers = data.filter((item) =>
					item.followingIds.includes(userId)
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

	return (
		<div className="bg-white shadow-md rounded-lg w-[340px]">
			<div className="flex flex-col">
				<div className="relative px-4 flex flex-col text-center justify-center items-center gap-2">
					<div className="absolute rounded-t-lg top-0 bg-[#6A67FF] h-16 w-full"></div>
					<div className="avatar">
						<div className="w-20 md:w-28 rounded-xl mt-4 border-white border-4 shadow-md">
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
						<p className="text-gray-600 font-semibold text-xl">
							{matchedUser?.name}
						</p>
						{matchedUser?.userName && (
							<p className="text-sm text-gray-400 font-semibold mb-3">
								@{matchedUser.userName}
							</p>
						)}
					</div>

					<div className="flex justify-around items-center mt-6 mx-2 text-sm text-gray-400 w-full">
						<p className="font-semibold">
							<span className="text-gray-600 text-xl font-semibold">
								{posts?.length}
							</span>
							<br />
							posts
						</p>
						<p className="cursor-pointer font-semibold">
							<span className="text-gray-600 text-xl font-semibold">
								{getFollowerCount(following)}
							</span>
							<br />
							Followers
						</p>
						<p className="cursor-pointer font-semibold">
							<span className="text-gray-600 text-xl font-semibold">
								{follow.map((fo) => fo?.followingIds.length)}
							</span>
							<br />
							Following
						</p>
					</div>
				</div>
				<hr className="bg-gray-400 border-0 h-[1px] mt-2" />

				<div>
					<nav className="ml-5 my-2">
						<ul className="flex lg:flex-col flex-row gap-3 text-xl text-[#32308E] font-semibold">
							<ActiveLink to={"/"}>
								<li>
									<p className="flex justify-start items-center gap-3">
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
									<p className="flex justify-start items-center gap-3">
										<TextsmsIcon className="bg-transparent" />{" "}
										Message
									</p>
								</li>
							</p>
							<p to={"/notification"}>
								<li>
									<p className="flex justify-start items-center gap-3">
										<NotificationsIcon className="bg-transparent" />
										Notification
									</p>
								</li>
							</p>
							<ActiveLink to={"/profile"}>
								<li>
									<p className="flex justify-start items-center gap-3">
										<AccountCircleIcon className="bg-transparent" />{" "}
										Profile
									</p>
								</li>
							</ActiveLink>
							<p to={"/settings"}>
								<li>
									<p className="flex justify-start items-center gap-3">
										<SettingsIcon className="bg-transparent" />{" "}
										Settings
									</p>
								</li>
							</p>
							<p onClick={handleLogout}>
								<li>
									<p className="flex justify-start items-center gap-3">
										<LogoutIcon className="bg-transparent" />{" "}
										Logout
									</p>
								</li>
							</p>
							<p to={"/more"}>
								<li>
									<p className="flex justify-start items-center gap-3">
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
