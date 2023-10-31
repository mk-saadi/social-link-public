import { Chip, Divider } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LeftNav from "../home-component/LeftNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaComment, FaShare } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import PostContent from "../../hook/PostContent";
import { AiFillHeart } from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";

const UserProfile = () => {
	const [users, setUsers] = useState([]);

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const userId = localStorage.getItem("social_id");

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				console.log("data", data);
				// Filter and map the posts based on uploader's name
				const filteredAndMappedPosts = data
					.filter((post) => post.uploaderId === userId)
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
	}, [userId]);

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
	console.log(posts);

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

	return (
		<div className="grid lg:grid-cols-8 min-h-screen">
			<div
				className="col-span-2 xl:block lg:hidden md:hidden"
				style={{ zIndex: 10 }}
			>
				<LeftNav />
			</div>
			<div className="col-span-6 w-full mx-auto py-10">
				{matchedUser && (
					<div className="flex lg:flex-row flex-col justify-start items-center lg:gap-10 gap-6 py-10">
						<div className="avatar">
							<div className="lg:w-44 lg:h-auto w-32 h-32 rounded-full object-cover">
								<img
									src={matchedUser?.image || ""}
									alt="person"
								/>
							</div>
						</div>
						<Divider
							orientation="vertical"
							flexItem
						></Divider>
						<div className="text-gray-700">
							<h2 className="lg:text-4xl text-2xl font-semibold uppercase">
								{matchedUser?.name}
							</h2>
							<p className="text-sm text-gray-500 font-semibold mb-3">
								@{matchedUser?.userName}
							</p>
							<div className="flex gap-2 ">
								<button>
									<Chip
										label="Edit Profile"
										variant="outlined"
										className="hover:border-[#6A67FF]"
										icon={<EditIcon />}
									/>{" "}
								</button>
							</div>
							<div className="flex gap-10 mt-8">
								<p className=" font-semibold">
									{posts?.length} posts
								</p>
								<p className="cursor-pointer font-semibold">
									0 Followers
								</p>
								<p className="cursor-pointer font-semibold">
									0 Following
								</p>
							</div>
							<div></div>
						</div>
					</div>
				)}
				<Divider
					variant="middle"
					className="mt-5"
				/>
				{loading ? (
					<div className="h-screen">
						<span className="loading loading-bars h-32 w-32"></span>
					</div>
				) : (
					<div className="grid grid-cols-6 overflow-y-auto">
						{posts?.length === 0 ? (
							<div className="col-span-6  text-white text-center flex justify-center items-center h-80">
								<div className="text-gray-700 text-2xl text-center font-semibold mx-4">
									<p className="text-7xl flex justify-center items-center mb-3">
										<BsCardImage />
									</p>
									<h3>Share your first photo</h3>
									<p className="text-sm text-gray-400">
										<small>
											Posts made by you will be shown
											here.
										</small>
									</p>
								</div>
							</div>
						) : (
							posts
								.map((po) => (
									<div
										key={po._id}
										className="col-span-4"
									>
										<div className="bg-[#d3ccbe] m-8 mt-16  shadow-md rounded-lg">
											{/* top bar */}
											<div className="flex justify-between items-center mx-4 mt-4 bg-transparent">
												<div className="flex justify-center items-center bg-transparent">
													<div className="w-10 lg:w-16 rounded-full ">
														<img
															src={
																po?.uploaderImage
															}
															alt=""
															className="rounded-full hidden md:block"
														/>
													</div>
													<div className="flex flex-col ml-4 bg-transparent">
														<p className="text-2xl text-gray-700  font-semibold cursor-pointer bg-transparent">
															{po?.uploaderName}
														</p>
														<p className="text-lg text-gray-500 bg-transparent">
															{po.timeDifference}
														</p>
													</div>
												</div>

												<CiMenuKebab className="text-3xl text-gray-700 ml-2 font-semibold cursor-pointer bg-transparent" />
											</div>
											{/* top bar */}

											{/* body */}
											<div className="mx-4 mt-8  bg-transparent">
												<PostContent
													content={po?.name}
												/>

												<img
													src={po?.image}
													alt="post image"
													className="my-6 w-full rounded-md"
													loading="lazy"
												/>
											</div>
											<div className="flex justify-around items-center">
												<div className="flex justify-start items-center gap-8 w-full mx-4 mr-16">
													<AiFillHeart className="button-11" />
													{/* <LikeButton /> */}

													<FaComment className="text-gray-700 text-5xl" />
													<input
														type="text"
														placeholder="comment"
														className="input input-bordered border-gray-400 w-full focus:outline-0 bg-transparent rounded-md"
													/>
												</div>
												<div className="flex justify-center items-center gap-8 mr-4">
													<FaShare className="text-gray-700 text-4xl" />
												</div>
											</div>
										</div>
									</div>
								))
								.reverse()
						)}{" "}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
