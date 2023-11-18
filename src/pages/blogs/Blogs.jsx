import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostContents1 from "../../hook/PostContents1";

const Blog = () => {
	const [blog, setBlog] = useState([]);
	const { title } = useParams();
	const [user, setUser] = useState([]);

	// useEffect(() => {
	// 	fetch(`https://social-link-server-liard.vercel.app/blogs/${title}`)
	// 		.then((res) => {
	// 			if (!res.ok) {
	// 				throw new Error(`HTTP error! Status: ${res.status}`);
	// 			}
	// 			return res.json();
	// 		})
	// 		.then((data) => setBlog(data))
	// 		.catch((error) => console.error("Error fetching data:", error));
	// }, [title]);

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

	const blogUserName = blog.userName;

	useEffect(() => {
		axios("https://social-link-server-liard.vercel.app/users").then(
			(res) => {
				const data = res.data;
				const filterUser = data.find(
					(da) => da.userName === blogUserName
				);
				setUser(filterUser);
			}
		);
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

	return (
		<div className="min-h-screen">
			<div className="mt-[70px] bg-white mx-auto max-w-3xl p-5 rounded-md">
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
										{/* <p className="text-sm text-gray-400">
											{user?.userName}
										</p> */}
									</div>
								</div>
								<div>
									{readingTime && (
										<div>
											<p className="text-sm font-semibold text-gray-600">
												Time:{" "}
												{readingTime.estimatedTime}{" "}
												minutes
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
