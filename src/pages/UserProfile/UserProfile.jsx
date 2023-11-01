import { Chip, Divider } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LeftNav from "../Home/LeftNav";
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
	console.log(matchedUser);
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
							<h2 className="lg:text-4xl text-2xl font-semibold">
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
					// <div className="h-screen">
					// 	<span className="loading loading-bars h-32 w-32"></span>
					// </div>
					<div id="card">
						<div className="card-image">
							<div className="block pulsate"></div>
							<svg
								className="fpo "
								width="84px"
								height="63px"
								x="50%"
								y="50%"
								viewBox="0 0 84 63"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<defs></defs>
								<g
									stroke="none"
									stroke-width="1"
									fill="none"
									fill-rule="evenodd"
									transform="translate(-964.000000, -1012.000000)"
									fill-opacity="0.06"
								>
									<g
										id="16---Workpaper-Loading-Copy"
										transform="translate(836.000000, 909.000000)"
										fill="#000000"
									>
										<g
											id="Icons-/-Special-/-RTE-/-Image"
											transform="translate(100.000000, 67.000000)"
										>
											<g id="Icons-/-RTE-/-ImageSpecial">
												<path
													d="M108.368088,36.5625 L30.8485565,36.5625 C29.319526,36.5625 28.0800018,37.8216991 28.0800018,39.375 L28.0800018,95.625 C28.0800018,97.1783009 29.319526,98.4375 30.8485565,98.4375 L108.368088,98.4375 C109.897118,98.4375 111.136642,97.1783009 111.136642,95.625 L111.136642,39.375 C111.136642,37.8216991 109.897118,36.5625 108.368088,36.5625 L108.368088,36.5625 Z M105.599533,42.1875 L105.599533,81.225 L96.7678436,68.68125 C96.2965986,68.0076728 95.5575991,67.5787153 94.747102,67.5082962 C93.936605,67.4378771 93.1366348,67.7331229 92.5596405,68.315625 L82.0668182,79.003125 L59.1154999,55.6875 C58.0356599,54.5970274 56.2916778,54.5970274 55.2118378,55.6875 L33.6171112,77.596875 L33.6171112,42.1875 L105.599533,42.1875 L105.599533,42.1875 Z M33.6171112,92.8125 L33.6171112,85.528125 L57.149826,61.621875 L80.1011444,84.9375 C81.1809844,86.0279726 82.9249665,86.0279726 84.0048065,84.9375 L94.1654022,74.64375 L105.599533,90.9 L105.599533,92.8125 L33.6171112,92.8125 L33.6171112,92.8125 Z M77.9139862,56.25 C77.9139862,53.1433983 80.3930345,50.625 83.4510956,50.625 C86.5091566,50.625 88.988205,53.1433983 88.988205,56.25 C88.988205,59.3566017 86.5091566,61.875 83.4510956,61.875 C80.3930345,61.875 77.9139862,59.3566017 77.9139862,56.25 L77.9139862,56.25 Z"
													id="Shape"
												></path>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</div>
						<div className="card-content">
							<div className="block2 pulsate"></div>
							<div className="block3 pulsate"></div>
							<div className="circle pulsate"></div>
							<div style={{ clear: "both" }}></div>
						</div>
					</div>
				) : (
					<div className="md:grid md:grid-cols-6 overflow-y-auto">
						{posts?.length === 0 ? (
							<div className="md:col-span-6  text-white text-center flex justify-center items-center h-80">
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
										<div className="bg-[#d3ccbe] my-4 mx-12 mt-12 py-4 shadow-sm shadow-slate-500 rounded-lg">
											{/* top bar */}
											<div className="flex justify-between items-center mx-4 mt-4 bg-transparent">
												<div className="flex justify-center items-center bg-transparent">
													<div className="w-14 lg:w-16 rounded-full">
														<img
															src={
																po?.uploaderImage
															}
															alt=""
															className="rounded-full"
														/>
													</div>
													<div className="flex flex-col ml-4 bg-transparent">
														<p className="text-xl md:text-2xl text-gray-700  font-semibold cursor-pointer bg-transparent">
															{po?.uploaderName}
														</p>
														<p className="text-sm md:text-lg text-gray-500 bg-transparent">
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
