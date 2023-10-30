import HomeIcon from "@mui/icons-material/Home";
import TextsmsIcon from "@mui/icons-material/Textsms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
	const handleLogout = () => {
		localStorage.removeItem("email");
		localStorage.removeItem("name");
		localStorage.removeItem("image");
		localStorage.removeItem("isVerified");
		window.location.reload();
	};

	return (
		<div className='lg:fixed lg:min-h-screen lg:w-auto w-full block'>
			<h1 className='text-[#32308E] text-5xl font-bold p-5 text-center'>
				Social <span className='text-[#6A67FF]'>Link</span>
			</h1>
			<div>
				<nav className='px-5 lg:mt-24'>
					<ul className='menu flex lg:flex-col flex-row gap-2 '>
						<NavLink
							to={"/"}
							className=' rounded-md text-2xl font-semibold text-[#32308E]'
						>
							<li>
								<p>
									<HomeIcon className='bg-transparent' />
									Home
								</p>
							</li>
						</NavLink>
						<p className=' rounded-md text-2xl font-semibold text-[#32308E]'>
							<li>
								<p>
									<AddBoxIcon className='bg-transparent' />{" "}
									Create Post
								</p>
							</li>
						</p>
						<p
							to={"/message"}
							className=' rounded-md text-2xl font-semibold text-[#32308E]'
						>
							<li>
								<p>
									<TextsmsIcon className='bg-transparent' />{" "}
									Message
								</p>
							</li>
						</p>
						<p
							to={"/notification"}
							className=' rounded-md text-2xl font-semibold text-[#32308E]'
						>
							<li>
								<p>
									<NotificationsIcon className='bg-transparent' />
									Notification
								</p>
							</li>
						</p>
						<NavLink
							to={"/profile"}
							className=' rounded-md text-2xl font-semibold text-[#32308E]'
						>
							<li>
								<p>
									<AccountCircleIcon className='bg-transparent' />{" "}
									Profile
								</p>
							</li>
						</NavLink>
						<p
							to={"/settings"}
							className=' rounded-md text-2xl font-semibold text-[#32308E]'
						>
							<li>
								<p>
									<SettingsIcon className='bg-transparent' />{" "}
									Settings
								</p>
							</li>
						</p>
						<p
							onClick={handleLogout}
							className=' rounded-md text-2xl font-semibold text-[#32308E]'
						>
							<li>
								<p>
									<LogoutIcon className='bg-transparent' />{" "}
									Logout
								</p>
							</li>
						</p>
						<p
							to={"/more"}
							className=' rounded-md text-2xl font-semibold text-[#32308E]'
						>
							<li>
								<p>
									<MenuIcon className='bg-transparent' />
								</p>
							</li>
						</p>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default LeftNav;
