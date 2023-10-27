import { Chip, Divider } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import LeftNav from "../home-component/LeftNav";


const UserProfile = () => {

    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const image = localStorage.getItem("image");
    // localStorage.getItem("isVerified");


    return (
        <div>
            <div className="xl:block lg:hidden md:block">
                <LeftNav />
            </div>
            <div className="max-w-5xl mx-auto py-10 min-h-screen">
                <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-10 gap-6 py-10">
                    <div className="lg:w-52 lg:h-52 w-32 h-32 border-4 border-[#6A67FF] rounded-full">
                        <img src={image} className="w-full h-full object-cover rounded-full" alt="" />
                    </div>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <div>
                        <h2 className="lg:text-5xl text-2xl font-semibold uppercase mb-3">{name}</h2>
                        <div className="flex gap-2 ">
                            <button><Chip label="Edit Profile" variant="outlined" className="hover:border-[#6A67FF]" icon={<EditIcon />} /> </button>

                        </div>
                        <div className="flex gap-10 mt-8">
                            <span className=" font-semibold">0 Posts</span>
                            <span className="cursor-pointer font-semibold">0 Followers</span>
                            <span className="cursor-pointer font-semibold">0 Following</span>
                        </div>
                        <div></div>
                    </div>
                </div>
                <Divider variant="middle" className="mt-5" />
            </div>
        </div>
    );
};

export default UserProfile;