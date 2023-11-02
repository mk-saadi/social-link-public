import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightNav = () => {
	const [users, setUsers] = useState([]);
	const userId = localStorage.getItem("social_id");

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

	const matchedUser = users.find((user) => user?._id === userId);

	const randomUsers = users
		.filter((user) => user._id !== userId)
		.sort(() => Math.random() - 0.5)
		.slice(0, 5);

	/* ------------------------------ follow -------------------------------- */
	const handleFollow = async (id) => {
		const followData = {
			followerId: userId,
			followingIds: [id],
		};

		const response = await axios.post(
			"https://social-link-server-liard.vercel.app/follow",
			followData
		);

		console.log("follow successful:", response);
		console.log("data success", response.data.success);
	};

	return (
		<div className="bg-white shadow-md rounded-lg w-[340px]">
			<div className="flex flex-col">
				<p className="text-xl font-bold p-4 text-gray-700">
					People you may know
				</p>

				<div>
					{randomUsers
						.filter((user) => user._id !== userId)
						.map((user) => (
							<div
								key={user._id}
								className="flex justify-between gap-2 items-center mx-4 text-lg font-semibold"
							>
								<Link className="flex justify-center items-center gap-3 my-2">
									<div className="avatar">
										<div className="w-14 rounded-full object-cover">
											<img
												src={user?.image || ""}
												alt="person"
											/>
										</div>
									</div>
									<h1 className="text-gray-700 hover:underline">
										{user?.name}
									</h1>
								</Link>
								<div
									className="text-[#32308E] font-semibold hover:underline cursor-pointer"
									onClick={() => handleFollow(user?._id)}
								>
									<p>Follow</p>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default RightNav;

{
	/* <div className="flex gap-4 items-center">
				{matchedUser && (
					<>
						<img
							className="w-14 rounded-full"
							src={matchedUser?.image || ""}
							alt="person"
						/>
						<div>
							<h1 className="text-xl font-bold text-gray-500">
								{matchedUser?.name}
							</h1>
						</div>
					</>
				)}
			</div> */
}
