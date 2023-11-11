import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../../../hook/Toast";
import useToast from "../../../hook/useToast";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ReportCom = ({ report }) => {
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [feedbackId, setFeedbackId] = useState("");

	const handleChange = (event) => {
		setFeedbackId(event.target.value);
	};

	const handleFeedback = (event, postId) => {
		event.preventDefault();

		const feedbackBody = event.target.feedbackBody.value;

		showToast("loading", "Please wait!");
		const feedback = {
			to: feedbackId,
			feedbackBody,
			postId,
		};

		axios
			.post(
				"https://social-link-server-liard.vercel.app/feedback",
				feedback
			)
			.then((res) => {
				showToast("success", "Feedback sent!");
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				showToast("error", "Failed to sent!");
			});
	};

	return (
		<div>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			{[...report].reverse().map((re) => (
				<div key={re._id}>
					<div className="p-4 my-2 bg-white rounded-md shadow-md">
						<p className="text-lg font-semibold text-gray-600">
							Report: {re.reportType}
						</p>

						<a
							href={`#post-modal-${re._id}`}
							className="font-semibold text-gray-600 hover:underline"
						>
							Give feedback
						</a>

						<div
							id={`post-modal-${re._id}`}
							className="overflow-auto modal"
						>
							<form
								className="bg-white rounded-md modal-box"
								// onSubmit={handleFeedback}
								onSubmit={(event) =>
									handleFeedback(event, re?.postId)
								}
							>
								<h3 className="mb-2 text-xl font-bold text-gray-600">
									Feedback!
								</h3>
								<FormControl sx={{ minWidth: 150 }}>
									<InputLabel id="demo-simple-select-autowidth-label">
										feedback to
									</InputLabel>
									<Select
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										value={feedbackId}
										onChange={handleChange}
										autoWidth
										label="Age"
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										<MenuItem value={re?.reporter}>
											Reporter: {re?.reporter}
										</MenuItem>
										<MenuItem value={re?.postMaker}>
											Post maker: {re?.postMaker}
										</MenuItem>
									</Select>
								</FormControl>
								<div className="mt-4 mb-8">
									<textarea
										name="feedbackBody"
										type="text"
										placeholder="write feedback"
										className="bg-[#e5e7eb] text-base text-gray-600 border-none textarea input-bordered w-full h-[100px] placeholder:text-lg focus:outline-none rounded-none"
									></textarea>
								</div>

								<div className="flex items-center justify-between text-base">
									<div className="flex items-center justify-center gap-2 modal-action">
										<a
											href="#"
											className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md modal__close "
										>
											Go back
										</a>
									</div>
									<div className="flex justify-end">
										<input
											className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300"
											type="submit"
											value="Submit"
										/>
									</div>
								</div>
							</form>
						</div>
						{/* modal body end */}

						<div className="flex items-center justify-center">
							<div className="space-y-2">
								<Link
									className="font-semibold text-gray-600"
									to={`/profilePage/${re?.postMaker}`}
								>
									Post Maker's userName:{" "}
									<span className="font-normal text-sky-600">
										{re?.postMaker}
									</span>
								</Link>
								<br />
								<br />
								<Link
									className="font-semibold text-gray-600"
									to={`/profilePage/${re?.reporter}`}
								>
									Reporter's userName:{" "}
									<span className="font-normal text-sky-600">
										{re?.reporter}
									</span>
								</Link>
								<br />
								<Link
									to={`/viewPost/${re?.postId}`}
									className="font-semibold text-gray-600"
								>
									Post Id:{" "}
									<span className="font-normal text-sky-600">
										{re?.postId}
									</span>
								</Link>
								<p className="w-full h-full p-1 font-semibold text-gray-600 bg-gray-200 rounded-md">
									Post Body: <br />
									<span className="ml-4 font-normal text-gray-500">
										{re?.body}
									</span>
								</p>
							</div>
							<div className="flex flex-col items-start font-semibold text-gray-500">
								<p>Post image</p>
								<a
									href={re?.postImage}
									target="_blank"
									title="open image in a new window"
									rel="noopener noreferrer"
								>
									<img
										src={re?.postImage}
										className="w-auto max-h-72"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ReportCom;
