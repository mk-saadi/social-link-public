import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

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
			width: "28ch",
			"&:focus": {
				width: "40ch",
			},
		},
	},
}));

export default function SearchAppBar() {
	return (
		<Box
			sx={{
				flexGrow: 1,
			}}
		>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#fff",
					boxShadow:
						"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				}}
			>
				<Toolbar>
					<h3 className="text-2xl text-center font-bold  text-[#32308E] opacity-80">
						Social
						<span className="underline text-[#2a295f]">Link</span>
					</h3>
					<Search>
						<SearchIconWrapper>
							<SearchIcon sx={{ color: "#6b7280" }} />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="search user"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "none", sm: "block" },
						}}
					>
						MUI
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
