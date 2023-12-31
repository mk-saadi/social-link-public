import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import useToast from "../hook/useToast";
import Toast from "../hook/Toast";

const SignUp = () => {
	const navigate = useNavigate();
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	// const imgbbApiKey = "35693cbbb9e1a46748a3b83e16106023";
	const imgbbApiKey = import.meta.env.VITE_Image_Upload_token;
	console.log(imgbbApiKey);

	const [passwordShow, setPasswordShow] = useState(false);

	const handlePasswordShow = () => {
		setPasswordShow(!passwordShow);
	};

	const generateRandomUsername = (name) => {
		// Convert the name to lowercase.
		name = name.toLowerCase();

		const nameTokens = name.split(" ");

		if (nameTokens.length === 1) {
			const randomNumber = Math.floor(Math.random() * 1000);
			return nameTokens[0] + randomNumber;
		}

		const combinedName = nameTokens.join("_");
		const randomNumber = Math.floor(Math.random() * 1000);

		return combinedName + randomNumber;
	};

	const [formData, setFormData] = useState({
		name: "",
		image: null,
		email: "",
		password: "",
		confirmPassword: "",
	});

	// >> good code
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

	// const [formData, setFormData] = useState({
	// 	name: "",
	// 	image: null,
	// 	email: "",
	// 	password: "",
	// 	confirmPassword: "",
	// });
	// console.log(formData);

	// const handleChange = async (event) => {
	// 	if (event.target.name === "image") {
	// 		const selectedFile = event.target.files[0];

	// 		const options = {
	// 			maxSizeMB: 0.3,
	// 			maxWidthOrHeight: 800,
	// 		};

	// 		try {
	// 			const compressedFile = await imageCompression(
	// 				selectedFile,
	// 				options
	// 			);
	// 			setFormData({ ...formData, image: compressedFile });
	// 		} catch (error) {
	// 			alert("Error compressing image please try again");
	// 		}
	// 	} else {
	// 		setFormData({
	// 			...formData,
	// 			[event.target.name]: event.target.value,
	// 		});
	// 	}
	// };

	const handleSubmit = (event) => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			showToast("error", "Password and confirm password do not match!");
			return;
		}

		const name = formData.name;

		// Generate a random username for the user.
		const userName = generateRandomUsername(name);
		formData.userName = userName;
		console.log(userName);

		if (userName === null) {
			showToast("error", "username generation failed!");
			return;
		}

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
					formData.isVerified = false;

					axios
						.post(
							"https://social-link-server-liard.vercel.app/users",
							formData
						)
						.then((response) => {
							const responseData = JSON.parse(
								response.config.data
							);
							const userEmail = responseData.email;
							localStorage.setItem("email", userEmail);
							showToast("success", "Registration Successful!");

							console.log("Registration successful:", userEmail);
							// location.reload();
							window.location.reload(true);
						})
						.catch((registrationError) => {
							console.error(
								"Registration failed:",
								registrationError
							);
							showToast("error", "Registration failed!");
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

	axios
		.get("https://social-link-server-liard.vercel.app/users")
		.then((response) => {
			const userEmail = localStorage.getItem("email");

			const matchingUser = response.data.find(
				(user) => user.email === userEmail
			);

			if (matchingUser) {
				localStorage.setItem("social_id", matchingUser._id);
				console.log("social_id", matchingUser._id);

				navigate("/");
				// localStorage.removeItem("email");

				console.log(
					"Data of matching user stored in localStorage:",
					matchingUser
				);
			} else {
				console.log("No matching user found.");
			}
		})
		.catch((error) => {
			console.error("Error fetching user data:", error);
		});

	return (
		<div className="container grid items-center justify-center min-h-screen grid-cols-1 mx-auto">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<div className="flex flex-col justify-center max-w-sm gap-5 p-8 mx-auto rounded-lg shadow-lg lg:max-w-xl">
				<h3 className="text-5xl text-center font-bold  text-[#32308E] opacity-40">
					Social<span className="underline text-[#2a295f]">Link</span>
				</h3>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-center gap-4 mt-10 font-semibold text-gray-600"
				>
					<input
						label="Name"
						onChange={handleChange}
						type="text"
						required
						name="name"
						className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 bg-[#e5e7eb]"
						placeholder="type your name"
					/>
					<input
						onChange={handleChange}
						type="file"
						required
						name="image"
						accept="image/*"
						placeholder="Photo"
						className="px-2 py-4 border rounded-md cursor-pointer"
					/>
					<input
						label="Email"
						onChange={handleChange}
						type="email"
						required
						name="email"
						className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 bg-[#e5e7eb]"
						placeholder="type your email"
					/>
					<div className="relative">
						<input
							label="Password"
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name="password"
							required
							className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 w-full bg-[#e5e7eb]"
							placeholder="type password"
						/>
						{passwordShow ? (
							<VisibilityIcon
								onClick={() => handlePasswordShow()}
								className="absolute cursor-pointer right-5 top-4"
							/>
						) : (
							<VisibilityOffIcon
								onClick={() => handlePasswordShow()}
								className="absolute cursor-pointer right-5 top-4"
							/>
						)}
					</div>
					<div className="relative">
						<input
							label="Confirm Password"
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name="confirmPassword"
							required
							className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 w-full bg-[#e5e7eb]"
							placeholder="confirm password"
						/>
						{passwordShow ? (
							<VisibilityIcon
								onClick={() => handlePasswordShow()}
								className="absolute cursor-pointer right-5 top-4"
							/>
						) : (
							<VisibilityOffIcon
								onClick={() => handlePasswordShow()}
								className="absolute cursor-pointer right-5 top-4"
							/>
						)}
					</div>
					<input
						type="submit"
						value={"Register"}
						className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300"
					/>
				</form>
				<div>
					<p className="text-center">
						Already have an account? Please{" "}
						<Link
							to="/login"
							className="text-[#6A67FF] underline font-semibold"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
