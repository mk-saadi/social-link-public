import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DominantColorContext } from "../../hook/DominantColorProvider";
import imageCompression from "browser-image-compression";
import useToast from "../../hook/useToast";
import Toast from "../../hook/Toast";

const CreateBlog = () => {
	const { dominantColor } = useContext(DominantColorContext);
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";

	const [imagePreview, setImagePreview] = useState(null);
	const [user, setUser] = useState([]);
	const userId = localStorage.getItem("social_id"); // CURRENT USER

	const handleImageChange = (event) => {
		const image = event.target.files[0];
		const imageUrl = URL.createObjectURL(image);
		setImagePreview(imageUrl);
	};

	const [formData, setFormData] = useState({
		name: "",
		title: "",
		image: null,
		category: "",
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
					formData.userName = user?.userName;

					console.log(formData);

					axios
						.post(
							"https://social-link-server-liard.vercel.app/blogs",
							formData
						)
						.then((response) => {
							showToast("success", "Blog created!");
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
		axios("https://social-link-server-liard.vercel.app/users").then(
			(res) => {
				const data = res.data;
				const filterUser = data.find((da) => da._id === userId);
				setUser(filterUser);
			}
		);
	}, [userId]);

	return (
		<div className="min-h-screen overflow-hidden">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div className="mt-[70px] mx-16 mb-10">
				<form
					className="bg-white rounded-lg shadow-md  flex flex-col p-4 gap-4"
					onSubmit={handleBlog}
				>
					{/* <hr className="bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[3px] drop-shadow-md shadow-md rounded-3xl" /> */}
					<p className="text-gray-600 font-semibold">
						Create blog, {user?.name}?
					</p>
					<hr className="bg-gray-400 border-0 h-[1px]" />

					<div className="text-gray-600">
						<input
							label="Name"
							onChange={handleChange}
							type="text"
							required
							name="title"
							className="py-3 px-4 rounded-md focus:outline-0 bg-[#e5e7eb] w-full border-0 mb-4"
							placeholder="blog title"
						/>
						<textarea
							type="text"
							required
							placeholder="type blog... (you can use markdown)"
							onChange={handleChange}
							className="bg-[#e5e7eb] text-lg border-none textarea textarea-bordered w-full h-[150px] focus:h-[350px] duration-200 placeholder:text-lg focus:outline-none rounded-md focus:shadow-inner shadow-gray-500 storyModal"
							name="name"
						></textarea>
					</div>
					<select
						className="w-full max-w-xs select select-bordered bg-[#e5e7eb]  text-gray-600 font-semibold rounded-md"
						name="category"
						onChange={handleChange}
						required
					>
						<option
							disabled
							selected
						>
							Blog category?
						</option>
						<option>Technology</option>
						<option>Lifestyle</option>
						<option>Entertainment</option>
						<option>Personal Development</option>
						<option>Business and Finance</option>
						<option>Science and Education</option>
						<option>Books and Literature</option>
						<option>Social Issues</option>
						<option>Parenting and Family</option>
						<option>Sports</option>
						<option>Photography and Art</option>
						<option>Science Fiction and Fantasy</option>
						<option>Humor and Satire</option>
						<option>DIY and Crafts</option>
						<option>Education and Learning</option>
						<option>History and Culture</option>
						<option>News and Politics</option>
						<option>Tech Reviews</option>
					</select>
					<div className="items-center justify-between gap-3 ">
						<input
							onChange={handleChange}
							onInput={handleImageChange}
							type="file"
							name="image"
							accept="image/*"
							placeholder="Photo"
							className="w-full max-w-xs bg-transparent rounded file-input file-input-ghost focus:bg-transparent focus:outline-none"
						/>

						<div className="h-auto object-cover max-h-[280px] overflow-y-auto max-w-screen-md rounded-md shadow-md my-2 storyModal">
							{imagePreview && (
								<img
									id="preview-image"
									src={imagePreview}
									alt="Image preview"
								/>
							)}
						</div>
						<div className="flex items-center justify-between px-5 pb-3">
							<input
								className="p-2 m-2 font-semibold text-center text-white rounded-md shadow-md cursor-pointer"
								style={{ backgroundColor: dominantColor }}
								type="submit"
								value="Create Blog"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateBlog;
