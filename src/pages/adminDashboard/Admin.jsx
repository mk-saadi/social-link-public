import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../../hook/Toast";
import useToast from "../../hook/useToast";
import {
	styled,
	AppBar,
	Box,
	IconButton,
	InputBase,
	Toolbar,
	Typography,
	Tabs,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import ReportCom from "./adminComponent/ReportCom";

// Styled components
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
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "26ch",
		},
	},
}));

// Tab
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

// Main component
const Admin = () => {
	// State variables
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const social_id = localStorage.getItem("social_id");
	const [users, setUsers] = useState([]);
	const [report, setReport] = useState([]);
	const [feedback, setFeedback] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// Toast handling
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	// Tab handling
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// Page change handling
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	// Rows per page change handling
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Fetch user data on mount
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

	// Handle user deletion
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

					const filteredUsers = users.filter(
						(user) => user._id !== id
					);
					setUsers(filteredUsers);
				})
				.catch((error) => {
					showToast("error", "Error deleting user!");
					console.error("Error deleting user:", error);
				});
		}
	};

	// Set search results on user change
	useEffect(() => {
		setSearchResults(users);
	}, [users]);

	// Search functionality
	const handleSearch = (event) => {
		const searchInputValue = event.target.value.toLowerCase();

		let searchResults = [];

		if (searchInputValue.startsWith("@")) {
			searchResults = users.filter((user) =>
				user.userName
					.toLowerCase()
					.includes(searchInputValue.substring(1))
			);
		} else if (searchInputValue.startsWith("#")) {
			searchResults = users.filter(
				(user) => user._id === searchInputValue.substring(1)
			);
		} else {
			searchResults = users.filter((user) =>
				user.name.toLowerCase().includes(searchInputValue)
			);
		}

		setSearchResults(searchResults);
	};

	// Fetch report data on mount
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

	// Fetch feedback data on mount
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

	// Accessibility helper function
	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	return (
		<div className="container flex flex-col h-screen mx-auto overflow-hidden md:flex-row">
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			{/* Sidebar */}
			<div className="pt-5 bg-white shadow-md lg:w-2/6 md:pt-16">
				<div className="w-full text-center avatar">
					<div className="object-cover w-32 mx-auto shadow-md drop-shadow-md rounded-xl md:w-52">
						<img
							src={user?.image}
							alt="person"
						/>
					</div>
				</div>
				<div className="text-center">
					<p className="mt-3 text-sm font-semibold text-gray-600 uppercase">
						{user?.role}
					</p>
					<p className="text-2xl font-semibold text-gray-600">
						{user?.name}
					</p>
					<p className="text-gray-400 ">{user?.userName}</p>
				</div>
			</div>

			{/* Main content */}
			<Box
				className="w-full overflow-y-auto hideScrollBar"
				sx={{ width: "100%" }}
			>
				<Box
					sx={{
						borderBottom: 2,
						borderColor: "divider",
						fontWeight: "700",
					}}
					className="mb-10"
				>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
						className="fixed z-10 w-full bg-white shadow-sm"
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

				{/* Users Tab */}
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
								className="py-2"
								placeholder="Search user"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>
					</div>

					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Avatar</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Username</TableCell>
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{searchResults
									.filter((us) => us._id !== user?._id)
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.reverse()
									.map((us) => (
										<TableRow key={us._id}>
											<TableCell>
												<Link
													to={`/profilePage/${us?.userName}`}
													className="avatar hover:shadow-sm"
												>
													<div className="object-cover w-16 rounded-md">
														<img
															src={
																us?.image || ""
															}
															alt="person"
														/>
													</div>
												</Link>
											</TableCell>
											<TableCell>
												<Link
													className="text-base font-semibold text-gray-600 hover:underline"
													to={`/profilePage/${us?.userName}`}
												>
													{us?.name}
												</Link>
											</TableCell>
											<TableCell>
												<p className="text-sm text-gray-400">
													{us?.userName}
												</p>
											</TableCell>
											<TableCell>
												<button
													className="text-base text-red-600"
													onClick={() =>
														handleDelete(us?._id)
													}
												>
													Delete
												</button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={searchResults.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</CustomTabPanel>

				{/* Reports Tab */}
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

				{/* Third Tab (Statistics) */}
				<CustomTabPanel
					value={value}
					index={2}
				>
					<div>Statistics</div>
				</CustomTabPanel>
			</Box>
		</div>
	);
};

export default Admin;
