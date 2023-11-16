import axios from "axios";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsJournalBookmarkFill, BsArrowThroughHeartFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import PostContent from "../../hook/PostContent";
import { AiOutlineArrowUp } from "react-icons/ai";
import { MdReport } from "react-icons/md";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { SiAdblock } from "react-icons/si";
import { ImBlocked, ImEyeBlocked } from "react-icons/im";
import Toast from "../../hook/Toast";
import useToast from "../../hook/useToast";
import TopNavbar from "../../component/shared/TopNavbar";

const ViewPost = () => {
	const { id } = useParams();
	const [po, setPost] = useState([]);
	const [postsId, setPostsId] = useState("");
	const [users, setUsers] = useState([]);
	const [isFormVisible, setFormVisible] = useState(true);
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const userId = localStorage.getItem("social_id"); // CURRENT USER
	const [show, setShow] = useState(false);
	const [showId, setShowId] = useState(false);
	const [recom, setRecom] = useState("");
	const [comments, setComments] = useState([]);

	const matchedUser = users.find((user) => user?._id === userId);

	useEffect(() => {
		axios("https://social-link-server-liard.vercel.app/users").then(
			(res) => {
				setUsers(res.data);
			}
		);
	}, []);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(
					`https://social-link-server-liard.vercel.app/posts/${id}`
				);
				const data = response.data;
				// const postsWithTimeDifference = data.map((post) => ({
				// 	...post,
				// 	timeDifference: getTimeDifference(post.createdAt),
				// }));
				setPost(data);
			} catch (error) {
				console.error("Error fetching post:", error);
			}
		};

		fetchPost();
	}, [id]);

	// for post
	// function getTimeDifference(timestamp) {
	// 	const now = new Date();
	// 	const createdTime = new Date(timestamp);
	// 	const timeDifference = now - createdTime;
	// 	const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
	// 	const minutesDifference = Math.floor(
	// 		(timeDifference % (60 * 60 * 1000)) / (60 * 1000)
	// 	);

	// 	if (hoursDifference >= 24) {
	// 		const daysDifference = Math.floor(hoursDifference / 24);
	// 		return `${daysDifference} days ago`;
	// 	} else if (hoursDifference > 0) {
	// 		return `${hoursDifference} hours ago`;
	// 	} else if (minutesDifference > 0) {
	// 		return `${minutesDifference} minutes ago`;
	// 	} else {
	// 		return "just now";
	// 	}
	// }

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
		<div className="min-h-screen ">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<TopNavbar />

			<div className="grid items-center justify-center grid-cols-8">
				<div className="lg:col-span-2"></div>
				<div className="col-span-8 py-4 mx-4 my-4 bg-white rounded-lg shadow-md md:col-span-6 lg:col-span-4 md:mx-8">
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
								<li>
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
									<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb] whitespace-nowrap">
										<ImEyeBlocked className="text-2xl " />
										Hide post
									</p>
								</li>
								<li>
									<p className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]">
										<ImBlocked className="text-2xl " />
										Hide all post from {po?.uploaderName}
									</p>
								</li>
								<li>
									<a
										href="#post-modal-block"
										className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#e5e7eb]"
										// htmlFor="my_modal_7"
										// htmlFor={`modal_${po._id}`}
										// onClick={() => openModal(po._id)}
									>
										<SiAdblock className="text-2xl " />
										Block {po?.uploaderName}
									</a>
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

					{/* block post */}
					{/* <input
							type="checkbox"
							id="my_modal_7"
							// id={`modal_${po._id}`}
							className="modal-toggle"
						/> */}
					{/*<div
							className="modal"
							// id={`modal_${po._id}`}
						>
							<div className="bg-white rounded-md modal-box">
								<h3 className="text-xl font-bold text-gray-600">
									Block!
								</h3>
								<p className="mt-4 mb-8 font-semibold text-gray-600">
									Are you sure you want to block{" "}
									{po?.uploaderName}?
								</p>
								<div className="flex items-center justify-between text-base">
									<div className="modal-action">
										<label
											htmlFor="my_modal_7"
											// htmlFor={`modal_${po._id}`}
											// className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 -mt-6 px-5"
											className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md"
										>
											Go back
										</label>
									</div>
									<button className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300">
										Block
									</button>
								</div>
							</div>
						</div> */}
					<div
						id="post-modal-block"
						className="modal"
					>
						<div className="bg-white rounded-md modal-box">
							<h3 className="text-xl font-bold text-gray-600">
								Block!
							</h3>
							<p className="mt-4 mb-8 font-semibold text-gray-600">
								Are you sure you want to block{" "}
								{po?.uploaderName}?{" "}
								{/* getting the first uploaderName in the first index of the post data collection, both are not the same  */}
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
					</div>

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
					<div className="mx-4 mt-8 mb-5 bg-transparent">
						<PostContent content={po?.name} />

						<img
							src={po?.image}
							alt="post image"
							className="w-full my-4"
							loading="lazy"
							style={{
								display: po?.image ? "block" : "none",
							}}
						/>
					</div>
					<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px]" />

					{/* comment and like button */}
					<div className="flex items-center justify-around h-full">
						<div className="flex items-center justify-center w-full duration-300  text-slate-500 gap-2 cursor-pointer hover:bg-[#e5e7eb] py-2 ">
							<button
								className="flex items-center justify-center gap-2"
								onClick={(postId) => {
									fetch(
										`https://social-link-server-liard.vercel.app/posts/like/${postId}`,
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
								<AiFillHeart className="text-2xl cursor-pointer xl:text-3xl lg:text-lg text-slate-500" />{" "}
								Like
								<p>{po?.likes}</p>
							</button>
						</div>
						<button
							className="flex items-center justify-center w-full duration-300  text-slate-500 gap-2 cursor-pointer hover:bg-[#e5e7eb] py-2 "
							onClick={() => {
								setShow(!show);
								setShowId(po?._id);
							}}
						>
							<FaComment className="text-2xl cursor-pointer xl:text-3xl lg:text-lg text-slate-500" />{" "}
							Comment
						</button>
						<div className="flex items-center justify-center w-full duration-300  text-slate-500 gap-2 cursor-pointer hover:bg-[#e5e7eb] py-2 ">
							<FaShare className="text-2xl cursor-pointer xl:text-2xl lg:text-lg" />{" "}
							Share
						</div>
					</div>

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
							<form
								onSubmit={onSubmit}
								className="flex items-center p-2"
							>
								<input
									type="text"
									name="comment"
									onChange={() => setPostsId(po?._id)}
									placeholder="comment"
									className="w-full p-2 bg-white border border-gray-400 rounded-md outline-none max-h-10 input border-e-0 rounded-e-none focus:outline-0 placeholder:text-sm placeholder:lg:text-base"
								/>
								<button
									type="submit"
									className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-xl lg:text-2xl font-semibold  hover:bg-opacity-80 duration-300 border border-gray-400 border-s-0 rounded-s-none rounded-md py-[9px] lg:py-[7px] px-4"
								>
									<FaComment />
								</button>
								{/* <input
										type="submit"
										value="submit"
										className="text-gray-600 hover:bg-[#e5e7eb] cursor-pointer text-sm lg:text-lg font-semibold  hover:bg-opacity-80 duration-300 border border-gray-400 border-s-0 rounded-s-none rounded-md py-[9px] px-4"
									/> */}
							</form>
							{comments
								?.filter((com) => com?.post_id === po?._id)
								.map((com) => (
									<div
										className="grid grid-cols-7 py-1 pr-2 my-2 font-semibold text-gray-600 lg:px-4"
										key={com?._id}
									>
										<div className="flex items-center justify-center avatar">
											<div className="z-10 object-cover h-8 -mt-4 rounded-full lg:mt-0 lg:h-12 drop-shadow-md">
												<img
													src={com?.user_image}
													alt="commenter avatar"
												/>
											</div>
										</div>
										<div className="col-span-6 bg-[#e5e7eb] flex flex-col gap-1 pl-3 rounded-md shadow-sm">
											<div className="flex items-center justify-start gap-2">
												<Link
													className="font-bold hover:underline"
													to={`/profilePage/${com?.userName}`}
												>
													{com?.user_name}
												</Link>
												<span className="text-sm text-gray-400">
													- {com?.timeDifferenceCom}
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
				<div className="lg:col-span-2"></div>
			</div>
		</div>
	);
};

export default ViewPost;
