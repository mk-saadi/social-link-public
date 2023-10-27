import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const location = new useLocation();

	const imgbbApiKey = "35693cbbb9e1a46748a3b83e16106023";
	console.log(imgbbApiKey);

	const [passwordShow, setPasswordShow] = useState(false);

	const handlePasswordShow = () => {
		setPasswordShow(!passwordShow);
	};

	const [formData, setFormData] = useState({
		name: "",
		image: null,
		email: "",
		password: "",
		confirmPassword: "",
	});
	console.log(formData);

	const handleChange = async (event) => {
		if (event.target.name === "image") {
			const selectedFile = event.target.files[0];

			const options = {
				maxSizeMB: 0.3,
				maxWidthOrHeight: 800,
			};

			try {
				const compressedFile = await imageCompression(
					selectedFile,
					options
				);
				setFormData({ ...formData, image: compressedFile });
			} catch (error) {
				alert("Error compressing image please try again");
			}
		} else {
			setFormData({
				...formData,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert("Password and confirm password do not match.");

			return;
		}

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
							alert("Registration successful");

							console.log("Registration successful:", userEmail);
							location.reload();
						})
						.catch((registrationError) => {
							console.error(
								"Registration failed:",
								registrationError
							);
							// alert("Registration failed please try again");
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

	axios
		.get("https://social-link-server-liard.vercel.app/users")
		.then((response) => {
			const userEmail = localStorage.getItem("email");

			const matchingUser = response.data.find(
				(user) => user.email === userEmail
			);

			if (matchingUser) {
				localStorage.setItem("email", matchingUser.email);
				localStorage.setItem("name", matchingUser.name);
				localStorage.setItem("image", matchingUser.image);
				localStorage.setItem("isVerified", matchingUser.isVerified);
				navigate("/home");
			} else {
				console.log("No matching user found.");
			}
		})
		.catch((error) => {
			console.error("Error fetching user data:", error);
		});

	return (
		<div className='container grid grid-cols-1 justify-center items-center mx-auto min-h-screen'>
			<div className='flex flex-col justify-center gap-5 lg:max-w-xl max-w-sm mx-auto shadow-lg p-8 rounded-lg'>
				<h3 className='text-5xl text-center font-bold  text-[#32308E] opacity-40'>
					Social<span className='underline text-[#2a295f]'>Link</span>
				</h3>

				<form
					onSubmit={handleSubmit}
					className='flex flex-col justify-center gap-4 mt-10 text-gray-700 font-semibold'
				>
					<input
						label='Name'
						onChange={handleChange}
						type='text'
						required
						name='name'
						className='border border-gray-400 py-3 px-4 rounded-md focus:outline-0'
						placeholder='type your name'
					/>
					<input
						onChange={handleChange}
						type='file'
						required
						name='image'
						accept='image/*'
						placeholder='Photo'
						className='px-2 py-4 border rounded-md cursor-pointer'
					/>
					<input
						label='Email'
						onChange={handleChange}
						type='email'
						required
						name='email'
						className='border border-gray-400 py-3 px-4 rounded-md focus:outline-0'
						placeholder='type your email'
					/>
					<div className='relative'>
						<input
							label='Password'
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name='password'
							required
							className='border border-gray-400 py-3 px-4 rounded-md focus:outline-0 w-full'
							placeholder='type password'
						/>
						{passwordShow ? (
							<VisibilityIcon
								onClick={() => handlePasswordShow()}
								className='absolute right-5 top-4 cursor-pointer'
							/>
						) : (
							<VisibilityOffIcon
								onClick={() => handlePasswordShow()}
								className='absolute right-5 top-4 cursor-pointer'
							/>
						)}
					</div>
					<div className='relative'>
						<input
							label='Confirm Password'
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name='confirmPassword'
							required
							className='border border-gray-400 py-3 px-4 rounded-md focus:outline-0 w-full'
							placeholder='confirm password'
						/>
						{passwordShow ? (
							<VisibilityIcon
								onClick={() => handlePasswordShow()}
								className='absolute right-5 top-4 cursor-pointer'
							/>
						) : (
							<VisibilityOffIcon
								onClick={() => handlePasswordShow()}
								className='absolute right-5 top-4 cursor-pointer'
							/>
						)}
					</div>
					<input
						type='submit'
						value={"Register"}
						className='bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300'
					/>
				</form>
				<div>
					<p className='text-center'>
						Already have an account? Please{" "}
						<Link
							to='/login'
							className='text-[#6A67FF] underline font-semibold'
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
