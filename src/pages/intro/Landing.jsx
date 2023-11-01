import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div className='min-h-screen flex flex-col justify-center items-center'>
			<p className='text-6xl font-bold text-gray-700'>
				Welcome to <span className='text-[#32308E]'>Social</span>
				<span className='underline text-[#2a295f] '>Link!</span>
			</p>
			<div className='flex justify-center items-center gap-8 mt-10 text-4xl'>
				<Link
					to='/register'
					className='bg-[#6A67FF] text-white py-2 px-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300'
				>
					Register
				</Link>
				<Link
					to='/login'
					className='bg-[#6A67FF] text-white py-2 px-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300'
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default Landing;
