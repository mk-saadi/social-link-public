// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ProfilePage = () => {
// 	const [user, setUser] = useState([]);

// 	const { userName } = useParams();

// 	useEffect(() => {
// 		const fetchUser = async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://social-link-server-liard.vercel.app/users/${userName}`
// 				);
// 				setUser(response.data);
// 			} catch (error) {
// 				console.error("Error fetching post:", error);
// 			}
// 		};

// 		fetchUser();
// 	}, [userName]);

// 	console.log(user); // not getting any data

// 	return (
// 		<div className="h-screen">
// 			<p>user profile page here</p>
// 		</div>
// 	);
// };

// export default ProfilePage;

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
	const [value, setValue] = React.useState("1");
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

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
	console.log(posts);

	// tabs
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="min-h-screen">
			<div
				className="fixed top-0 w-full"
				style={{ zIndex: "999" }}
			>
				<TopNavbar />
			</div>
			<div className="container mx-auto pt-16">
				<div className="flex flex-col md:flex-row justify-between mx-3 items-center">
					<div className="flex flex-col md:flex-row justify-center items-center gap-4">
						<img
							src={user?.image}
							className="xl:w-72 lg:w-52 w-36 xl:h-72 lg:h-52 h-36 object-cover drop-shadow-sm rounded-full border-white lg:border-8 border-4"
							alt=""
						/>
						<div>
							<h2 className="lg:text-4xl md:text-2xl md:text-left text-center text-xl font-bold ">
								{user?.name}
							</h2>
							<p className="space-x-2 font-semibold text-gray-500 mt-2">
								<span>2 followers</span>
								<span>.</span>
								<span>1 following</span>
							</p>
						</div>
					</div>
					{/* 2xl:w-[78%] xl:w-[940px] lg:w-9/12 md:w-9/12 ml-auto lg:mt-5 md:mt-5 */}
					<div className=" mt-3">
						<div className="flex justify-between md:flex-row flex-col items-center w-full ">
							<div className="flex gap-3 lg:mt-0 mt-3">
								<button className="btn bg-slate-200 font-semibold normal-case text-lg border-0">
									Follow
								</button>
								<button className="btn font-semibold bg-[#6A67FF] hover:bg-[#6A67FF] hover:bg-opacity-80 text-white normal-case text-lg">
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
								<div className="lg:w-6/12 lg:block md:hidden rounded-lg shadow-md bg-white p-5">
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