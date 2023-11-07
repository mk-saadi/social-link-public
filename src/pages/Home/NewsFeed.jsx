import { CiMenuKebab } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "../../hook/PostContent";
import { Link } from "react-router-dom";
import MakePost from "./MakePost";
import StoryNav from "./StoryNav";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const NewsFeed = ({ updatePostCount }) => {
	// const [like, setLike] = useState(true);
	const [comments, setComments] = useState([]);
	const [postsId, setPostsId] = useState("");
	const [show, setShow] = useState(false);
	const [showId, setShowId] = useState(false);
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [include, setInclude] = useState([]);
	const [recom, setRecom] = useState("");
	const [newPostsAvailable, setNewPostsAvailable] = useState(false);
	// const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem("social_id"); // CURRENT USER

	const matchedUser = users.find((user) => user?._id === userId);

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
				// console.log(err);
			});
	};
	const [fetchedPosts, setFetchedPosts] = useState([]);
	// Function to fetch posts
	const fetchPosts = () => {
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				const postsWithTimeDifference = data.map((post) => ({
					...post,
					timeDifference: getTimeDifference(post.createdAt),
				}));

				const reversedPosts = postsWithTimeDifference.reverse();

				if (reversedPosts.length > posts.length) {
					setNewPostsAvailable(true);
					setFetchedPosts(reversedPosts); // Store fetched posts in a new state variable

					// If posts state is empty (i.e., page has just loaded), set it directly
					if (posts.length === 0) {
						setPosts(reversedPosts);
					}
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		// Fetch posts immediately when the page loads
		fetchPosts();

		// Then start the interval
		const interval = setInterval(fetchPosts, 10000);

		return () => clearInterval(interval);
	}, [posts]);

	const handleButtonClick = () => {
		setNewPostsAvailable(false);
		setPosts(fetchedPosts); // Update posts state with fetched posts when user clicks on the toast
		window.scrollTo(0, 0);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// >> main fetch function
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		axios
	// 			.get("https://social-link-server-liard.vercel.app/posts")
	// 			.then((res) => res.data)
	// 			.then((data) => {
	// 				const postsWithTimeDifference = data.map((post) => ({
	// 					...post,
	// 					timeDifference: getTimeDifference(post.createdAt),
	// 				}));

	// 				const reversedPosts = postsWithTimeDifference.reverse();

	// 				if (reversedPosts.length > posts.length) {
	// 					setNewPostsAvailable(true);
	// 					setPosts(reversedPosts);
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				console.error(err);
	// 			});
	// 	}, 60000);

	// 	return () => clearInterval(interval);
	// }, [posts]);

	// const handleButtonClick = () => {
	// 	// setNewPostsAvailable(false);
	// 	setNewPostsAvailable(false); // Close the notification
	// 	window.scrollTo(0, 0); // Scroll to the top of the page
	// };

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

	const filteredPosts = posts.filter((post) => {
		return include?.concat(userId).includes(post.uploaderId);
	});

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

	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.pageYOffset);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="relative">
			<div className="mb-4 mx-4 md:mx-8">
				<StoryNav />
			</div>

			{newPostsAvailable && scrollPosition > 0 && (
				<div className="fixed top-16 lg:top-28 text-rose-400">
					<div
						className="toast toast-top toast-center mt-12 lg:mt-16"
						style={{ zIndex: "9999" }}
					>
						<div className="alert bg-white text-gray-600 font-semibold rounded-md shadow-md border-0 ml-[10px]">
							<p className="flex justify-center items-center">
								New post available.{" "}
								<span>
									<CloseRoundedIcon
										onClick={handleButtonClick}
										className="text-xl"
									/>
								</span>
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="my-4 mt-12 mx-4 md:mx-8">
				<MakePost updatePostCount={updatePostCount} />
			</div>
			{filteredPosts.map((po) => (
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

							<CiMenuKebab className=" text-2xl lg:text-3xl text-gray-600 ml-2 font-semibold cursor-pointer bg-transparent" />
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
										className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-lg font-semibold  hover:bg-opacity-80 duration-300 border border-gray-400 border-s-0 rounded-s-none rounded-md py-[9px] px-4"
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
										? "max-h-[350px] overflow-y-auto duration-200"
										: ""
								}`}
							>
								{comments
									?.filter((com) => com?.post_id === po?._id)
									.map((com) => (
										<div
											className=" text-gray-600 font-semibold pr-2 lg:px-4 py-1 my-2 grid grid-cols-7"
											key={com?._id}
										>
											<div className="avatar flex justify-center items-center">
												<div className="h-8 -mt-4 lg:mt-0 lg:h-12 rounded-full z-10 object-cover drop-shadow-md">
													<img
														src={com?.user_image}
														alt="commenter avatar"
													/>
												</div>
											</div>
											<div className="col-span-6 bg-[#e5e7eb] flex flex-col gap-1 pl-3 rounded-md shadow-sm">
												<div className="flex justify-start items-center gap-2">
													<Link
														className="font-bold hover:underline"
														to={`/profilePage/${com?.userName}`}
													>
														{com?.user_name}
													</Link>
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
