/* eslint-disable react/prop-types */
import { CiMenuKebab } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "../../hook/PostContent";
import { Link } from "react-router-dom";
import MakePost from "./MakePost";
import StoryNav from "./StoryNav";
import { BsArrowThroughHeartFill, BsJournalBookmarkFill } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { SiAdblock } from "react-icons/si";
import { RiUserUnfollowFill } from "react-icons/ri";
import { ImEyeBlocked } from "react-icons/im";
import Toast from "../../hook/Toast";
import useToast from "../../hook/useToast";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "white",
	borderRadius: "7px",
	// border: "2px solid #000",
	// boxShadow: 24,
	p: 4,
};
const NewsFeed = ({ updatePostCount }) => {
	// const [like, setLike] = useState(true);
	const [postsId, setPostsId] = useState("");
	const [show, setShow] = useState(false);
	const [showId, setShowId] = useState(false);
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [include, setInclude] = useState([]);
	const [recom, setRecom] = useState("");
	const [comments, setComments] = useState([]);
	const [newPostsAvailable, setNewPostsAvailable] = useState(false);
	// const [fetchedPosts, setFetchedPosts] = useState([]);
	// const [showToasts, setShowToast] = useState(true); // initial value was "true"
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [isFormVisible, setFormVisible] = useState(true);

	// material modal
	const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const customBackdropStyle = {
		backgroundColor: "rgba(0, 0, 0, 0.192)",
		opacity: 0.2,
	};

	const [uploaderName, setUploaderName] = useState("");

	const handleOpen = (uploaderName) => {
		setOpen(true);
		setUploaderName(uploaderName);
	};

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
				console.log(err);
			});
	};

	// Function to fetch posts ! DO NOT DELETE THIS FUNCTION - mk saadi
	// const fetchPosts = () => {
	// 	axios
	// 		.get("https://social-link-server-liard.vercel.app/posts")
	// 		.then((res) => res.data)
	// 		.then((data) => {
	// 			const postsWithTimeDifference = data.map((post) => ({
	// 				...post,
	// 				timeDifference: getTimeDifference(post.createdAt),
	// 			}));

	// 			const reversedPosts = postsWithTimeDifference.reverse();

	// 			if (reversedPosts.length > posts.length) {
	// 				setNewPostsAvailable(true);
	// 				setFetchedPosts(reversedPosts); // Store fetched posts in a new state variable

	// 				// If posts state is empty (i.e., page has just loaded), set it directly
	// 				// setShowToast(true); // Set the alert/toast flag to show on new posts
	// 				if (posts.length === 0) {
	// 					setPosts(reversedPosts);
	// 				}
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// };

	// useEffect(() => {
	// 	// Fetch posts immediately when the page loads
	// 	fetchPosts();

	// 	// Then start the interval
	// 	const interval = setInterval(fetchPosts, 5000);

	// 	return () => clearInterval(interval);
	// }, [posts]);

	// const handleButtonClick = () => {
	// 	// setShowToast(false);

	// 	setNewPostsAvailable(false);
	// 	setPosts(fetchedPosts); // Update posts state with fetched posts when user clicks on the toast
	// 	window.scrollTo(0, 0);
	// };

	// >> main fetch function
	useEffect(() => {
		const interval = setInterval(() => {
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
						setPosts(reversedPosts);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}, 5000);

		return () => clearInterval(interval);
	}, [posts]);

	const handleButtonClick = () => {
		// setNewPostsAvailable(false);
		setNewPostsAvailable(false); // Close the notification
		window.scrollTo(0, 0); // Scroll to the top of the page
	};

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

	const handleUnfollow = (unfollowId) => {
		showToast("loading", `Please wait!`);

		axios
			.delete(`https://social-link-server-liard.vercel.app/follow`, {
				data: { followerId: userId, unfollowId: unfollowId },
			})
			.then((response) => {
				if (response.data.success) {
					const updatedPosts = posts.filter(
						(post) => post.uploaderId !== unfollowId
					);
					// Update the posts state
					setPosts(updatedPosts);
					showToast("success", "Unfollow successful!");
				}
			})
			.catch((err) => {
				console.log(err.message);
				showToast("error", "Unfollow unsuccessful!");
			});
	};

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

	useEffect(() => {
		if (newPostsAvailable && scrollPosition > 0) {
			// Set a timeout to hide the toast after 4 seconds
			const timeoutId = setTimeout(() => {
				setNewPostsAvailable(false);
			}, 4000);

			// Clear the timeout when the component unmounts or the dependencies change
			return () => clearTimeout(timeoutId);
		}
	}, [newPostsAvailable, scrollPosition]);

	const handleReport = (event, postId, userName, name, image) => {
		event.preventDefault();

		showToast("loading", "Please wait!");

		const form = event.target;
		const reportType = form["radio-1"].value;

		const report = {
			reportType,
			postId,
			reporter: matchedUser?.userName,
			postMaker: userName,
			body: name,
			postImage: image,
		};

		if (report === "" || null) {
			return showToast("error", "Please try again!");
		}

		event.target.reset(); // Resets the form fields

		axios
			.post("https://social-link-server-liard.vercel.app/report", report)
			.then((res) => {
				showToast("success", "Reported!");
				setFormVisible(false);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				showToast("error", "Failed to report!");
			});
	};

	const saveHandle = (postId, userName) => {
		axios.post("https://social-link-server-liard.vercel.app/savePost", {
			postId: postId,
			userName: userName,
		});
		showToast("success", "Post saved!");
	};

	return (
		<div className="relative">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<div className="mx-4 mb-4 md:mx-8 h-36">
				<StoryNav />
			</div>

			{newPostsAvailable && scrollPosition > 0 && (
				<div className="fixed top-16 lg:top-28 text-rose-400">
					<div
						className="mt-12 toast toast-top toast-center lg:mt-16"
						style={{ zIndex: "9999" }}
					>
						<div className="alert bg-white text-gray-600 font-semibold rounded-md shadow-md border-0 ml-[10px]">
							<p className="flex items-center justify-center gap-2">
								New post available.{" "}
								<span>
									<AiOutlineArrowUp
										onClick={handleButtonClick}
										className="text-xl"
									/>
								</span>
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="mx-4 my-4 mt-12 md:mx-8">
				<MakePost updatePostCount={updatePostCount} />
			</div>

			{filteredPosts.map((po) => (
				<div key={po._id}>
					<div className="pt-4 mx-4 my-4 bg-white rounded-lg shadow-md md:mx-8 border-4 border-[#7C9D96]">
						{/* top bar */}
						<div className="flex items-center justify-between mx-4">
							<div className="flex items-center justify-center bg-transparent">
								<div className="avatar">
									<div className="z-10 object-cover w-10 rounded-full lg:w-16">
										<img
											src={po?.uploaderImage}
											alt="person"
										/>
									</div>
								</div>
								<div className="flex flex-col ml-4 bg-transparent">
									<Link
										className="text-base font-semibold text-gray-600 bg-transparent cursor-pointer md:text-lg hover:underline"
										to={`/profilePage/${po?.userName}`}
									>
										{po?.uploaderName}
									</Link>
									<p className="text-xs text-gray-500 md:text-sm">
										{po.timeDifference}
									</p>
								</div>
							</div>

							{/* <CiMenuKebab className="ml-2 text-2xl font-semibold text-gray-600 bg-transparent cursor-pointer lg:text-3xl" /> */}
							<details className="dropdown dropdown-end">
								<summary
									// onClick={toggleDropdown}
									className="ml-1 text-xl btn btn-circle btn-ghost"
								>
									<CiMenuKebab />
								</summary>

								<div className="p-2 shadow-lg drop-shadow-lg menu dropdown-content z-[1] bg-white rounded-md w-80 text-gray-600 font-semibold">
									<li
										onClick={() =>
											saveHandle(
												po._id,
												matchedUser.userName
											)
										}
									>
										<p className="flex items-center gap-4 rounded-md hover:[#e5e7eb]">
											<BsJournalBookmarkFill className="text-2xl " />{" "}
											Save Post
										</p>
									</li>
									<li>
										<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb] whitespace-nowrap">
											<BiEdit className="text-2xl " />
											Request edit to the post
										</p>
									</li>
									<li>
										<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]">
											<ImEyeBlocked className="text-2xl " />
											Hide all post from{" "}
											{po?.uploaderName}
										</p>
									</li>
									<li
										onClick={() =>
											handleUnfollow(po.uploaderId)
										}
									>
										<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]">
											<RiUserUnfollowFill className="text-2xl " />
											Unfollow {po?.uploaderName}
										</p>
									</li>
									<li>
										<button
											// href="#post-modal-block"
											className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]"
											// htmlFor="my_modal_7"
											// htmlFor={`modal_${po._id}`}
											// onClick={() => openModal(po._id)}
											onClick={() =>
												handleOpen(po.uploaderName)
											}
										>
											<SiAdblock className="text-2xl " />
											Block {po?.uploaderName}
										</button>
									</li>
									<li>
										<label
											className="flex items-center gap-4 rounded-md hover:[#e5e7eb]"
											// htmlFor="my_modal_6"
											htmlFor={`modal_${po._id}`}
										>
											<MdReport className="text-2xl " />{" "}
											Report to admin
										</label>
									</li>
								</div>
							</details>
						</div>

						{/* block user */}
						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							open={open}
							onClose={handleClose}
							closeAfterTransition
							slots={{ backdrop: Backdrop }}
							slotProps={{
								backdrop: {
									style: customBackdropStyle, // Apply the custom backdrop style
									timeout: 500,
								},
							}}
						>
							<Fade in={open}>
								<Box sx={style}>
									<Typography
										id="transition-modal-title"
										variant="h6"
										component="h2"
									>
										Text in a modal
									</Typography>
									<Typography
										id="transition-modal-description"
										sx={{ mt: 2 }}
									>
										Are you sure that you want to block{" "}
										{uploaderName}
									</Typography>
								</Box>
							</Fade>
						</Modal>

						{/* <div
							id="post-modal-block"
							className="modal"
						>
							<div className="bg-white rounded-md modal-box">
								<h3 className="text-xl font-bold text-gray-600">
									Block!
								</h3>
								<p className="mt-4 mb-8 font-semibold text-gray-600">
									Are you sure you want to block
								</p>
								<div className="flex items-center justify-between text-base">
									<div className="modal-action">
										<a
											// htmlFor="my_modal_7"
											// className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 -mt-6 px-5"
											href="#"
											className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md modal__close "
										>
											Go back
										</a>
									</div>
									<button className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300">
										Block
									</button>
								</div>
							</div>
						</div> */}

						{/* report post to admin modal */}
						<input
							type="checkbox"
							// id="my_modal_6"
							id={`modal_${po._id}`}
							className="modal-toggle"
						/>
						{isFormVisible && (
							<div className="modal">
								<div className="relative bg-white rounded-md modal-box">
									{/* body starts here */}
									<h3 className="text-xl font-semibold text-gray-600">
										Report post {po.uploaderName}
									</h3>
									<form
										// onSubmit={handleReport}
										onSubmit={(event) =>
											handleReport(
												event,
												po?._id,
												po?.userName,
												po.name,
												po?.image
											)
										}
										className="font-semibold text-gray-600"
									>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="misinformation"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Misinformation</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="spam"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Spam or misleading</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="bullying"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Harassment or bullying</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="hateful"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Hateful or abusive content</p>
										</div>
										<div className="flex items-center justify-start gap-2 my-4">
											<input
												value="harmful"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Harmful or dangerous acts</p>
										</div>
										<div className="flex items-center justify-start gap-2 mt-4 mb-8">
											<input
												value="terrorism"
												type="radio"
												name="radio-1"
												className="radio radio-primary"
											/>
											<p>Promotes terrorism</p>
										</div>
										<div className="flex items-center justify-end">
											<input
												type="submit"
												value="Submit"
												className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 text-base"
											/>
										</div>
									</form>

									<div className="absolute bottom-6 left-6 modal-action">
										<label
											// htmlFor="my_modal_6"
											htmlFor={`modal_${po._id}`}
											className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md"
										>
											Go back
										</label>
									</div>
								</div>
							</div>
						)}
						{/* top bar */}

						{/* body */}
						<div className="mt-8 mb-5 bg-transparent">
							<Link to={`/viewPost/${po?._id}`}>
								<div className="mx-4">
									<PostContent content={po?.name} />
								</div>

								<img
									src={po?.image}
									alt="post image"
									className="w-full my-4"
									loading="lazy"
									style={{
										display: po?.image ? "block" : "none",
									}}
								/>
							</Link>
						</div>
						<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px]" />

						{/* comment and like button */}
						<div className="flex items-center justify-around h-full">
							<div className="flex items-center justify-center w-full duration-300  text-[#7C9D96] gap-2 cursor-pointer hover:bg-[#e5e7eb] py-2 ">
								<button
									className="flex items-center justify-center gap-2"
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
									<AiFillHeart className="text-2xl cursor-pointer xl:text-3xl lg:text-lg text-[#7C9D96]" />{" "}
									Like
									<p>{po?.likes}</p>
								</button>
							</div>
							<button
								className="flex items-center justify-center w-full duration-300  text-[#7C9D96] gap-2 cursor-pointer hover:bg-[#e5e7eb] py-2 "
								onClick={() => {
									setShow(!show);
									setShowId(po?._id);
								}}
							>
								<FaComment className="text-2xl cursor-pointer xl:text-3xl lg:text-lg text-[#7C9D96]" />{" "}
								Comment
							</button>
							<div className="flex items-center justify-center w-full duration-300  text-[#7C9D96] gap-2 cursor-pointer hover:bg-[#e5e7eb] py-3">
								<FaShare className="text-2xl cursor-pointer xl:text-2xl lg:text-lg" />{" "}
								Share
							</div>
						</div>

						{show && showId === po?._id && (
							<div
								className={`${
									comments?.filter(
										(comment) =>
											comment?.post_id === po?._id
									).length > 5
										? "max-h-[350px] overflow-y-auto duration-200"
										: ""
								}`}
							>
								<form
									onSubmit={onSubmit}
									className="flex items-center p-2"
								>
									<input
										type="text"
										name="comment"
										onChange={() => setPostsId(po?._id)}
										placeholder="comment"
										className="w-full p-2 bg-white border border-gray-300 rounded-md outline-none max-h-10 input border-e-0 rounded-e-none focus:outline-0 placeholder:text-xs placeholder:lg:text-sm text-gray-600 text-sm"
									/>
									<button
										type="submit"
										className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-xl lg:text-2xl font-semibold  hover:bg-opacity-80 duration-300 border border-gray-300 border-s-0 rounded-s-none rounded-md py-[9px] lg:py-[7px] px-4"
									>
										<FaComment />
									</button>
									{/* <input
										type="submit"
										value="submit"
										className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-sm lg:text-lg font-semibold  hover:bg-opacity-80 duration-300 border border-gray-400 border-s-0 rounded-s-none rounded-md py-[9px] px-4"
									/> */}
								</form>
								<div className=" bg-[#7C9D96]">
									{comments
										?.filter(
											(com) => com?.post_id === po?._id
										)
										.map((com) => (
											<div
												className="grid grid-cols-7 py-1 pr-2 mt-2 font-semibold text-gray-600 lg:px-4"
												key={com?._id}
											>
												<div className="flex items-center justify-center avatar">
													<div className="z-10 object-cover h-8 -mt-4 rounded-full lg:mt-0 lg:h-12 drop-shadow-md">
														<img
															src={
																com?.user_image
															}
															alt="commenter avatar"
														/>
													</div>
												</div>
												<div className="col-span-6 bg-[#e5e7eb] flex flex-col gap-1 pl-3 rounded-md shadow-md">
													<div className="flex items-center justify-start gap-2">
														<Link
															className="text-sm font-bold hover:underline"
															to={`/profilePage/${com?.userName}`}
														>
															{com?.user_name}
														</Link>
														<span className="text-xs text-gray-400">
															-{" "}
															{
																com?.timeDifferenceCom
															}
														</span>
													</div>
													<div className="text-sm">
														<h1>{com?.comment}</h1>
													</div>
												</div>
											</div>
										))}
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default NewsFeed;
