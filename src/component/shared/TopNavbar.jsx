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

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
			width: "24ch",
			"&:focus": {
				width: "34ch",
			},
		},
	},
}));

// export default function SearchAppBar() {
// 	return (
// 		<Box
// 			sx={{
// 				flexGrow: 1,
// 			}}
// 		>
// 			<AppBar
// 				position="static"
// 				sx={{
// 					backgroundColor: "#fff",
// 					boxShadow:
// 						"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
// 				}}
// 			>
// 				<Toolbar>
// 					<h3 className="text-2xl text-center font-bold  text-[#32308E] opacity-80">
// 						Social
// 						<span className="underline text-[#2a295f]">Link</span>
// 					</h3>
// 					<Search>
// 						<SearchIconWrapper>
// 							<SearchIcon sx={{ color: "#6b7280" }} />
// 						</SearchIconWrapper>
// 						<StyledInputBase
// 							placeholder="search user"
// 							inputProps={{ "aria-label": "search" }}
// 						/>
// 					</Search>
// 					<IconButton
// 						size="large"
// 						edge="start"
// 						color="inherit"
// 						aria-label="open drawer"
// 						sx={{ mr: 2 }}
// 					>
// 						<MenuIcon />
// 					</IconButton>
// 					<Typography
// 						variant="h6"
// 						noWrap
// 						component="div"
// 						sx={{
// 							flexGrow: 1,
// 							display: { xs: "none", sm: "block" },
// 						}}
// 					>
// 						MUI
// 					</Typography>
// 				</Toolbar>
// 			</AppBar>
// 		</Box>
// 	);
// }

const TopNavbar = () => {
	const [user, setUser] = useState([]);
	const [users, setUsers] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	const userId = localStorage.getItem("social_id");

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
	console.log("top navbar", user);

	const handleSearch = (event) => {
		const searchInputValue = event.target.value;

		if (searchInputValue === "") {
			setSearchResults([]);
		} else {
			const searchResults = users.filter((user) => {
				return user.name
					.toLowerCase()
					.includes(searchInputValue.toLowerCase());
			});

			setSearchResults(searchResults);
		}
	};

	return (
		<div className="bg-white shadow-md flex px-7">
			<div className=" flex justify-start items-center gap-4 flex-1">
				<h3 className="text-2xl text-center font-bold  text-[#32308E] opacity-80 hidden md:block">
					Social<span className="text-[#2a295f]">Link</span>
				</h3>
			</div>

			<div className="relative flex-none gap-2">
				<div className=" flex justify-start items-center gap-2 ">
					<Search onChange={handleSearch}>
						<SearchIconWrapper>
							<SearchIcon sx={{ color: "#6b7280" }} />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="search user"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>

					<div className="relative flex justify-start items-center gap-4 flex-1">
						{searchResults.length > 0 && (
							<Link className="absolute top-8 right-0 bg-white rounded-lg shadow-lg py-3">
								{searchResults.map((us) => (
									<Link
										key={us._id}
										className="flex justify-start items-center gap-4 p-3 w-[258px] md:w-[280px] hover:bg-[#e7e7e7] duration-200"
										to={`/profilePage/${us?.userName}`}
									>
										<div className="avatar">
											<div className="w-10 rounded-full object-cover">
												<img
													src={us?.image}
													alt="avatar"
												/>
											</div>
										</div>
										<span>{us.name}</span>
									</Link>
								))}
							</Link>
						)}
					</div>

					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img src={user.map((us) => us.image)} />
						</div>
					</label>
				</div>
			</div>
		</div>
	);
};

export default TopNavbar;
