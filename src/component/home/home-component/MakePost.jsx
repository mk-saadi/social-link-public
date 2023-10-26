import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";

const MakePost = () => {
	const quotes = [
		"Got a brilliant idea?",
		"What is on your mind?",
		"What are you thinking?",
		"What's happening?",
		"Share a thought.",
	];

	const [randomQuote, setRandomQuote] = useState("");

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		setRandomQuote(quotes[randomIndex]);
	}, []);

	// const [imagePreview, setImagePreview] = useState(null);

	// const handleImageChange = (e) => {
	// 	const file = e.target.files[0];
	// 	if (file) {
	// 		const reader = new FileReader();

	// 		reader.onload = (e) => {
	// 			setImagePreview(e.target.result);
	// 		};

	// 		reader.readAsDataURL(file);
	// 	}
	// };

	const [imagePreviews, setImagePreviews] = useState([]);

	const handleImageChange = (e) => {
		const files = e.target.files;
		if (files) {
			const previews = Array.from(files).map((file) => {
				return URL.createObjectURL(file);
			});
			setImagePreviews([...imagePreviews, ...previews]);
		}
	};

	const handlePost = (event) => {
		event.preventDefault();

		const form = event.target;
		const uploadedImage = form.uploadedImage.value;
		const body = form.body.value;

		const postDoc = {
			uploadedImage: uploadedImage,
			body: body,
		};

		axios
			.post("http://localhost:7000/posts", postDoc)
			.then((response) => {
				console.log("Posted:", response.data);
				window.location.reload();
			})
			.catch((error) => {
				console.log(
					"Error storing post details in the database:",
					error
				);
			});
	};

	return (
		<div>
			<div className='text-center text-gray-700 text-lg py-1 pl-4 w-full font-semibold'>
				<a href='#post-modal'>{randomQuote}</a>
			</div>

			<div
				id='post-modal'
				className='modal overflow-auto'
			>
				<form
					className=' bg-[#ede6d7] shadow-xl drop-shadow-xl border border-[rgba(63,63,63,0.64)] rounded-xl py-6 w-[95%] md:w-[60%]'
					onSubmit={handlePost}
				>
					<p className='text-center text-2xl font-semibold text-gray-700 mb-2'>
						Create a post
					</p>
					<hr className='bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[3px] drop-shadow-md shadow-md rounded-3xl' />
					<div className='px-2 md:px-10'>
						<textarea
							type='text'
							required
							placeholder='type post text here'
							className='bg-transparent border-none textarea w-full input-bordered rounded-sm'
							name='body'
						></textarea>
						<input
							type='file'
							onChange={handleImageChange}
							multiple
							required
							name='uploadedImages'
							accept='image/*'
							className='hidden'
							id='image-input'
						/>
						<label
							htmlFor='image-input'
							className='px-2 py-4 border rounded-md cursor-pointer'
						>
							Upload Image(s)
							<AddPhotoAlternateIcon />
						</label>

						<div className='flex flex-col md:flex-row flex-wrap justify-center items-center max-h-[400px] overflow-y-auto'>
							{imagePreviews.map((preview, index) => (
								<img
									key={index}
									src={preview}
									alt={`Preview ${index}`}
									style={{
										height: "200px",
										width: "auto",
										borderRadius: "7px",
									}}
									className='mb-2'
								/>
							))}
						</div>
					</div>

					<br />
					<div className='flex justify-end'>
						<input
							className='bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 w-full mx-4'
							type='submit'
							value='Post'
						/>
					</div>
					<div className='modal-action absolute top-0 right-6 hover:underline text-rose-400'>
						<a
							href='#'
							className='modal__close flex justify-center items-center text-2xl'
						>
							<AiOutlineClose />
						</a>
					</div>
				</form>
			</div>
			<hr className='bg-gradient-to-r from-[#6A67FF] to-[#2a295f] border-0 h-[7px] drop-shadow-md shadow-md rounded-3xl mx-4' />
		</div>
	);
};

export default MakePost;
