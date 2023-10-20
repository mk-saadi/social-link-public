import Navbar from "../shared/Navbar";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";

const Home = () => {
    return (
        <>
            <div className="grid lg:grid-cols-8 min-h-screen">
                <div className="lg:col-span-2 hidden md:block ">
                    <LeftNav />
                </div>

                <section className="col-span-4 mt-4">
                    <Navbar />
                    <div className="border-2 m-8 mt-16 border-gray-400">
                        {/* top bar */}
                        <div className="flex justify-between items-center mx-4 mt-4">
                            <div className="flex justify-center items-center">
                                <div className="w-10 lg:w-16 rounded-full ">
                                    <img
                                        src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1697800160~exp=1697800760~hmac=cd2386d2d27a837d19ea7504b93827fcab9dd30dd726efcf57d79dee2cdfa1e0"
                                        alt=""
                                        className="rounded-full hidden md:block"
                                    />
                                </div>
                                <p className="text-2xl text-gray-700 ml-2 font-semibold cursor-pointer">
                                    Adam Sandler
                                </p>
                                <p className="text-lg text-gray-500 ml-8">4 minutes ago</p>
                            </div>

                            <CiMenuKebab className="text-2xl text-gray-700 ml-2 font-semibold cursor-pointer" />
                        </div>
                        {/* top bar */}

                        {/* body */}
                        <div className="mx-4 mt-8">
                            <p className="text-xl">
                                The official Instagram Account of Independent Television Ltd, a
                                private 24-hour news channel. #IndependentTelevision
                                #independent24tv
                            </p>
                            <img
                                src="https://hatrabbits.com/wp-content/uploads/2021/10/blog-infographic-onderzoeken.png"
                                alt=""
                                className="rounded-lg my-6 w-full"
                            />
                        </div>
                        <div className="flex justify-around items-center">
                            <div className="flex justify-center items-center gap-8">
                                <AiFillHeart className="text-gray-700 text-4xl" />
                                <input
                                    type="text"
                                    placeholder="comment"
                                />
                            </div>
                            <div className="flex justify-center items-center gap-8">
                                <FaComment className="text-gray-700 text-4xl" />
                                <FaShare className="text-gray-700 text-4xl" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="lg:col-span-2 hidden md:block ">
                    <RightNav />
                </section>
            </div>
        </>
    );
};

export default Home;
