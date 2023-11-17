import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Blog = () => {
	const [blog, setBlog] = useState([]);
	const { title } = useParams();

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

	console.log(blog);

	return (
		<div className="min-h-screen">
			<div className="mt-[70px] mx-auto max-w-3xl p-5 rounded-md bg-white">
				<div className="bg-white rounded-md shadow-md drop-shadow">
					<div>
						<Link className="w-full avatar">
							<div className="object-cover w-full rounded-md shadow-md h-[200px] drop-shadow-sm">
								<img
									src={blog?.image}
									alt="Blog Image"
								/>
							</div>
						</Link>
						<div className="p-2 text-start md:h-[200px]">
							<h3 className="text-xl font-semibold">
								{blog.title}
							</h3>
							<p className="mt-3 text-gray-600">{blog.name}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;
