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
	}, []);

	return (
		<div className="bg-white shadow-md rounded-lg ">
			{/* <h1 className="text-[#32308E] text-5xl font-bold p-5 text-center">
				Social<span className="text-[#6A67FF]">Link</span>
			</h1> */}
			<div className="flex flex-col">
				<div className="relative flex flex-col text-center justify-center items-center gap-2">
					<div className="absolute rounded-t-lg top-0 bg-[#6A67FF] h-14 w-full"></div>
					<div className="avatar">
						<div className="w-20 md:w-28 rounded-xl mt-4 border-white border-4 shadow-md">
							<img
								src={matchedUser?.image}
								onError={(e) => {
									e.target.src = "";
								}}
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
								<span>0</span>
								<br />
								Followers
							</p>
							<p className="cursor-pointer font-semibold">
								<span>0</span>
								<br />
								Following
							</p>
						</div>
					</div>
				</div>
				<hr className="bg-gray-400 border-0 h-[1px] my-3" />
				<div>
					<nav className="">
						<ul className="menu flex lg:flex-col flex-row gap-2 text-xl text-[#32308E] font-semibold">
							<NavLink to={"/"}>
								<li>
									<p>
										<HomeIcon className="bg-transparent" />
										Home
									</p>
								</li>
							</NavLink>
							<p>
								<li>
									<p>
										<AddBoxIcon className="bg-transparent" />{" "}
										<MakePost />
									</p>
								</li>
							</p>
							<p to={"/message"}>
								<li>
									<p>
										<TextsmsIcon className="bg-transparent" />{" "}
										Message
									</p>
								</li>
							</p>
							<p to={"/notification"}>
								<li>
									<p>
										<NotificationsIcon className="bg-transparent" />
										Notification
									</p>
								</li>
							</p>
							<NavLink to={"/profile"}>
								<li>
									<p>
										<AccountCircleIcon className="bg-transparent" />{" "}
										Profile
									</p>
								</li>
							</NavLink>
							<p to={"/settings"}>
								<li>
									<p>
										<SettingsIcon className="bg-transparent" />{" "}
										Settings
									</p>
								</li>
							</p>
							<p onClick={handleLogout}>
								<li>
									<p>
										<LogoutIcon className="bg-transparent" />{" "}
										Logout
									</p>
								</li>
							</p>
							<p to={"/more"}>
								<li>
									<p>
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
