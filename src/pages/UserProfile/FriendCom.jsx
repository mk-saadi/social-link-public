import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FriendCom = ({ profileUserId, dominantColor }) => {
	const [users, setUsers] = useState([]);
	const [include, setInclude] = useState([]);

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

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/follow")
			.then((res) => {
				const data = res.data;

				const followingIds = data.find(
					(follow) => follow?.followerId === profileUserId
				)?.followingIds;

				const followingUserDetails = users
					.reverse()
					.filter((user) => followingIds.includes(user?._id));

				setInclude(followingUserDetails);
			});
	}, [profileUserId, users]);

	// console.log("followers");

	const formatText = (text, maxLength) => {
		if (text.length > maxLength) {
			return `${text.substring(0, maxLength)}...`;
		}
		return text;
	};

	return (
		<>
			<div className="bg-white shadow-md drop-shadow rounded-md w-full  min-w-[311px]">
				<p className="p-2 text-xl font-semibold text-gray-600 ">
					Following {include?.length}
				</p>
				<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px]" />

				<div className="xl:max-h-[500px] storyModal lg:max-h-[400px] overflow-y-auto">
					{include.map((user) => (
						<div
							key={user._id}
							className="flex items-center justify-between gap-2 mx-4 text-base font-semibold"
						>
							<Link
								className="flex items-center justify-center gap-3 my-2"
								to={`/profilePage/${user?.userName}`}
							>
								<div className="avatar">
									<div className="object-cover rounded-full w-14">
										<img
											src={user?.image || ""}
											alt="person"
										/>
									</div>
								</div>
								<div>
									<p className="font-sans text-sm text-gray-600 hover:underline">
										{formatText(user?.name, 14)}
									</p>
									<p className="hidden text-xs font-semibold text-gray-400 lg:block">
										@{formatText(user?.userName, 14)}
									</p>
								</div>
							</Link>
							<Link
								className="p-2 m-2 font-semibold text-center text-white rounded-md shadow-md"
								to={`/profilePage/${user?.userName}`}
								style={{
									backgroundColor: dominantColor,
								}}
							>
								Profile
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default FriendCom;
