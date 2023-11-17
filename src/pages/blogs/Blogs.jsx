import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
	return (
		<div className="min-h-screen">
			<div className="mt-[70px] mx-auto max-w-3xl p-5 rounded-md bg-white">
				<div className="bg-white rounded-md shadow-md  drop-shadow">
					<div>
						<Link className="w-full avatar">
							<div className="object-cover w-full rounded-md shadow-md h-[200px] drop-shadow-sm">
								<img
									src="https://i.ibb.co/tzfBZhS/timothy-exodus-P-t-ABQl-Px-Y-unsplash.jpg"
									alt="Blog Image"
								/>
							</div>
						</Link>
						<div className="p-2 text-start md:h-[200px]">
							<h3 className="text-xl font-semibold">
								Web Development Trends 2023
							</h3>
							<p className="mt-3 text-gray-600">
								Explore the latest trends in web development for
								the year 2023, including new technologies and
								frameworks.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;
