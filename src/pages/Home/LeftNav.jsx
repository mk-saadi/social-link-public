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
						<p className="font-semibold text-xl">
							{matchedUser?.name}
						</p>
						{matchedUser?.userName && (
							<p className="text-sm text-gray-500 font-semibold mb-3">
								@{matchedUser.userName}
							</p>
						)}
					</div>
					<div>
						<div className="flex gap-6 mt-6 mx-2">
							<p className="font-semibold">
								<span>{posts?.length}</span>
								<br />
								posts
							</p>
							<p className="cursor-pointer font-semibold">
								<span>{getFollowerCount(following)}</span>
								<br />
								Followers
							</p>
							<p className="cursor-pointer font-semibold">
								<span>
									{follow.map(
										(fo) => fo?.followingIds.length
									)}
								</span>
								<br />
								Following
							</p>
						</div>
					</div>
				</div>
				<hr className="bg-gray-400 border-0 h-[1px] my-3" />

				<div>
					<nav className="">
						<ul className="flex justify-start flex-col text-lg text-[#32308E] font-semibold">
							<NavLink to={"/"}>
								<li className="flex justify-start items-center gap-3">
									<HomeIcon className="text-indigo-700" />
									Home
								</li>
							</NavLink>

							<li className="flex justify-start items-center gap-3">
								<AddBoxIcon className="text-indigo-700" />
								<MakePost />
							</li>

							<li
								className="flex justify-start items-center gap-3"
								to={"/message"}
							>
								<TextsmsIcon className="text-indigo-700" />{" "}
								Message
							</li>

							<li
								className="flex justify-start items-center gap-3"
								to={"/notification"}
							>
								<NotificationsIcon className="text-indigo-700" />
								Notification
							</li>

							<NavLink to={"/profile"}>
								<li className="flex justify-start items-center gap-3">
									<AccountCircleIcon className="text-indigo-700" />{" "}
									Profile
								</li>
							</NavLink>

							<li
								className="flex justify-start items-center gap-3"
								to={"/settings"}
							>
								<SettingsIcon className="text-indigo-700" />{" "}
								Settings
							</li>

							<li
								className="flex justify-start items-center gap-3"
								onClick={handleLogout}
							>
								<LogoutIcon className="text-indigo-700" />{" "}
								Logout
							</li>

							<li
								className="flex justify-start items-center gap-3"
								to={"/more"}
							>
								<MenuIcon className="text-indigo-700" />
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default LeftNav;
