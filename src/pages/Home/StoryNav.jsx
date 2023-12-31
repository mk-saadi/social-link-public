import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Backdrop from "@mui/material/Backdrop";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { AiFillPlusCircle } from "react-icons/ai";
import imageCompression from "browser-image-compression";
import useToast from "../../hook/useToast";
import Toast from "../../hook/Toast";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	borderRadius: "7px",
	border: "0",
	filter: "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
	outline: "none",
};

const StoryNav = ({ dominantColor }) => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	// const [isLoading, setIsLoading] = useState(true);
	const userId = localStorage.getItem("social_id");
	const [userInfos, setUserInfos] = useState([]);
	const [currentUser, setCurrentUser] = useState();
	const [story, setStory] = useState([]);

	const imgbbApiKey = import.meta.env.VITE_Image_Upload_token;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usersResponse = await axios.get(
					"https://social-link-server-liard.vercel.app/users"
				);
				const followResponse = await axios.get(
					"https://social-link-server-liard.vercel.app/follow"
				);

				const users = usersResponse.data;

				const currentUser = users.find((us) => us?._id === userId);
				setCurrentUser(currentUser);

				const followingData = followResponse.data.find(
					(data) => data.followerId === userId
				);
				const followingIds = followingData?.followingIds || [];

				const followedUsers = users.filter((user) =>
					followingIds.includes(user._id)
				);
				setUserInfos(followedUsers);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, [userId]);

	const followingUserIds = userInfos.map((ins) => ins._id);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/story")
			.then((res) => {
				const data = res.data;
				setStory(data);
			});
	}, []);

	const handleStory = async (event) => {
		event.preventDefault();

		const form = event.target;
		const image = form.image.files[0];
		const body = form.body.value;

		showToast("loading", "Please wait!");

		// Compress the image
		const options = {
			maxSizeMB: 0.4, // (max file size in MB)
			maxWidthOrHeight: 1920, // compress file with maximum width of 1920px
			useWebWorker: true,
		};
		const compressedImage = await imageCompression(image, options);

		// Convert the compressed image file to a blob which can be uploaded
		const blob = await imageCompression.getFilefromDataUrl(
			await imageCompression.getDataUrlFromFile(compressedImage),
			image.type
		);

		// Create form data to send to ImgBB
		const formData = new FormData();
		formData.append("image", blob);

		// Upload the image to ImgBB
		const response = await fetch(
			`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
			{
				method: "POST",
				body: formData,
			}
		);
		const data = await response.json();

		// Check if the upload was successful
		if (data.success) {
			const story = {
				storyImage: data.data.url, // Use the URL of the uploaded image
				storyBody: body,
				uploaderId: userId,
				uploaderName: currentUser?.name,
				uploaderImage: currentUser?.image,
				userName: currentUser?.userName,
			};

			axios
				.post(
					"https://social-link-server-liard.vercel.app/story",
					story
				)
				.then((response) => {
					console.log(response);
					showToast("success", "Successfully Posted!");

					// location.reload();
				})
				.catch((err) => {
					console.log(err.message);
					showToast("error", "Upload failed. Please try again!");
				});

			console.log("story", story);
		} else {
			showToast("error", "Image upload to ImgBB failed!");
		}

		form.reset();
	};

	const [imagePreview, setImagePreview] = useState(null);

	const handleImageChange = (event) => {
		const image = event.target.files[0];
		const imageUrl = URL.createObjectURL(image);
		setImagePreview(imageUrl);
	};

	// material modal
	const [storyImage, setStoryImage] = useState("");
	const [uploaderName, setUploaderName] = useState("");
	const [uploaderImage, setUploaderImage] = useState("");
	const [userName, setUploaderUserName] = useState("");
	const [storyBody, setStoryBody] = useState("");

	// const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	// const handleClose = () => setOpen(false);
	// const customBackdropStyle = {
	// 	backgroundColor: "#00000050",
	// 	// opacity: 0.2,
	// };

	const [modalId, setModalId] = useState(0);
	const [secondsLeft, setSecondsLeft] = useState(10);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = (
		storyImage,
		uploaderName,
		uploaderImage,
		userName,
		storyBody
	) => {
		setOpen(true);
		setStoryImage(storyImage);
		setUploaderName(uploaderName);
		setUploaderImage(uploaderImage);
		setUploaderUserName(userName);
		setStoryBody(storyBody);
		setSecondsLeft(30);
		setOpen(true);
		setModalId((prevId) => prevId + 1); // Update modalId to trigger useEffect
	};

	// const handleOpen = () => {
	// 	// Reset the timer when opening the modal
	// 	setSecondsLeft(30);
	// 	setOpen(true);
	// 	setModalId((prevId) => prevId + 1); // Update modalId to trigger useEffect
	// };

	useEffect(() => {
		let timeoutId;
		let intervalId;

		if (open) {
			timeoutId = setTimeout(() => {
				setOpen(false);
			}, 30000);

			intervalId = setInterval(() => {
				setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
			}, 1000);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [open, modalId]);

	return (
		<div className="grid w-full grid-cols-4 gap-2 overflow-x-hidden md:grid-cols-5">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div className="bg-white rounded-md shadow-md md:col-span-1">
				{/* The button to open modal */}
				<a
					className="flex flex-col items-center justify-center h-full rounded-md cursor-pointer"
					style={{
						border: "2px dashed",
						borderColor: dominantColor,
						height: "190px",
					}}
					href="#post-modal"
				>
					<p
						className="text-5xl"
						style={{ color: dominantColor }}
					>
						<AiFillPlusCircle />
					</p>

					<p className="font-semibold text-center text-gray-500">
						Post a<br /> story
					</p>
				</a>

				<div
					id="post-modal"
					className="overflow-auto modal"
				>
					<form
						className="bg-white rounded-md modal-box storyModal"
						onSubmit={handleStory}
					>
						<h3 className="mb-2 text-xl font-bold text-gray-600">
							Story!
						</h3>
						<div className="mt-4 mb-8">
							<input
								onInput={handleImageChange}
								type="file"
								name="image"
								accept="image/*"
								placeholder="Photo"
								className="w-full max-w-xs bg-transparent rounded file-input file-input-ghost focus:bg-transparent focus:outline-none"
								required
							/>

							<div className="h-auto object-cover max-h-[250px] overflow-y-auto w-full rounded-md shadow-md my-2 storyModal">
								{imagePreview && (
									<img
										id="preview-image"
										src={imagePreview}
										alt="Image preview"
									/>
								)}
							</div>

							<textarea
								className="bg-[#e5e7eb] text-base border-none textarea input-bordered w-full h-[100px] placeholder:text-sm focus:outline-none rounded-none text-gray-600"
								type="text"
								placeholder="write caption"
								name="body"
							></textarea>
						</div>

						<div className="flex items-center justify-between text-base">
							<div className="flex items-center justify-center gap-2 modal-action">
								<a
									href="#"
									className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md modal__close "
								>
									Go back
								</a>
							</div>
							<div className="flex justify-end">
								<input
									style={{
										backgroundColor: dominantColor,
									}}
									className=" text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300"
									type="submit"
									value="Submit"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Swiper
				slidesPerView={3}
				spaceBetween={15}
				freeMode={true}
				modules={[FreeMode, Pagination]}
				style={{ width: "438px" }}
				className="w-full h-full col-span-3 mySwiper"
			>
				{/* current user's story */}
				{story &&
					story
						.filter((st) => st?.uploaderId === userId)
						.map((st) => (
							<SwiperSlide
								key={st?._id}
								style={{
									width: "150px", // Set the desired width for each SwiperSlide
									height: "190px",
									cursor: "pointer",
									position: "relative",
								}}
							>
								<a
									href="#story-modal"
									onClick={() =>
										handleOpen(
											st?.storyImage,
											st?.uploaderName,
											st?.uploaderImage,
											st?.userName,
											st?.storyBody
										)
									}
									style={{ display: "block", height: "100%" }}
								>
									<img
										className="object-cover w-full h-full rounded-md "
										src={st.storyImage}
										alt="story image"
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</a>

								<div className="flex items-center justify-center">
									<p className="absolute bottom-0 w-full shadow-md drop-shadow-md font-semibold text-sm text-center text-gray-200 bg-gradient-to-b from-[#005e9401] to-gray-800 py-1 rounded-b-lg">
										{st.uploaderName.lenth > 16
											? st.uploaderName.slice(0, 16) +
											  "..."
											: st.uploaderName}
									</p>
								</div>
							</SwiperSlide>
						))}

				{/* other user's story */}
				{story
					.filter((st) => followingUserIds.includes(st?.uploaderId))
					.map((st) => (
						<SwiperSlide
							key={st._id}
							style={{
								width: "150px", // Set the desired width for each SwiperSlide
								height: "190px",
								cursor: "pointer",
								position: "relative",
							}}
						>
							<a
								href="#story-modal"
								onClick={() =>
									handleOpen(
										st.storyImage,
										st.uploaderName,
										st.uploaderImage,
										st.userName
									)
								}
							>
								<img
									className="object-cover h-full rounded-md"
									src={st.storyImage}
									alt="story image"
									style={{
										width: "100%",
										height: "100%",
									}}
								/>
							</a>

							<div className="flex items-center justify-center">
								<p className="absolute bottom-0 w-full shadow-md drop-shadow-md font-semibold text-center text-gray-200 bg-gradient-to-b from-[#005e9401] to-gray-800 py-1 rounded-b-lg">
									{st.uploaderName.slice(0, 12)}
								</p>
							</div>
						</SwiperSlide>
					))}
			</Swiper>

			{open && (
				<div
					id="story-modal"
					className=" modal"
					open={open}
				>
					<div className="bg-white rounded-md modal-box max-h-[80vh] storyModal">
						<div>
							<div className="flex items-center justify-between text-base">
								<div className="flex items-center gap-3">
									<Link to={`/profilePage/${userName}`}>
										<div className="avatar">
											<div className="object-cover w-12 rounded-full">
												<img
													src={uploaderImage}
													alt="person"
												/>
											</div>
										</div>
									</Link>
									<Link
										to={`/profilePage/${userName}`}
										className="font-semibold text-gray-600 hover:underline"
									>
										{uploaderName}
									</Link>
								</div>
								<HighlightOffIcon
									onClick={handleClose}
									fontSize="large"
									className="text-gray-600 duration-300 cursor-pointer modal__close "
								/>
							</div>
							<div className="flex items-center justify-between gap-3 my-3">
								<p className="my-3 font-semibold text-gray-600">
									{storyBody}
								</p>
								<p className="my-3 text-right">
									{secondsLeft} seconds left
								</p>
							</div>

							<img
								src={storyImage}
								alt="story image"
								className="object-cover w-full min-h-full overflow-hidden rounded-md shadow-md drop-shadow-md"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StoryNav;

// <Modal
// 	aria-labelledby="transition-modal-title"
// 	aria-describedby="transition-modal-description"
// 	open={open}
// 	onClose={handleClose}
// 	closeAfterTransition
// 	slots={{ backdrop: Backdrop }}
// 	slotProps={{
// 		backdrop: {
// 			style: customBackdropStyle, // Apply the custom backdrop style
// 			timeout: 500,
// 		},
// 	}}
// 	className="mx-8"
// >
// 	<Fade in={open}>
// 		<Box
// 			sx={style}
// 			style={{
// 				backgroundColor: dominantColor,
// 			}}
// 		>
// 			{/* <Typography
// 			id="transition-modal-description"
// 			sx={{ borderRadius: "10px" }}
// 		>
// 		</Typography> */}
// 			<div
// 				style={{
// 					margin: "0px 10px",
// 				}}
// 			>
// 				<Typography>
// 					{secondsLeft} seconds left
// 				</Typography>
// 				<img
// 					src={storyImage}
// 					alt=""
// 					className="rounded-md"
// 				/>
// 				<p>{uploaderName}</p>
// 			</div>
// 		</Box>
// 	</Fade>
// </Modal>
