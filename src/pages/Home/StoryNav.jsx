import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { AiFillPlusCircle } from "react-icons/ai";

const StoryNav = () => {
	// const [isLoading, setIsLoading] = useState(true);
	const userId = localStorage.getItem("social_id");
	const [userInfos, setUserInfos] = useState([]);
	const [currentUser, setCurrentUser] = useState();

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

	console.log("userInfos", currentUser?.name);

	// console.log("userInfos", userInfos);

	// useEffect(()=>{
	// 	axios.get("https://social-link-server-liard.vercel.app/story")
	// 		.then(res=>{
	// 			console.log(res);
	// 		});
	// },[])

	const handleStory = (event) => {
		event.preventDefault();

		const form = event.target;
		const image = form.image.files[0];
		const body = form.body.value;

		const story = {
			storyImage: image,
			storyBody: body,
			uploaderId: userId,
			uploaderName: currentUser.name,
			uploaderImage: currentUser.image,
			userName: currentUser.userName,
		};

		console.log("story", story);

		form.reset();

		// after selecting the image show an image preview
		// first compress image to less than 600kb then post it to imgbb then send it to mongodb using this url: https://social-link-server-liard.vercel.app/story
		// use axios.post for this operation
	};

	return (
		<div className="grid w-full grid-cols-4 gap-2 md:grid-cols-5">
			<div className="md:col-span-1">
				{/* The button to open modal */}
				<a
					className="flex flex-col items-center justify-center h-full border-[3px] rounded-md border-dotted border-[#7C9D96] cursor-pointer"
					href="#post-modal"
				>
					<p className="text-5xl text-[#7C9D96] ">
						<AiFillPlusCircle />
					</p>

					<p className="font-semibold text-center text-gray-500">
						Post a story
					</p>
				</a>

				<div
					id="post-modal"
					className="overflow-auto modal"
				>
					<form
						className="bg-white rounded-md modal-box"
						onSubmit={handleStory}
					>
						<h3 className="mb-2 text-xl font-bold text-gray-600">
							Feedback!
						</h3>
						<div className="mt-4 mb-8">
							<input
								type="file"
								name="image"
								accept="image/*"
								placeholder="Photo"
								className="w-full max-w-xs bg-transparent rounded file-input file-input-ghost focus:bg-transparent focus:outline-none"
								required
							/>
							<textarea
								className="bg-[#e5e7eb] text-lg border-none textarea input-bordered w-full h-[100px] placeholder:text-lg focus:outline-none rounded-none"
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
									className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300"
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
				spaceBetween={30}
				freeMode={true}
				pagination={{
					clickable: true,
				}}
				modules={[FreeMode, Pagination]}
				className="w-full h-full col-span-3 border mySwiper md:col-span-4 border-sky-400"
			>
				<SwiperSlide style={{ height: "150px" }}>Slide 1</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 2</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 3</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 4</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 5</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 6</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 7</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 8</SwiperSlide>
				<SwiperSlide style={{ height: "150px" }}>Slide 9</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default StoryNav;
