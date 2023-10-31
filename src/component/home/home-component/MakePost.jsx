// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

const MakePost = () => {
	const imgbbApiKey = "35693cbbb9e1a46748a3b83e16106023";

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
				maxSizeMB: 0.6,
				maxWidthOrHeight: 1200,
				disableGIFConversion: true,
			};

			try {
				const compressedFile = await imageCompression(
					selectedFile,
					options
				);
				setFormData({ ...formData, image: compressedFile });
			} catch (error) {
				alert("Error compressing image, please try again");
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
				console.log("data", data);
				const filteredUser = data.filter((us) => us._id === social_id);

				setUser(filteredUser);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [social_id]);

	const handlePost = (event) => {
		event.preventDefault();

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
					const imageUrl = imgbbResponse.data.data.url;

					formData.image = imageUrl;
					formData.uploaderId = social_id;
					formData.uploaderImage = user.map((us) => us?.image);
					formData.uploaderIsVerified = user.map(
						(us) => us?.isVerified
					);
					formData.uploaderName = user.map((us) => us?.name);

					axios
						.post(
							"https://social-link-server-liard.vercel.app/posts",
							formData
						)
						.then((response) => {
							const responseData = JSON.parse(
								response.config.data
							);
							const userEmail = responseData.email;
							localStorage.setItem("email", userEmail);
							alert("Post successful");

							console.log("Post successful:", userEmail);
							location.reload();
						})
						.catch((postError) => {
							console.error("Post failed:", postError);
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
			});
	};

	return (
		<div>
			<div>
				<a href="#post-modal">make a post</a>
			</div>

			<div
				id="post-modal"
				className="modal overflow-auto"
			>
				<form
					className=" bg-[#ede6d7] shadow-xl drop-shadow-xl border border-[rgba(63,63,63,0.64)] rounded-xl py-6 w-[95%] md:w-[60%]"
					onSubmit={handlePost}
				>
					<p className="text-center text-2xl font-semibold text-gray-700 mb-2">
						Create a post
					</p>
					<hr className="bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[3px] drop-shadow-md shadow-md rounded-3xl" />
					<div className="text-gray-700 mx-4 mt-4 md:px-10">
						<textarea
							type="text"
							required
							placeholder="type post text"
							onChange={handleChange}
							className="bg-[#dbd2bd] border-none textarea input-bordered rounded-md w-full"
							name="name"
						></textarea>
						<br />
						<input
							onChange={handleChange}
							type="file"
							required
							name="image"
							accept="image/*"
							placeholder="Photo"
							className="px-2 py-4 border rounded-md cursor-pointer"
						/>
					</div>

					<br />
					<div className="flex justify-end">
						<input
							className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 w-full mx-4"
							type="submit"
							value="Post"
						/>
					</div>
					<div className="modal-action absolute top-0 right-6 hover:underline text-rose-400">
						<a
							href="#"
							className="modal__close flex justify-center items-center text-2xl"
						>
							<AiOutlineClose />
						</a>
					</div>
				</form>
			</div>
			{/* <hr className="bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[7px] drop-shadow-md shadow-md rounded-3xl mx-4" /> */}
		</div>
	);
};

export default MakePost;
