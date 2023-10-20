import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="bg-[#ede6d7] pb-44  px-8 md:px-0">
            <h1 className="text-[#32308E] text-3xl font-medium py-20 text-center">Social <span className="text-[#6A67FF]">Link</span></h1>
            <div className="flex justify-center md:w-4/5 lg:w-4/12 mx-auto bg-white rounded ">
                <div className=" shadow-md px-10 w-full pb-8">
                    <h1 className="text-center text-[#6A67FF] text-2xl font-medium pt-12">SIGN UP</h1>
                    <div>
                        <div className="my-4">
                            <h1 className="">User Name</h1>
                            <input className="bg-gray-100 w-full p-2 rounded" placeholder="Enter your name" type="name" />
                        </div>
                        <div className="my-4">
                            <h1 className="">Photo URL</h1>
                            <input className="bg-gray-100 w-full p-2 rounded" placeholder="Enter your name" type="file" />
                        </div>
                        <div className="my-4">
                            <h1 className="">Email</h1>
                            <input className="bg-gray-100 w-full p-2 rounded" placeholder="Enter Email" type="name" />
                        </div>
                        <div className="my-4">
                            <h1 className="">Password</h1>
                            <input className="bg-gray-100 w-full p-2 rounded" placeholder="Enter Password" type="password" />
                        </div>
                        <div className="my-4">
                            <h1 className="">Confirm Password</h1>
                            <input className="bg-gray-100 w-full p-2 rounded" placeholder="Enter Password" type="password" />
                        </div>
                        <button className="bg-[#6A67FF] mt-10 text-white p-2 rounded w-full">SIGN UP</button>
                        <p className="text-center my-2">Already have account? Please <Link className="text-[#6A67FF]" to="/login">Log in</Link></p>
                        <div className="flex justify-center items-center">
                            <hr className="w-full" />
                            <h3 className="mx-5">or</h3>
                            <hr className="w-full" />
                        </div>
                        <div className="flex mt-3 justify-center items-center gap-5">
                            <img className="w-12" src="/src/assets/Group 1.png" alt="" />
                            <img className="w-12" src="/src/assets/Group 2.png" alt="" />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;
