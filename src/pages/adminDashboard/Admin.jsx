import axios from "axios";
import { useEffect, useState } from "react";
import Toast from "../../hook/Toast";
import useToast from "../../hook/useToast";
// import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel } from "@mui/lab";
import PropTypes from "prop-types";
import ReportCom from "./adminComponent/ReportCom";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#e5e7eb",
	"&:hover": {
		backgroundColor: "#eff3f8",
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
	transition: "0.3s ease",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "6b7280",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "26ch",
			// "&:focus": {
			// 	width: "34ch",
			// },
		},
	},
}));

// tab
function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const Admin = () => {
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const social_id = localStorage.getItem("social_id");
	const [users, setUsers] = useState([]);
	const [report, setReport] = useState([]);
	// const [posts, setPosts] = useState([]);
	const [feedback, setFeedback] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/users")
			.then((res) => res.data)
			.then((data) => {
				const filteredUser = data.find((us) => us._id === social_id);
				setUser(filteredUser);
				setUsers(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [social_id]);

	const handleDelete = (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this user from the database?"
		);

		showToast("loading", "Deleting. Please wait!");

		if (confirmDelete) {
			axios
				.delete(
					`https://social-link-server-liard.vercel.app/users/${id}`
				)
				.then((response) => {
					showToast("success", "Successfully deleted user!");

					console.log("User deleted successfully:", response.data);
					// You may want to refresh the user list or perform other actions after deletion
					const filteredUsers = users.filter(
						(user) => user._id !== id
					);

					// Update the user list state with the filtered data
					setUsers(filteredUsers);
					// Refresh the user list or perform other actions after deletion
				})
				.catch((error) => {
					showToast("error", "Error deleting user!");
					console.error("Error deleting user:", error);
					// Handle the error gracefully, display a message to the user, or take appropriate action
				});
		}
	};

	useEffect(() => {
		setSearchResults(users);
	}, [users]);

	console.log(searchResults);

	// const handleSearch = (event) => {
	// 	const searchInputValue = event.target.value;

	// 	let searchResults = [];

	// 	if (searchInputValue.startsWith("@")) {
	// 		// Search by username
	// 		searchResults = users.filter((user) => {
	// 			return user.userName
	// 				.toLowerCase()
	// 				.includes(searchInputValue.toLowerCase().substring(1));
	// 		});
	// 	} else {
	// 		// Don't search by username if "@" is not present
	// 		searchResults = users.filter((user) =>
	// 			user.name.toLowerCase().includes(searchInputValue.toLowerCase())
	// 		);
	// 	}

	// 	setSearchResults(searchResults);
	// };

	const handleSearch = (event) => {
		const searchInputValue = event.target.value;

		let searchResults = [];

		if (searchInputValue.startsWith("@")) {
			// Search by username
			searchResults = users.filter((user) =>
				user.userName
					.toLowerCase()
					.includes(searchInputValue.toLowerCase().substring(1))
			);
		} else if (searchInputValue.startsWith("#")) {
			// Search by _id
			searchResults = users.filter(
				(user) => user._id === searchInputValue.substring(1)
			);
		} else {
			// Don't search by username if "@" is not present
			searchResults = users.filter((user) =>
				user.name.toLowerCase().includes(searchInputValue.toLowerCase())
			);
		}

		setSearchResults(searchResults);
	};

	// >> report api
	// has post id as postId and userName as userName
	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/report")
			.then((res) => res.data)
			.then((data) => {
				setReport(data);
				console.log("report", data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);
	console.log("report", report);

	// >> posts api
	// has post _id
	// useEffect(() => {
	// 	axios
	// 		.get("https://social-link-server-liard.vercel.app/posts")
	// 		.then((res) => res.data)
	// 		.then((data) => {
	// 			setPosts(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 		});
	// }, []);

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/feedback")
			.then((res) => res.data)
			.then((data) => {
				setFeedback(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<div className="grid h-screen grid-cols-3 overflow-hidden max-w-[1080px] mx-auto">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<div className="flex flex-col items-center justify-center bg-white shadow-md">
				<div className="avatar">
					<div className="object-cover shadow-md drop-shadow-md rounded-xl w-44">
						<img
							src={user?.image || ""}
							alt="person"
						/>
					</div>
				</div>
				<p className="mt-3 text-2xl font-semibold text-gray-600">
					{user?.role}
				</p>
				<p className="text-2xl font-semibold text-gray-600">
					{user?.name}
				</p>

				<p className="font-semibold text-gray-400">{user?.userName}</p>
			</div>

			<Box
				className="col-span-2 overflow-y-auto hideScrollBar"
				sx={{ width: "100%" }}
			>
				{/* <Box sx={{ width: '100%' }}> */}
				<Box
					sx={{
						borderBottom: 2,
						borderColor: "divider",
						fontWeight: "700",
					}}
				>
					<Tabs
						value={value}
						onChange={handleChange}
						centered
						aria-label="basic tabs example"
						className="bg-whie"
						sx={{ fontWeight: "600" }}
					>
						<Tab
							label="Users"
							{...a11yProps(0)}
						/>
						<Tab
							label="Reports"
							{...a11yProps(1)}
						/>
						<Tab
							label="Item Three"
							{...a11yProps(2)}
						/>
					</Tabs>
				</Box>

				<CustomTabPanel
					value={value}
					index={0}
				>
					<div className="mb-5">
						<Search
							className="shadow-md"
							onChange={handleSearch}
						>
							<SearchIconWrapper>
								<SearchIcon sx={{ color: "#6b7280" }} />
							</SearchIconWrapper>
							<StyledInputBase
								sx={{ fontSize: "15px" }}
								placeholder="search user"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>
					</div>

					{searchResults
						.filter((us) => us._id !== user?._id)
						.reverse()
						.map((us) => (
							<div
								key={us._id}
								className="flex items-center justify-start gap-4 m-2 mx-6 bg-white rounded-md"
							>
								<Link
									to={`/profilePage/${us?.userName}`}
									className="avatar hover:shadow-sm"
								>
									<div className="object-cover w-16 rounded-md">
										<img
											src={us?.image || ""}
											alt="person"
										/>
									</div>
								</Link>

								<div className="flex-1">
									<Link
										className="text-base font-semibold text-gray-600 hover:underline"
										to={`/profilePage/${us?.userName}`}
									>
										{us?.name}
									</Link>
									<p className="text-sm text-gray-400">
										{us?.userName}
									</p>
								</div>

								<div className="pr-2 text-base font-semibold text-error">
									<button
										className=""
										onClick={() => handleDelete(us?._id)}
									>
										Delete
									</button>
								</div>
							</div>
						))}
				</CustomTabPanel>

				<CustomTabPanel
					value={value}
					index={1}
				>
					<div>
						<ReportCom
							report={report}
							feedback={feedback}
						/>
					</div>
				</CustomTabPanel>

				<CustomTabPanel
					value={value}
					index={2}
				>
					<div>statistic</div>
				</CustomTabPanel>
			</Box>
		</div>
	);
};

export default Admin;
