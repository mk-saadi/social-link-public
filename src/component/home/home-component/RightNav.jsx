import axios from "axios";
import { useEffect, useState } from "react";

const RightNav = () => {
	const [users, setUsers] = useState([]);

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [isVerified, setIsVerified] = useState("");

	useEffect(() => {
		const email = localStorage.getItem("email");
		const name = localStorage.getItem("name");
		const image = localStorage.getItem("image");
		const isVerified = localStorage.getItem("isVerified");

		setEmail(email);
		setName(name);
		setImage(image);
		setIsVerified(isVerified);
	}, []);

	const getUsers = async () => {
		const response = await axios.get(
			"https://social-link-server-liard.vercel.app/users"
		);
		return response.data;
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users);
		};

		fetchUsers();
	}, []);

	return (
		<div className='pt-10'>
			<div className='flex gap-4 items-center'>
				<img
					className='w-14 rounded-full'
					src={image || ""}
					alt='person'
				/>
				<div>
					<h1 className='text-xl font-bold text-gray-500'>{name}</h1>
				</div>
			</div>
			<p className='text-xl font-bold py-6 text-gray-700'>
				People you may know
			</p>
			<div>
				{users?.map((us) => (
					<div
						key={us?._id}
						className='flex gap-4 items-center pb-4 text-gray-600'
					>
						<img
							className='w-14 rounded-full'
							src={us?.image || ""}
							alt='person'
						/>
						<div>
							<h1 className='text-xl font-bold'>{us?.name}</h1>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RightNav;
