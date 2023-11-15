import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotListedLocationRoundedIcon from "@mui/icons-material/NotListedLocationRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import Toast from "../../../hook/Toast";
import useToast from "../../../hook/useToast";

const ReportCom = ({ report }) => {
	// Toast related state and functions
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	// State for feedback recipient
	const [feedbackId, setFeedbackId] = useState("");

	// State for pagination
	const [page, setPage] = useState(1);
	const itemsPerPage = 5;

	const handleChangePage = (event, value) => {
		setPage(value);
	};

	const startIndex = (page - 1) * itemsPerPage;
	const paginatedReports = [...report]
		.reverse()
		.slice(startIndex, startIndex + itemsPerPage);

	// Handle change in feedback recipient
	const handleChange = (event) => {
		setFeedbackId(event.target.value);
	};

	// Handle feedback submission
	const handleFeedback = (event, postId) => {
		event.preventDefault();

		const feedbackBody = event.target.feedbackBody.value;

		showToast("loading", "Please wait!");

		const feedback = {
			to: feedbackId,
			feedbackBody,
			postId,
		};

		// Send feedback using Axios
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
				console.error(err);
				showToast("error", "Failed to send feedback!");
			});
	};

	return (
		<div>
			{/* Display Toast messages if any */}
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			{/* Map through reports and display details */}
			{paginatedReports.map((re) => (
				<div key={re._id}>
					<div className="p-4 my-2 bg-white rounded-md shadow-md">
						{/* Report Type Header */}
						<p className="flex items-center gap-2 text-lg font-semibold text-gray-600">
							<ReportGmailerrorredRoundedIcon /> Report Type:{" "}
							<span className="font-normal capitalize">
								{re.reportType}
							</span>
						</p>

						{/* Feedback Form */}
						<div
							id={`post-modal-${re._id}`}
							className="overflow-auto modal"
						>
							<form
								className="bg-white rounded-md modal-box"
								onSubmit={(event) =>
									handleFeedback(event, re?.postId)
								}
							>
								<h3 className="mb-2 text-xl font-bold text-gray-600">
									Feedback!
								</h3>
								<FormControl sx={{ minWidth: 150 }}>
									{/* Feedback recipient dropdown */}
									<InputLabel id="demo-simple-select-autowidth-label">
										Feedback to
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
									{/* Feedback text area */}
									<textarea
										name="feedbackBody"
										type="text"
										placeholder="Write feedback"
										className="bg-[#e5e7eb] text-base text-gray-600 border-none textarea input-bordered w-full h-[100px] placeholder:text-lg focus:outline-none rounded-none"
									></textarea>
								</div>

								{/* Feedback Form Actions */}
								<div className="flex items-center justify-between text-base">
									<div className="flex items-center justify-center gap-2 modal-action">
										{/* Cancel button */}
										<a
											href="#"
											className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md modal__close "
										>
											Go back
										</a>
									</div>
									<div className="flex justify-end">
										{/* Submit button */}
										<input
											className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300"
											type="submit"
											value="Submit"
										/>
									</div>
								</div>
							</form>
						</div>

						{/* Post Owner Info */}
						<div className="my-5">
							<Accordion className="mb-5 border">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									{/* Post Owner Info Header */}
									<Typography
										fontSize={"18px"}
										fontWeight={"500"}
									>
										Post Owner Info
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									{/* Post Owner Details */}
									<Typography>
										<div>
											<p>
												Post Id:{" "}
												<Link
													to={`/viewPost/${re?.postId}`}
												>
													<span className="font-normal text-sky-600">
														{re?.postId}
													</span>
												</Link>
											</p>
											<p className="my-3">
												UserName:{" "}
												<Link
													to={`/profilePage/${re?.postMaker}`}
												>
													<span className="font-normal text-sky-600">
														{re?.postMaker}
													</span>
												</Link>
											</p>

											<p>Post Content:</p>
											<Link
												to={`/viewPost/${re?.postId}`}
											>
												<div className="px-5 pt-2 pb-2 my-3 border rounded-md">
													{/* Post Content */}
													{re?.body ||
													re?.postImage ? (
														<>
															<p
																className={`font-normal ${
																	re.postImage
																		? "mb-2"
																		: ""
																}`}
															>
																{re?.body}
															</p>

															<a
																href={
																	re?.postImage
																}
																target="_blank"
																title="open image in a new window"
																rel="noopener noreferrer"
															>
																<img
																	src={
																		re?.postImage
																	}
																	className="w-auto rounded-md max-h-72"
																/>
															</a>
														</>
													) : (
														<p>
															<NotListedLocationRoundedIcon />{" "}
															Nothing any content
														</p>
													)}
												</div>
											</Link>
										</div>
									</Typography>
								</AccordionDetails>
							</Accordion>

							{/* Reporter and Give Feedback Button */}
							<div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-0">
								{/* Reporter's username */}
								<Link
									className="font-semibold text-gray-600"
									to={`/profilePage/${re?.reporter}`}
								>
									Reporter's userName:{" "}
									<span className="font-normal text-sky-600">
										{re?.reporter}
									</span>
								</Link>

								{/* Give Feedback Button */}
								<a
									href={`#post-modal-${re._id}`}
									className="font-semibold text-white transition-all duration-200 bg-blue-500 btn hover:bg-blue-400"
								>
									Give feedback
								</a>
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Pagination */}
			<div className="flex justify-center mt-4">
				<Pagination
					count={Math.ceil(report.length / itemsPerPage)}
					page={page}
					onChange={handleChangePage}
					color="primary"
				/>
			</div>
		</div>
	);
};

export default ReportCom;
