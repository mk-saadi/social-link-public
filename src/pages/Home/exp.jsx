// import React from "react";

// const exp = () => {
// 	return (
// 		<>
// 			<div>
// 				{filteredPosts.map((po) => (
// 					<div key={po._id}>
// 						<div>
// 							<li>
// 								<label
// 									className="flex items-center gap-4 my-1 rounded-md hover: hover:bg-[#828894]"
// 									htmlFor={`modal_${po._id}`}
// 									// htmlFor="my_modal_7"
// 								>
// 									<SiAdblock className="text-2xl " />
// 									Block {po?.uploaderName}{" "}
// 									{/* getting the user name who made the post */}
// 								</label>
// 							</li>
// 							<input
// 								type="checkbox"
// 								id="my_modal_7"
// 								className="modal-toggle"
// 							/>
// 							<div className="modal">
// 								<div className="modal-box bg-white rounded-md">
// 									<h3 className="font-bold text-xl text-gray-600">
// 										Block!
// 									</h3>
// 									<p className="text-gray-600 font-semibold  mt-4 mb-8">
// 										Are you sure you want to block{" "}
// 										{po?.uploaderName}?{" "}
// 										{/* getting the first uploaderName in the first index of the post data collection, both are not the same  */}
// 									</p>
// 									<div className="flex justify-between items-center text-base">
// 										<div className="modal-action">
// 											<label
// 												htmlFor="my_modal_7"
// 												// className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 -mt-6 px-5"
// 												className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md"
// 											>
// 												Go back
// 											</label>
// 										</div>
// 										<button className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300">
// 											Block
// 										</button>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				))}
// 			</div>

// 			{/* new post */}
// 				<a href="#post-modal">Create a new post, ?</a>
// 			<div>
// 				<div
// 					id="post-modal"
// 					className="modal"
// 				>
// 					<div className="modal-box bg-white rounded-md">
// 						<h3 className="font-bold text-xl text-gray-600">
// 							Block!
// 						</h3>
// 						<p className="text-gray-600 font-semibold  mt-4 mb-8">
// 							Are you sure you want to block {po?.uploaderName}?{" "}
// 							{/* getting the first uploaderName in the first index of the post data collection, both are not the same  */}
// 						</p>
// 						<div className="flex justify-between items-center text-base">
// 							<div className="modal-action">
// 								<label
// 									// htmlFor="my_modal_7"
// 									// className="bg-[#6A67FF] text-white py-3 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300 -mt-6 px-5"
// 									href="#"
// 									className="text-gray-600 bg-[#e5e7eb] py-2 px-6 cursor-pointer font-semibold duration-300 -mt-6 rounded-md"
// 								>
// 									Go back
// 								</label>
// 							</div>
// 							<button className="bg-[#6A67FF] text-white py-2 px-6 cursor-pointer font-bold rounded-md hover:bg-opacity-80 duration-300">
// 								Block
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default exp;
