// {
// 	/* Post Owner Info */
// }
// <div className="my-5">
// 	<Accordion className="mb-5 border">
// 		<AccordionSummary
// 			expandIcon={<ExpandMoreIcon />}
// 			aria-controls="panel1a-content"
// 			id="panel1a-header"
// 		>
// 			{/* Post Owner Info Header */}
// 			<Typography
// 				fontSize={"18px"}
// 				fontWeight={"500"}
// 			>
// 				Post Owner Info
// 			</Typography>
// 		</AccordionSummary>
// 		<AccordionDetails>
// 			{/* Post Owner Details */}
// 			<Typography>
// 				<div>
// 					<p>
// 						Post Id:{" "}
// 						<Link to={`/viewPost/${re?.postId}`}>
// 							<span className="font-normal text-sky-600">
// 								{re?.postId}
// 							</span>
// 						</Link>
// 					</p>
// 					<p className="my-3">
// 						UserName:{" "}
// 						<Link to={`/profilePage/${re?.postMaker}`}>
// 							<span className="font-normal text-sky-600">
// 								{re?.postMaker}
// 							</span>
// 						</Link>
// 					</p>

// 					<p>Post Content:</p>
// 					<Link to={`/viewPost/${re?.postId}`}>
// 						<div className="px-5 pt-2 pb-2 my-3 border rounded-md">
// 							{/* Post Content */}
// 							{re?.body || re?.postImage ? (
// 								<>
// 									<p
// 										className={`font-normal ${
// 											re.postImage ? "mb-2" : ""
// 										}`}
// 									>
// 										{re?.body}
// 									</p>

// 									<a
// 										href={re?.postImage}
// 										target="_blank"
// 										title="open image in a new window"
// 										rel="noopener noreferrer"
// 									>
// 										<img
// 											src={re?.postImage}
// 											className="w-auto rounded-md max-h-72"
// 										/>
// 									</a>
// 								</>
// 							) : (
// 								<p>
// 									<NotListedLocationRoundedIcon /> Nothing any
// 									content
// 								</p>
// 							)}
// 						</div>
// 					</Link>
// 				</div>
// 			</Typography>
// 		</AccordionDetails>
// 	</Accordion>

// 	{/* Reporter and Give Feedback Button */}
// 	<div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-0">
// 		{/* Reporter's username */}
// 		<Link
// 			className="font-semibold text-gray-600"
// 			to={`/profilePage/${re?.reporter}`}
// 		>
// 			Reporter's userName:{" "}
// 			<span className="font-normal text-sky-600">{re?.reporter}</span>
// 		</Link>

// 		{/* Give Feedback Button */}
// 		<a
// 			href={`#post-modal-${re._id}`}
// 			className="font-semibold text-white transition-all duration-200 bg-blue-500 btn hover:bg-blue-400"
// 		>
// 			Give feedback
// 		</a>
// 	</div>
// </div>;
