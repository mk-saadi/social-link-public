import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DominantColorContext } from "../../hook/DominantColorProvider";

import CategoryList from "./CategoryList";

const AllBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const { dominantColor } = useContext(DominantColorContext);

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

	const filteredBlogs = selectedCategory
		? blogs.filter((blog) => blog.category === selectedCategory)
		: blogs;

	return (
		<div className="min-h-screen mx-auto overflow-x-hidden mb-6">
			<div className="grid grid-cols-8  mx-2">
				<div className="hidden lg:col-span-1 lg:block"></div>

				<div className="col-span-8 lg:col-span-6">
					<p className="p-2 text-xl mt-[70px] font-semibold text-gray-600 ">
						Read latest blogs
					</p>
					<div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
						{blogs.map((blog) => (
							<div key={blog?._id}>
								<div className="relative bg-white border-t border-gray-200 rounded-md shadow-md drop-shadow">
									<div className="">
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
										<div className="min-h-[240px] p-2 text-start">
											<h3 className="text-xl font-semibold text-gray-600">
												{blog?.title.length > 25
													? blog?.title.slice(0, 25) +
													  "..."
													: blog?.title}
											</h3>
											<p className="text-sm  text-gray-400 mt-3">
												{blog?.name.length > 80
													? blog?.name.slice(0, 80) +
													  "..."
													: blog?.name}
											</p>
										</div>
									</div>
									<div className="absolute bottom-0 grid w-full ">
										<Link
											to={`/blog/${blog.title}`}
											className="p-2 m-2 font-semibold text-center text-white rounded-md shadow-md"
											style={{
												backgroundColor: dominantColor,
											}}
										>
											View Blog
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="hidden lg:col-span-1 lg:block"></div>
			</div>
			<div>
				<div className="grid grid-cols-8 mx-2">
					<div className="hidden xl:col-span-2 xl:block"></div>

					<div className="col-span-8 lg:col-span-5 xl:col-span-4">
						<p className="p-2 text-xl mt-[70px] font-semibold text-gray-600 ">
							Blogs by category
						</p>
						<CategoryList
							blogs={blogs}
							selectedCategory={selectedCategory}
							onCategorySelect={handleCategorySelect}
							dominantColor={dominantColor}
						/>
						<div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
							{filteredBlogs.map((blog) => (
								<div key={blog?._id}>
									<div className="relative bg-white border-t border-gray-200 rounded-md shadow-md drop-shadow">
										<div className="">
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
											<div className="min-h-[240px] p-2 text-start">
												<h3 className="text-xl font-semibold text-gray-600">
													{blog?.title.length > 25
														? blog?.title.slice(
																0,
																25
														  ) + "..."
														: blog?.title}
												</h3>
												<p className="text-sm  text-gray-400 mt-3">
													{blog?.name.length > 80
														? blog?.name.slice(
																0,
																80
														  ) + "..."
														: blog?.name}
												</p>
											</div>
										</div>
										<div className="absolute bottom-0 grid w-full ">
											<Link
												to={`/blog/${blog.title}`}
												className="p-2 m-2 font-semibold text-center text-white rounded-md shadow-md"
												style={{
													backgroundColor:
														dominantColor,
												}}
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
