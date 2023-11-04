// import { TiThMenu } from "react-icons/ti";
// import { AiFillHeart } from "react-icons/ai";
// import { FaComment, FaShare } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import MakePost from "./MakePost";
// import PostContent from "../../hook/PostContent";
// // import LikeButton from "../../button/LikeButton";

// const NewsFeed = () => {
// 	const [posts, setPosts] = useState([]);
// 	// const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		// setLoading(true);
// 		axios
// 			.get("https://social-link-server-liard.vercel.app/posts")
// 			.then((res) => res.data)
// 			.then((data) => {
// 				console.log("data", data);
// 				const postsWithTimeDifference = data.map((post) => ({
// 					...post,
// 					timeDifference: getTimeDifference(post.createdAt),
// 				}));
// 				// Reverse the array to display new posts first
// 				const reversedPosts = postsWithTimeDifference.reverse();

// 				setPosts(reversedPosts);
// 				// setLoading(false);
// 			})
// 			.catch((err) => {
// 				console.log(err.message);
// 			});
// 	}, []);

// 	function getTimeDifference(timestamp) {
// 		const now = new Date();
// 		const createdTime = new Date(timestamp);
// 		const timeDifference = now - createdTime;
// 		const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
// 		const minutesDifference = Math.floor(
// 			(timeDifference % (60 * 60 * 1000)) / (60 * 1000)
// 		);

// 		if (hoursDifference >= 24) {
// 			const daysDifference = Math.floor(hoursDifference / 24);
// 			return `${daysDifference} days ago`;
// 		} else if (hoursDifference > 0) {
// 			return `${hoursDifference} hours ago`;
// 		} else if (minutesDifference > 0) {
// 			return `${minutesDifference} minutes ago`;
// 		} else {
// 			return "just now";
// 		}
// 	}

// 	console.log(posts);

// 	return (
// 		<div>
// 			<MakePost />
// 			<div>
// 				{posts.map((po) => (
// 					<div key={po._id}>
// 						<div className="bg-[#fff] mx-2 md:m-8 mt-6  shadow-md rounded-lg py-4">
// 							{/* top bar */}
// 							<div className="px-4 flex justify-between items-center  bg-transparent">
// 								<div className="flex justify-center items-center bg-transparent">
// 									<div className="avatar">
// 										<div className="w-12 lg:w-16  rounded-full drop-shadow-md">
// 											<img
// 												src={po?.uploaderImage}
// 												onError={(e) => {
// 													e.target.src =
// 														"https://hpsnf.com/wp-content/uploads/2021/04/avatar.jpg";
// 												}}
// 												alt="avatar"
// 											/>{" "}
// 										</div>
// 									</div>
// 									<div className="flex flex-col ml-4 bg-transparent">
// 										<p className="text-xl md:text-2xl text-gray-600  font-semibold cursor-pointer bg-transparent">
// 											{po?.uploaderName}
// 										</p>
// 										<p className="text-sm md:text-lg text-gray-500 bg-transparent">
// 											{po.timeDifference}
// 										</p>
// 									</div>
// 								</div>

// 								<TiThMenu className="text-3xl text-gray-600 ml-2 font-semibold cursor-pointer bg-transparent " />
// 							</div>
// 							{/* top bar */}

// 							{/* body */}
// 							<div className="px-4">
// 								<PostContent content={po?.name} />

// 								<img
// 									src={po?.image}
// 									alt="post image"
// 									className="my-6 w-full rounded-md"
// 									loading="lazy"
// 									style={{
// 										display: po?.image ? "block" : "none",
// 									}}
// 								/>
// 							</div>
// 							<hr className="bg-gray-500 border-0 h-[1px] my-2" />
// 							<div className="px-4 flex justify-around items-center">
// 								<div className="flex justify-start items-center gap-8 w-full  mr-16">
// 									<AiFillHeart className="button-11" />
// 									{/* <LikeButton /> */}

// 									<FaComment className="text-gray-600 text-5xl" />
// 									<input
// 										type="text"
// 										placeholder="comment"
// 										className="input input-bordered border-gray-400 w-full focus:outline-0 bg-transparent rounded-md"
// 									/>
// 								</div>
// 								<div className="flex justify-center items-center gap-8 mr-4">
// 									<FaShare className="text-gray-600 text-4xl" />
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default NewsFeed;

import { CiMenuKebab } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
// import MakePost from "./MakePost";
import PostContent from "../../hook/PostContent";
import { Link } from "react-router-dom";
import MakePost from "./MakePost";
// import LikeButton from "../../button/LikeButton";

const NewsFeed = () => {
	const [comments, setComments] = useState([]);
	// console.log("🚀 ~ file: NewsFeed.jsx:12 ~ NewsFeed ~ comments:", comments);
	const [postsId, setPostsId] = useState("");
	// const [like, setLike] = useState(true);
	const [show, setShow] = useState(false);
	const [showId, setShowId] = useState(false);
	const [posts, setPosts] = useState([]);
	// console.log("🚀 ~ file: NewsFeed.jsx:18 ~ NewsFeed ~ posts:", posts);
	const [users, setUsers] = useState([]);
	// const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem("social_id");

	const [recom, setRecom] = useState("");

	const matchedUser = users.find((user) => user?._id === userId);
	// console.log(
	// 	"🚀 ~ file: NewsFeed.jsx:20 ~ NewsFeed ~ matchedUser:",
	// 	matchedUser
	// );

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
			})
			.catch((err) => {
				// console.log(err);
			});
	};

	useEffect(() => {
		// setLoading(true);
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				// console.log("data", data);
				const postsWithTimeDifference = data.map((post) => ({
					...post,
					timeDifference: getTimeDifference(post.createdAt),
				}));

				// Reverse the array to display new posts first
				const reversedPosts = postsWithTimeDifference.reverse();

				setPosts(reversedPosts);
				// setLoading(false);
			})
			.catch((err) => {
				// console.log(err.message);
			});
	}, []);

	useEffect(() => {
		axios("https://social-link-server-liard.vercel.app/comments").then(
			(res) => {
				const postsWithTimeDifference = res.data.map((com) => ({
					...com,
					timeDifferenceCom: getTimeDifferenceCom(com.createdAt),
				}));

				// Reverse the array to display new posts first
				const reversedPosts = postsWithTimeDifference.reverse();

				setComments(reversedPosts);
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

	return (
		<div>
			<div className="my-4 mt-12 mx-4 md:mx-8 ">
				<MakePost />
			</div>
			{posts.map((po) => (
				<div key={po._id}>
					<div className="bg-white  my-4 mx-4 md:mx-8  shadow-md rounded-lg py-4">
						{/* top bar */}
						<div className="flex justify-between items-center mx-4">
							<div className="flex justify-center items-center bg-transparent">
								<div className="avatar">
									<div className="w-10 lg:w-16 rounded-full z-10 object-cover">
										<img
											src={po?.uploaderImage}
											alt="person"
										/>
									</div>
								</div>
								<div className="flex flex-col ml-4 bg-transparent">
									<Link
										className="text-xl text-gray-600  font-semibold cursor-pointer bg-transparent hover:underline"
										to={`/profilePage/${po?.userName}`}
									>
										{po?.uploaderName}
									</Link>
									<p className="text-sm text-gray-500">
										{po.timeDifference}
									</p>
								</div>
							</div>

							<CiMenuKebab className="text-3xl text-gray-600 ml-2 font-semibold cursor-pointer bg-transparent" />
						</div>
						{/* top bar */}
						{/* body */}
						<div className="mx-4 mt-8  bg-transparent mb-5">
							<PostContent content={po?.name} />

							<img
								src={po?.image}
								alt="post image"
								className="my-4 w-full"
								loading="lazy"
								style={{
									display: po?.image ? "block" : "none",
								}}
							/>
						</div>
						<hr className="bg-gray-400 border-0 h-[1px] my-2" />

						{/* comment and like button */}
						<div className="flex justify-around items-center">
							<div className="flex justify-start items-center gap-8 w-full mx-4 mr-16">
								<div className="flex items-center justify-center gap-1">
									<button
										onClick={() => {
											fetch(
												"https://social-link-server-liard.vercel.app/posts/like",
												{
													method: "PUT",
													headers: {
														"Content-Type":
															"application/json",
													},
													body: JSON.stringify({
														postId: po?._id,
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
										<AiFillHeart className="text-3xl text-slate-400 cursor-pointer" />
									</button>
									<p>{po?.likes}</p>
								</div>

								<FaComment className="text-gray-600 text-2xl" />
								<form
									onSubmit={onSubmit}
									className="flex items-center"
								>
									<input
										type="text"
										name="comment"
										onChange={() => setPostsId(po?._id)}
										placeholder="comment"
										className="input border border-e-0 rounded-e-none border-gray-400 w-full outline-none focus:outline-0 bg-white rounded-md"
									/>
									<input
										type="submit"
										value="submit"
										className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-lg font-semibold  hover:bg-opacity-80 duration-300 border border-gray-400 border-s-0 rounded-s-none rounded-md py-[9px] pr-2"
									/>
								</form>
							</div>
							<div className="flex justify-center items-center gap-8 mr-4">
								<FaShare className="text-gray-600 text-2xl" />
							</div>
						</div>

						{/* view comment section */}
						{comments.filter(
							(comment) => comment.post_id === po?._id
						).length > 0 && (
							<div className="flex justify-center items-center">
								<button
									onClick={() => {
										setShow(!show);
										setShowId(po?._id);
									}}
									className="hover:underline pt-3"
								>
									view comment
								</button>
							</div>
						)}
						{show && showId === po?._id && (
							<div
								className={`${
									comments?.filter(
										(comment) => comment?.post_id == po?._id
									).length > 5
										? "h-92 overflow-y-auto"
										: ""
								}`}
							>
								{comments
									?.filter((com) => com?.post_id === po?._id)
									.map((com) => (
										<div
											className=" text-gray-600 font-semibold px-4 py-1 my-2 grid grid-cols-7"
											key={com?._id}
										>
											<div className="avatar flex justify-center items-center">
												<div className="h-7 lg:h-12 rounded-full z-10 object-cover drop-shadow-md">
													<img
														src={com?.user_image}
														alt="commenter avatar"
													/>
												</div>
											</div>
											<div className="col-span-6 bg-[#e5e7eb] flex flex-col gap-1 pl-3 rounded-md shadow-sm">
												<div className="flex justify-start items-center gap-2">
													<h4 className="font-bold">
														{com?.user_name}
													</h4>
													<span className="text-sm text-gray-400">
														-{" "}
														{com?.timeDifferenceCom}
													</span>
												</div>
												<div className="">
													<h1>{com?.comment}</h1>
												</div>
											</div>
										</div>
									))}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default NewsFeed;
