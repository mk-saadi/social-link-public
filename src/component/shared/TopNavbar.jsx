// import * as React from "react";
import { styled } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DominantColorContext } from "../../hook/DominantColorProvider";

// search input field
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

const TopNavbar = () => {
	const [user, setUser] = useState([]);
	const [users, setUsers] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const { dominantColor } = useContext(DominantColorContext);
	const [blockedUsers, setBlockedUsers] = useState([]);

	const userId = localStorage.getItem("social_id");

	const matchedUser = users.find((user) => user?._id === userId);

	// const filteredPosts = searchResults.filter(
	// 	(po) => !blockedUsers?.includes(po?.userName)
	// );

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		if (anchorEl === null) {
			setAnchorEl(event.currentTarget);
			document.body.classList.add("menu-open");
		} else {
			setAnchorEl(null); // Close the menu
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
		document.body.classList.remove("menu-open");
	};

	const handleLogout = () => {
		localStorage.removeItem("social_id");
		sessionStorage.removeItem("dominantColor");
		window.location.reload();
	};

	useEffect(() => {
		axios
			.get("https://social-link-server-liard.vercel.app/users")
			.then((res) => res.data)
			.then((data) => {
				const filteredAndMappedPosts = data.filter(
					(post) => post._id === userId
				);
				setUser(filteredAndMappedPosts);

				setUsers(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [userId]);
	// console.log("top navbar", user);

	const handleSearch = (event) => {
		const searchInputValue = event.target.value;

		if (searchInputValue === "") {
			setSearchResults([]);
		} else {
			const searchResults = users.filter((user) => {
				return (
					user.name
						.toLowerCase()
						.includes(searchInputValue.toLowerCase()) ||
					user.userName
						.toLowerCase()
						.includes(searchInputValue.toLowerCase())
				);
			});

			setSearchResults(searchResults);
		}
	};

	const resetSearchResults = () => {
		setSearchResults([]);
	};

	useEffect(() => {
		try {
			axios
				.get("https://social-link-server-liard.vercel.app/block")
				.then((res) => {
					const hideUser = res.data.find(
						(re) => re?.blockerName === matchedUser?.userName
					);

					const hdUsers = hideUser?.blockedNames;
					setBlockedUsers(hdUsers);
				});
		} catch (error) {
			console.log(error.message);
		}
	}, [matchedUser]);

	return (
		<div className="flex py-1 bg-white shadow-md px-7">
			<div className="flex items-center justify-start flex-1 gap-4 ">
				<Link
					to="/"
					className="hidden text-2xl font-bold text-center opacity-80 md:block"
					style={{ color: dominantColor }}
				>
					Social<span className="">Link</span>
				</Link>
			</div>

			<div className="relative flex-none gap-2">
				<div className="flex items-center justify-start gap-2 ">
					<Search onChange={handleSearch}>
						<SearchIconWrapper>
							<SearchIcon sx={{ color: "#6b7280" }} />
						</SearchIconWrapper>
						<StyledInputBase
							sx={{ fontSize: "15px" }}
							placeholder="search user"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>

					<div className="relative flex items-center justify-start flex-1 gap-4">
						{searchResults.length > 0 && (
							<div className="absolute right-0 py-3 bg-white rounded-lg shadow-lg drop-shadow-lg top-8">
								{searchResults.map((us) => (
									<Link
										key={us._id}
										className="flex justify-start items-center gap-4 p-3 w-[258px] md:w-[280px] hover:bg-[#e7e7e7] duration-200"
										to={`/profilePage/${us?.userName}`}
										onClick={resetSearchResults}
									>
										<div className="avatar">
											<div className="object-cover w-10 rounded-full">
												<img
													src={us?.image}
													alt="avatar"
												/>
											</div>
										</div>
										<span>{us.name}</span>
									</Link>
								))}
							</div>
						)}
					</div>
					{/* 
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="object-cover w-10 rounded-full lg:w-14">
							<img src={user.map((us) => us.image)} />
						</div>
					</label> */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<Tooltip title="Account settings">
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ ml: 2 }}
								aria-controls={
									open ? "account-menu" : undefined
								}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<Avatar className="object-cover w-10 rounded-full lg:w-14">
									<img src={user.map((us) => us?.image)} />
								</Avatar>
							</IconButton>
						</Tooltip>
					</Box>

					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{
							horizontal: "right",
							vertical: "top",
						}}
						anchorOrigin={{
							horizontal: "right",
							vertical: "bottom",
						}}
					>
						<MenuItem onClick={handleClose}>
							<Avatar /> Profile
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Avatar /> My account
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<PersonAdd fontSize="small" />
							</ListItemIcon>
							Add another account
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<Settings fontSize="small" />
							</ListItemIcon>
							Settings
						</MenuItem>
						<MenuItem
							onClick={handleClose}
							onMouseDown={handleLogout}
						>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default TopNavbar;
