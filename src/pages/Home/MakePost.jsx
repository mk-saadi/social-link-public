/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import useToast from "../../hook/useToast";
import Toast from "../../hook/Toast";

const MakePost = ({ updatePostCount }) => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	// const imgbbApiKey = "35693cbbb9e1a46748a3b83e16106023";
	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";

	const social_id = localStorage.getItem("social_id");
	const [user, setUser] = useState();

	const [formData, setFormData] = useState({
		name: "",
		image: null,
	});

	const handleChange = async (event) => {
		if (event.target.name === "image") {
			const selectedFile = event.target.files[0];

			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1800,
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

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/users")
			.then((res) => res.data)
			.then((data) => {
				const filteredUser = data.filter((us) => us._id === social_id);

				setUser(filteredUser);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [social_id]);

	// const handlePost = (event) => {
	// 	event.preventDefault();

	// 	const imgbbFormData = new FormData();
	// 	imgbbFormData.append("image", formData.image);

	// 	axios
	// 		.post(
	// 			`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
	// 			imgbbFormData,
	// 			{
	// 				headers: {
	// 					"Content-Type": "multipart/form-data",
	// 				},
	// 			}
	// 		)
	// 		.then((imgbbResponse) => {
	// 			if (imgbbResponse.data.status === 200) {
	// 				const imageUrl = imgbbResponse.data.data.url;

	// 				formData.image = imageUrl;
	// 				formData.uploaderId = social_id;
	// 				formData.uploaderImage = user.map((us) => us?.image);
	// 				formData.uploaderIsVerified = user.map(
	// 					(us) => us?.isVerified
	// 				);
	// 				formData.uploaderName = user.map((us) => us?.name);

	// 				axios
	// 					.post(
	// 						"https://social-link-server-liard.vercel.app/posts",
	// 						formData
	// 					)
	// 					.then((response) => {
	// 						const responseData = JSON.parse(
	// 							response.config.data
	// 						);
	// 						const userEmail = responseData.email;
	// 						localStorage.setItem("email", userEmail);
	// 						alert("Post successful");

	// 						console.log("Post successful:", userEmail);
	// 						location.reload();
	// 					})
	// 					.catch((postError) => {
	// 						console.error("Post failed:", postError);
	// 					});
	// 			} else {
	// 				alert("Please try again");
	// 				console.error(
	// 					"Image upload to ImgBB failed:",
	// 					imgbbResponse.data
	// 				);
	// 			}
	// 		})
	// 		.catch((imgbbError) => {
	// 			console.error("Image upload to ImgBB failed:", imgbbError);
	// 		});
	// };

	const handlePost = (event) => {
		event.preventDefault();

		showToast("loading", "Please wait!");

		if (formData.image) {
			// Image is selected, proceed with image upload
			const imgbbFormData = new FormData();
			imgbbFormData.append("image", formData.image);

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
						// Handle successful image upload
						const imageUrl = imgbbResponse.data.data.url;
						formData.image = imageUrl;
						// Continue with the rest of the post creation process
						createPost();
					} else {
						console.error(
							"Image upload to ImgBB failed:",
							imgbbResponse.data
						);
					}
				})
				.catch((imgbbError) => {
					showToast("error", "Image upload to ImgBB failed!");
				});
		} else {
			// No image selected, create the post without an image
			createPost();
		}
	};

	// Function to create a post without uploading an image
	const createPost = () => {
		formData.uploaderId = social_id;
		formData.uploaderImage = user.map((us) => us?.image);
		formData.uploaderIsVerified = user.map((us) => us?.isVerified);
		formData.uploaderName = user.map((us) => us?.name);
		formData.userName = user.map((us) => us?.userName);

		axios
			.post("https://social-link-server-liard.vercel.app/posts", formData)
			.then((response) => {
				const responseData = JSON.parse(response.config.data);
				const userEmail = responseData.email;
				localStorage.setItem("email", userEmail);
				showToast("success", "Successfully Posted!");

				// location.reload();
				updatePostCount((prevCount) => prevCount + 1);
			})
			.catch((postError) => {
				showToast("error", "Post failed. Please try again!");
			});
	};

	return (
		<div>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<form
				className="w-full pb-6 bg-white rounded-lg shadow-md "
				onSubmit={handlePost}
			>
				{/* <hr className="bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[3px] drop-shadow-md shadow-md rounded-3xl" /> */}
				<hr className="bg-gray-400 border-0 h-[1px]" />

				<div className="text-gray-600">
					<textarea
						type="text"
						required
						placeholder="Create a new most"
						onChange={handleChange}
						className="bg-[#e5e7eb] text-xl border-none textarea input-bordered w-full h-[100px] placeholder:text-lg focus:outline-none rounded-none"
						name="name"
					></textarea>
				</div>
				<div className="flex items-center justify-between gap-3">
					<input
						onChange={handleChange}
						type="file"
						name="image"
						accept="image/*"
						placeholder="Photo"
						className="w-full max-w-xs bg-transparent rounded file-input file-input-ghost focus:bg-transparent focus:outline-none"
					/>
					<div>
						<input
							className="text-gray-600 hover:bg-[#e5e7eb] py-2 px-3 cursor-pointer text-xl font-semibold  hover:bg-opacity-80 duration-300 w-full"
							type="submit"
							value="Submit post"
						/>
					</div>
				</div>

				{/* <div className="absolute top-0 modal-action right-6 hover:underline text-rose-400">
						<a
					
							className="flex items-center justify-center text-2xl modal__close"
						>
							<AiOutlineClose />
						</a>
					</div> */}
			</form>

			{/* <hr className="bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[7px] drop-shadow-md shadow-md rounded-3xl mx-4" /> */}
		</div>
	);
};

export default MakePost;
