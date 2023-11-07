import { TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../hook/Toast";
import useToast from "../hook/useToast";

const Login = () => {
	const navigate = useNavigate();
	const [passwordShow, setPasswordShow] = useState(false);
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	const handlePasswordShow = () => {
		setPasswordShow(!passwordShow);
	};
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		showToast("loading", "Loading... please wait!");
		axios
			.post(
				"https://social-link-server-liard.vercel.app/users/login",
				formData
			)
			.then((response) => {
				const responseData = JSON.parse(response.config.data);
				const userEmail = responseData.email;

				localStorage.setItem("email", userEmail);
				window.location.reload(true);

				console.log("Login successful:", userEmail);

				showToast("success", "Login Successful!");
			})
			.catch((error) => {
				console.error("Login failed:", error);
				showToast("error", "Login Failed! Please try again.");
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
						label="Email"
						value={formData.email}
						onChange={handleChange}
						type="email"
						name="email"
						className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 bg-[#e5e7eb]"
						placeholder="your email"
					/>
					<div className="relative">
						<input
							label="Password"
							value={formData.password}
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name="password"
							className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 w-full bg-[#e5e7eb]"
							placeholder="your password"
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
						value={"Login"}
						className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300"
					/>
				</form>
				<div>
					<p className="text-center">
						Don't have't your account please{" "}
						<Link
							to="/register"
							className="text-[#6A67FF]  underline font-semibold"
						>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
