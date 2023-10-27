import { AiFillHome } from "react-icons/ai";
import { BiMessageDetail, BiSolidLogIn } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiSettings } from "react-icons/fi";
import HomeIcon from '@mui/icons-material/Home';
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from "react-router-dom";

const items = [
    {
        id: 1,
        title: "Home",
        icon: <AiFillHome />,
    },
    {
        id: 2,
        title: "Message",
        icon: <BiMessageDetail></BiMessageDetail>,
    },
    {
        id: 3,
        title: "Notification",
        icon: <IoIosNotifications />,
    },
    {
        id: 4,
        title: "Create Post",
        icon: <CiSquarePlus />,
    },
    {
        id: 5,
        title: "Profile",
        icon: <CgProfile />,
    },
    {
        id: 6,
        title: "Login",
        icon: <BiSolidLogIn />,
    },
    {
        id: 7,
        title: "Menu",
        icon: <FiMenu />,
    },
    {
        id: 8,
        title: "Settings",
        icon: <FiSettings />,
    },
];
const LeftNav = () => {

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("image");
        localStorage.removeItem("isVerified");
        window.location.reload()
    };


    return (
        <div className='lg:fixed lg:min-h-screen lg:w-auto w-full block'>
            <h1 className="text-[#32308E] text-5xl font-bold p-5 text-center">
                Social <span className="text-[#6A67FF]">Link</span>
            </h1>
            <div>  {/* {items.map((item) => (
                    <div
                        className=""
                        key={item.id}
                    >
                        <div className="flex text-2xl hover:bg-gray-300 cursor-pointer p-2 mx-5 my-2 rounded gap-2 justify-start items-center text-gray-700">
                            <div>{item.icon}</div>
                            <h1 className="">{item.title}</h1>
                        </div>
                    </div>
                ))} */}
            </div>
            <div>

                <nav className="px-5 lg:mt-24">
                    <ul className="menu flex lg:flex-col flex-row gap-2 ">
                        <NavLink to={'/'} className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><HomeIcon className="bg-transparent" />Home</p></li></NavLink>
                        <p className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><AddBoxIcon className="bg-transparent" /> Create Post</p></li></p>
                        <p to={'/message'} className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><TextsmsIcon className="bg-transparent" /> Message</p></li></p>
                        <p to={'/notification'} className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><NotificationsIcon className="bg-transparent" />Notification</p></li></p>
                        <NavLink to={'/profile'} className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><AccountCircleIcon className="bg-transparent" /> Profile</p></li></NavLink>
                        <p to={'/settings'} className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><SettingsIcon className="bg-transparent" /> Settings</p></li></p>
                        <p onClick={handleLogout} className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><LogoutIcon className="bg-transparent" /> Logout</p></li></p>
                        <p to={'/more'} className=' rounded-md text-2xl font-semibold text-[#32308E]'><li><p><MenuIcon className="bg-transparent" /></p></li></p>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default LeftNav;
