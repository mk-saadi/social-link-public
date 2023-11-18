import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DominantColorContext } from "../../hook/DominantColorProvider";

import CategoryList from "./CategoryList";

const AllBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		fetch("https://social-link-server-liard.vercel.app/blogs")
			.then((res) => res.json())
			.then((data) => {
				setBlogs(data);
				setSelectedCategory(data.length > 0 ? data[0].category : null);
			});
	}, []);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	};

	const handleSearchInputChange = (event) => {
		setSearchInput(event.target.value);
	};

	const filteredBlogs = selectedCategory
		? blogs.filter((blog) => blog.category === selectedCategory)
		: blogs;

	const searchedBlogs = searchInput
		? filteredBlogs.filter((blog) =>
				blog.category.toLowerCase().includes(searchInput.toLowerCase())
		  )
		: filteredBlogs;

	return (
		<div className="min-h-screen mx-auto overflow-x-hidden xl:w-11/12 ">
			{/* <div className="grid grid-cols-8">
				<div className="hidden xl:col-span-2 xl:block"></div>

				<div className=" col-span-8 lg:col-span-5 xl:col-span-4 mt-[70px] ">

					<p className="p-2 mt-5 text-xl font-semibold text-gray-600 ">
						Total Blogs: {blogs?.length}
					</p>
					<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px] mb-5" />

					<div className="grid gap-4 mx-4 md:grid-cols-2 md:mx-0">
						{blogs?.map((blog) => (
							<div key={blog?._id}>
								<div className="relative bg-white border-t border-gray-200 rounded-md shadow-md drop-shadow">
									<div className="min-h-[320px]">
										<Link
											className="w-full avatar"
											to={`/blog/${blog.title}`}
										>
											<div className="object-cover w-full rounded-md shadow-md h-[200px] drop-shadow-sm">
												<img
													src={blog?.image}
													alt="Blog Image"
												/>
											</div>
										</Link>
										<div className="p-2 text-start md:h-[200px] h-[230px]">
											<h3 className="text-xl font-semibold">
												{blog?.title}
											</h3>
											<p className="mt-3 text-gray-600">
												{blog?.name.length > 150
													? blog?.name.slice(0, 150) +
													  "..."
													: blog?.name}
											</p>
										</div>
									</div>
									<div className="absolute bottom-0 grid w-full ">
										<Link
											to={`/blog/${blog.title}`}
											className="p-2 m-2 font-semibold text-center text-white bg-gray-600 rounded-md shadow-md"
										>
											View Blog
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div> */}

			<div className="mt-20">
				<p>Search by category</p>
				<input
					type="text"
					value={searchInput}
					onChange={handleSearchInputChange}
					placeholder="Type to search by category"
					className="p-2 mt-2 border rounded"
				/>
			</div>

			<div>
				<h3 className="pl-4 mt-20 ml-4 -mb-12 text-xl font-bold border-l-2 md:text-2xl sm:ml-20 text-info border-sky-400">
					Blog category
				</h3>

				<CategoryList
					blogs={blogs}
					selectedCategory={selectedCategory}
					onCategorySelect={handleCategorySelect}
				/>

				<div className="grid grid-cols-2 gap-4 mx-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:mx-20 text-slate-400">
					{filteredBlogs.map((blog) => (
						<div key={blog?._id}>
							<div className="relative bg-white border-t border-gray-200 rounded-md shadow-md drop-shadow">
								<div className="min-h-[320px]">
									<Link
										className="w-full avatar"
										to={`/blog/${blog.title}`}
									>
										<div className="object-cover w-full rounded-md shadow-md drop-shadow-sm">
											<img
												src={blog?.image}
												alt="Blog Image"
											/>
										</div>
									</Link>
									<div className="p-2 text-start">
										<h3 className="text-xl font-semibold">
											{blog?.title}
										</h3>
										<p className="mt-3 text-gray-600">
											{blog?.name.length > 40
												? blog?.name.slice(0, 40) +
												  "..."
												: blog?.name}
										</p>
									</div>
								</div>
								<div className="absolute bottom-0 grid w-full ">
									<Link
										to={`/blog/${blog.title}`}
										className="p-2 m-2 font-semibold text-center text-white bg-gray-600 rounded-md shadow-md"
									>
										View Blog
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AllBlogs;

// useEffect(() => {
// 	fetch("https://social-link-server-liard.vercel.app/blogs")
// 		.then((res) => {
// 			if (!res.ok) {
// 				throw new Error(`HTTP error! Status: ${res.status}`);
// 			}
// 			return res.json();
// 		})
// 		.then((data) => setBlogs(data))
// 		.catch((error) => console.error("Error fetching data:", error));
// }, []);

// console.log(blogs);

/*
import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import CategoryD from "./CategoryD";

const Categoriies = () => {
    const [figures, setFigures] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("https://server-anime-fig.vercel.app/addedFigure")
            .then((res) => res.json())
            .then((data) => {
                setFigures(data);
                setSelectedCategory(data.length > 0 ? data[0].category : null);
            });
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredBlogs = selectedCategory
        ? figures.filter((fig) => fig.category === selectedCategory)
        : figures;

    return (
        <>
            <div className="mt-20">
                <h3 className="pl-4 mt-20 ml-4 -mb-12 text-xl font-bold border-l-2 md:text-2xl sm:ml-20 text-info border-sky-400">
                    Shop Merch By Sub-category
                </h3>

                <CategoryList
                    figures={figures}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />

                <div
                    className="grid grid-cols-2 gap-4 mx-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:mx-20 text-slate-400"
                    data-aos="fade-up"
                    data-aos-offset="100"
                    data-aos-duration="300"
                >
                    {filteredBlogs.map((figS) => (
                        <CategoryD
                            key={figS._id}
                            figS={figS}
                        ></CategoryD>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Categoriies;
*/
