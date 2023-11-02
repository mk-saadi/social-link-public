import { TiThMenu } from "react-icons/ti";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import MakePost from "./MakePost";
import PostContent from "../../hook/PostContent";
// import LikeButton from "../../button/LikeButton";

const NewsFeed = () => {
	const [posts, setPosts] = useState([]);
	// const [loading, setLoading] = useState(true);

	useEffect(() => {
		// setLoading(true);
		axios
			.get("https://social-link-server-liard.vercel.app/posts")
			.then((res) => res.data)
			.then((data) => {
				console.log("data", data);
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
				console.log(err.message);
			});
	}, []);

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

	return (
		<div>
			<MakePost />
			<div>
				{posts.map((po) => (
					<div key={po._id}>
						<div className="bg-[#fff] mx-2 md:m-8 mt-6  shadow-md rounded-lg py-4">
							{/* top bar */}
							<div className="px-4 flex justify-between items-center  bg-transparent">
								<div className="flex justify-center items-center bg-transparent">
									<div className="avatar">
										<div className="w-12 lg:w-16  rounded-full drop-shadow-md">
											<img
												src={po?.uploaderImage}
												onError={(e) => {
													e.target.src =
														"https://hpsnf.com/wp-content/uploads/2021/04/avatar.jpg";
												}}
												alt="avatar"
											/>{" "}
										</div>
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

								<TiThMenu className="text-3xl text-gray-600 ml-2 font-semibold cursor-pointer bg-transparent " />
							</div>
							{/* top bar */}

							{/* body */}
							<div className="px-4">
								<PostContent content={po?.name} />

								<img
									src={po?.image}
									alt="post image"
									className="my-6 w-full rounded-md"
									loading="lazy"
									style={{
										display: po?.image ? "block" : "none",
									}}
								/>
							</div>
							<hr className="bg-gray-500 border-0 h-[1px] my-2" />
							<div className="px-4 flex justify-around items-center">
								<div className="flex justify-start items-center gap-8 w-full  mr-16">
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
				))}
			</div>
		</div>
	);
};

export default NewsFeed;
