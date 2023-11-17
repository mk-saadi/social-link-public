import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DominantColorContext } from "../../hook/DominantColorProvider";
import imageCompression from "browser-image-compression";
import useToast from "../../hook/useToast";
import Toast from "../../hook/Toast";

const AllBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const { dominantColor } = useContext(DominantColorContext);
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";

	const [formData, setFormData] = useState({
		name: "",
		title: "",
		image: null,
	});

	const handleChange = async (event) => {
		if (event.target.name === "image") {
			const selectedFile = event.target.files[0];

			const options = {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 400,
			};

			try {
				const compressedFile = await imageCompression(
					selectedFile,
					options
				);

				setFormData({ ...formData, image: compressedFile });
			} catch (error) {
				showToast("error", "image compression failed!");
			}
		} else {
			setFormData({
				...formData,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleBlog = (event) => {
		event.preventDefault();

		// const name = formData.name;

		const imgbbFormData = new FormData();
		imgbbFormData.append("image", formData.image);
		showToast("loading", "Please wait!");

		axios
			.post(
				`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
				imgbbFormData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((imgbbResponse) => {
				if (imgbbResponse.data.status === 200) {
					const imageUrl = imgbbResponse.data.data.url;

					formData.image = imageUrl;

					console.log(formData);

					axios
						.post(
							"https://social-link-server-liard.vercel.app/blogs",
							formData
						)
						.then((response) => {
							showToast("success", "Successfully posted!");
						})
						.catch((err) => {
							console.error("Registration failed:", err);
							showToast("error", "Failed to post!");
						});
				} else {
					alert("Please try again");
					console.error(
						"Image upload to ImgBB failed:",
						imgbbResponse.data
					);
				}
			})
			.catch((imgbbError) => {
				console.error("Image upload to ImgBB failed:", imgbbError);
				showToast("error", "Image upload error!");
			});
	};

	useEffect(() => {
		fetch("https://social-link-server-liard.vercel.app/blogs")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => setBlogs(data))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	console.log(blogs);

	return (
		<div className="min-h-screen mx-auto overflow-x-hidden xl:w-11/12 ">
			<div className="grid grid-cols-8">
				<div className="hidden xl:col-span-2 xl:block"></div>

				<div className=" col-span-8 lg:col-span-5 xl:col-span-4 mt-[70px] ">
					{/* create blog  */}
					<div className="mt-5 bg">
						<form
							className="bg-white rounded-lg shadow-md "
							onSubmit={handleBlog}
						>
							{/* <hr className="bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[3px] drop-shadow-md shadow-md rounded-3xl" /> */}
							<hr className="bg-gray-400 border-0 h-[1px]" />

							<div className="text-gray-600">
								<input
									label="Name"
									onChange={handleChange}
									type="text"
									required
									name="title"
									className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 bg-[#e5e7eb]"
									placeholder="blog title"
								/>
								<textarea
									type="text"
									required
									placeholder="create a new Blog..."
									onChange={handleChange}
									className="bg-[#e5e7eb] text-lg border-none textarea input-bordered w-full placeholder:text-lg focus:outline-none rounded-none"
									name="name"
								></textarea>
							</div>
							<div className="items-center justify-between gap-3 ">
								<input
									onChange={handleChange}
									type="file"
									name="image"
									accept="image/*"
									placeholder="Photo"
									className="w-full max-w-xs bg-transparent rounded file-input file-input-ghost focus:bg-transparent focus:outline-none"
								/>
								<div className="flex items-center justify-between px-5 pb-3">
									{/* <Link
										to="/allBlogs"
										className="text-blue-500"
									>
										See All
									</Link> */}
									<input
										className="px-3 py-2 font-semibold text-white duration-300 bg-gray-600 cursor-pointer btn hover:bg-gray-400 "
										type="submit"
										value="Create Blog"
									/>
								</div>
							</div>
						</form>
					</div>

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
			</div>
		</div>
	);
};

export default AllBlogs;
