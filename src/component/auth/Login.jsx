import { TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [passwordShow, setPasswordShow] = useState(false);

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
			})
			.catch((error) => {
				console.error("Login failed:", error);
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
		<div className="container grid grid-cols-1 justify-center items-center mx-auto min-h-screen">
			<div className="flex flex-col justify-center gap-5 lg:max-w-xl max-w-sm mx-auto shadow-lg p-8 rounded-lg">
				<h3 className="text-5xl text-center font-bold  text-[#32308E] opacity-40">
					Social<span className="underline text-[#2a295f]">Link</span>
				</h3>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-center gap-4 mt-10 text-gray-700 font-semibold"
				>
					<input
						label="Email"
						value={formData.email}
						onChange={handleChange}
						type="email"
						name="email"
						className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0"
						placeholder="your email"
					/>
					<div className="relative">
						<input
							label="Password"
							value={formData.password}
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name="password"
							className="border border-gray-400 py-3 px-4 rounded-md focus:outline-0 w-full"
							placeholder="your password"
						/>
						{passwordShow ? (
							<VisibilityIcon
								onClick={() => handlePasswordShow()}
								className="absolute right-5 top-4 cursor-pointer"
							/>
						) : (
							<VisibilityOffIcon
								onClick={() => handlePasswordShow()}
								className="absolute right-5 top-4 cursor-pointer"
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
