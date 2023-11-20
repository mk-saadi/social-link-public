import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostContents1 from "../../hook/PostContents1";
import Toast from "../../hook/Toast";
import useToast from "../../hook/useToast";

const Blog = () => {
	const [blog, setBlog] = useState([]);
	const { title } = useParams();
	const [user, setUser] = useState([]);
	const [users, setUsers] = useState([]);
	const [followers, setFollowers] = useState([]);
	const userId = localStorage.getItem("social_id");
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const response = await axios.get(
					`https://social-link-server-liard.vercel.app/blogs/${title}`
				);
				setBlog(response.data);
			} catch (error) {
				console.error("Error fetching post:", error);
			}
		};

		fetchBlog();
	}, [title]);

	const blogUserName = blog?.userName;

	useEffect(() => {
		try {
			axios("https://social-link-server-liard.vercel.app/users").then(
				(res) => {
					const data = res.data;
					const filterUser = data.find(
						(da) => da.userName === blogUserName
					);
					setUser(filterUser);
					setUsers(data);
				}
			);
		} catch (error) {
			console.log(error.message);
		}
	}, [blogUserName]);

	const [readingTime, setReadingTime] = useState(null);

	useEffect(() => {
		if (blog?.name) {
			const result = estimateReadingTime(blog.name);
			setReadingTime(result);
		}
	}, [blog]);

	const estimateReadingTime = (paragraph) => {
		const wordsPerMinute = 200;
		const words = paragraph.split(/\s+/);
		const wordCount = words.length;
		const minutes = Math.ceil(wordCount / wordsPerMinute);

		return {
			wordCount,
			estimatedTime: minutes,
		};
	};

	useEffect(() => {
		try {
			axios
				.get("https://social-link-server-liard.vercel.app/follow")
				.then((res) => {
					const data = res.data;

					const followers = data.filter((item) =>
						item?.followingIds?.includes(user?._id)
					);

					const followerId = followers.map((foll) => foll.followerId);

					const followerDetails = users.filter((user) =>
						followerId.includes(user?._id)
					);
					setFollowers(followerDetails);
				});
		} catch (error) {
			console.log(error);
		}
	}, [users, user]);

	return (
		<div className="min-h-screen">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<div className="mt-[70px] bg-white mx-auto max-w-3xl p-5 rounded-md my-5">
				<div className="rounded-md">
					<div>
						<div className="relative">
							<div className="w-full avatar">
								<div className="object-cover w-full rounded-md shadow-md h-[450px] drop-shadow">
									<img
										src={blog?.image}
										alt="Blog Image"
									/>
								</div>
							</div>
							<div className="absolute z-50 w-full bg-gray-200 bottom-[6px] bg-opacity-40 backdrop-blur-sm rounded-b-md">
								<h3 className="p-4 text-3xl font-semibold text-white ">
									{blog.title}
								</h3>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between p-2 my-4 bg-gray-200 rounded-md shadow-sm">
								<div className="flex items-center justify-center gap-3">
									<div className="avatar">
										<div className="object-cover rounded-full w-14">
											<img
												src={user?.image}
												alt="blog author image"
											/>
										</div>
									</div>
									<div>
										<Link
											to={`/profilePage/${user?.userName}`}
											className="font-semibold text-gray-600 hover:underline"
										>
											{user?.name}
										</Link>
										<div className="flex justify-start items-center gap-3">
											<p className="text-sm text-gray-400">
												Followers {followers?.length}
											</p>
										</div>
									</div>
								</div>
								<div>
									{readingTime && (
										<div>
											<p className="text-sm font-semibold text-gray-600">
												Reading time:{" "}
												{readingTime.estimatedTime}m
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="p-2 text-start">
							<PostContents1 content={blog.name}></PostContents1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;
