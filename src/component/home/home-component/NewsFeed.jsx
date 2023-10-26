import { CiMenuKebab } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import MakePost from "./MakePost";

const NewsFeed = () => {
	const [items, setPosts] = useState([]);

	const getPosts = async () => {
		const response = await axios.get(
			"https://social-link-server-liard.vercel.app/posts"
		);
		return response.data;
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = await getPosts();
			setPosts(posts);
		};

		fetchPosts();
	}, []);

	console.log(items);
	return (
		<div>
			<MakePost />
			<div className='border-2 m-8 mt-16 border-gray-400'>
				{/* top bar */}
				<div className='flex justify-between items-center mx-4 mt-4'>
					<div className='flex justify-center items-center'>
						<div className='w-10 lg:w-16 rounded-full '>
							<img
								src='https://e7.pngegg.com/pngimages/969/124/png-clipart-logo-bangladesh-independent-television-television-channel-design-television-text.png'
								alt=''
								className='rounded-full hidden md:block'
							/>
						</div>
						<p className='text-2xl text-gray-700 ml-2 font-semibold cursor-pointer'>
							The Independent
						</p>
						<p className='text-lg text-gray-500 ml-8'>
							4 minutes ago
						</p>
					</div>

					<CiMenuKebab className='text-2xl text-gray-700 ml-2 font-semibold cursor-pointer' />
				</div>
				{/* top bar */}

				{/* body */}
				<div className='mx-4 mt-8'>
					<p className='text-xl text-gray-700'>
						The official Instagram Account of Independent Television
						Ltd, a private 24-hour news channel.
						#IndependentTelevision #independent24tv
					</p>
					<img
						src='https://hatrabbits.com/wp-content/uploads/2021/10/blog-infographic-onderzoeken.png'
						alt=''
						className='rounded-lg my-6 w-full'
					/>
				</div>
				<div className='flex justify-around items-center'>
					<div className='flex justify-start items-center gap-8 w-full mx-4 mr-16'>
						<AiFillHeart className='text-rose-500 text-6xl' />
						<FaComment className='text-gray-700 text-5xl' />
						<input
							type='text'
							placeholder='comment'
							className='input input-bordered border-gray-400 w-full focus:outline-0 bg-transparent rounded-md'
						/>
					</div>
					<div className='flex justify-center items-center gap-8 mr-4'>
						<FaShare className='text-gray-700 text-4xl' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsFeed;
