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
// 								<div className="bg-white rounded-md modal-box">
// 									<h3 className="text-xl font-bold text-gray-600">
// 										Block!
// 									</h3>
// 									<p className="mt-4 mb-8 font-semibold text-gray-600">
// 										Are you sure you want to block{" "}
// 										{po?.uploaderName}?{" "}
// 										{/* getting the first uploaderName in the first index of the post data collection, both are not the same  */}
// 									</p>
// 									<div className="flex items-center justify-between text-base">
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
// 					<div className="bg-white rounded-md modal-box">
// 						<h3 className="text-xl font-bold text-gray-600">
// 							Block!
// 						</h3>
// 						<p className="mt-4 mb-8 font-semibold text-gray-600">
// 							Are you sure you want to block {po?.uploaderName}?{" "}
// 							{/* getting the first uploaderName in the first index of the post data collection, both are not the same  */}
// 						</p>
// 						<div className="flex items-center justify-between text-base">
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

[
	{
		_id: "6542b0147542aad79244f0ba",
		followerId: "65422f51a1644ee940b46079",
		followingIds: [
			"653b7daf8a8e1b612e150729",
			"65423090a1644ee940b4607a",
			"653b812f92e4e958db1b7c97",
			"65429c9ce63fd529796db6ea",
			"653baadcf1dbd8dbbdcb809e",
			"653b7e9f8a8e1b612e15072a",
			"653b817492e4e958db1b7c98",
		],
	},
	{
		_id: "6542b456803417bc2230a137",
		followerId: "653b817492e4e958db1b7c98",
		followingIds: [
			"653b7daf8a8e1b612e150729",
			"6540c540fab75cb1e6531dd5",
			"65422f51a1644ee940b46079",
			"653a4395589c3b598f635ab9",
			"653bc5effcbf43c60448b365",
			"653a430b589c3b598f635ab8",
		],
	},
	{
		_id: "65432cc92994f4a007d150c2",
		followerId: "653a430b589c3b598f635ab8",
		followingIds: ["653b817492e4e958db1b7c98"],
	},
	{
		_id: "6544235aa73e653c9c399bee",
		followerId: "65442338cdf345bdd9b8f0d8",
		followingIds: [
			"65441fb48091888e8405f840",
			"6543f6baa8e559513de4ca04",
			"65441a8c191201fb82dfa4d5",
			"6543f717e58bff37b869f1c6",
			"6544c2ada5eb70c81449679e",
			"65441d75191201fb82dfa4d6",
			"65440f06b024c711c86848cf",
			"654699f7cd31b07c6ffb12a7",
			"65450ffe80dc8756a2e8b99b",
			"65493e24c8de5c0d2aae2c02",
		],
	},
	{
		_id: "6544c1aafdbda01f265bff10",
		followerId: "653baadcf1dbd8dbbdcb809e",
		followingIds: [
			"6543f6baa8e559513de4ca04",
			"65441fb48091888e8405f840",
			"65441a8c191201fb82dfa4d5",
			"65440f06b024c711c86848cf",
			"6543f717e58bff37b869f1c6",
		],
	},
	{
		_id: "6544c42035b0a564ad7fca07",
		followerId: "6544c2ada5eb70c81449679e",
		followingIds: [
			"65441a8c191201fb82dfa4d5",
			"65441fb48091888e8405f840",
			"65441d75191201fb82dfa4d6",
			"65440f06b024c711c86848cf",
			"6543f6baa8e559513de4ca04",
			"65493e24c8de5c0d2aae2c02",
			"6549355dced3e2de5fb4d928",
			"6549cb3731fcc66d849e54bf",
			"654b746afe04eea62df345ee",
			"654e4f443a97048d6a2a0a76",
			"6543f717e58bff37b869f1c6",
			"65442338cdf345bdd9b8f0d8",
			"6545462ec0ceaee3e2da5d90",
			"654699f7cd31b07c6ffb12a7",
		],
	},
	{
		_id: "6545106b649671c360b2090a",
		followerId: "65450ffe80dc8756a2e8b99b",
		followingIds: ["6543f6baa8e559513de4ca04"],
	},
	{
		_id: "6545110f80dc8756a2e8b99c",
		followingIds: [
			"65442338cdf345bdd9b8f0d8",
			"6543f717e58bff37b869f1c6",
			"6543f6baa8e559513de4ca04",
			"6545462ec0ceaee3e2da5d90",
			"65493e24c8de5c0d2aae2c02",
			"654b746afe04eea62df345ee",
			"6544c2ada5eb70c81449679e",
			"65441a8c191201fb82dfa4d5",
			"6551047613cedbfb143e79c9",
			"6549cb3731fcc66d849e54bf",
			"655265eaa51e1829f4ae18fd",
			"654e4f443a97048d6a2a0a76",
			"655308b5ef2da113bfcd39b5",
		],
		followerId: "65440f06b024c711c86848cf",
	},
	{
		_id: "65451256421b0520db07a05f",
		followerId: "6543f6baa8e559513de4ca04",
		followingIds: [
			"6543f717e58bff37b869f1c6",
			"65441a8c191201fb82dfa4d5",
			"65442338cdf345bdd9b8f0d8",
			"65493e24c8de5c0d2aae2c02",
			"6549355dced3e2de5fb4d928",
		],
	},
	{
		_id: "6546c337fa970d039d422168",
		followerId: "65441fb48091888e8405f840",
		followingIds: [
			"6543f6baa8e559513de4ca04",
			"654699f7cd31b07c6ffb12a7",
			"65440f06b024c711c86848cf",
			"65493e24c8de5c0d2aae2c02",
			"6549355dced3e2de5fb4d928",
			"6545462ec0ceaee3e2da5d90",
		],
	},
	{
		_id: "6547adcea8ecd83011f2c893",
		followingIds: [
			"6543f6baa8e559513de4ca04",
			"6543f717e58bff37b869f1c6",
			"65442338cdf345bdd9b8f0d8",
			"65493e24c8de5c0d2aae2c02",
			"6549355dced3e2de5fb4d928",
			"654699f7cd31b07c6ffb12a7",
		],
		followerId: "65441a8c191201fb82dfa4d5",
	},
	{
		_id: "654937019b0d25d0059767f8",
		followerId: "6549355dced3e2de5fb4d928",
		followingIds: [
			"65442338cdf345bdd9b8f0d8",
			"65440f06b024c711c86848cf",
			"65493e24c8de5c0d2aae2c02",
		],
	},
	{
		_id: "65493e76ea60f784ad80d844",
		followerId: "65493e24c8de5c0d2aae2c02",
		followingIds: [
			"654699f7cd31b07c6ffb12a7",
			"65442338cdf345bdd9b8f0d8",
			"6549355dced3e2de5fb4d928",
			"65441d75191201fb82dfa4d6",
			"6544c2ada5eb70c81449679e",
			"65441fb48091888e8405f840",
			"65441a8c191201fb82dfa4d5",
		],
	},
	{
		_id: "654946bd610dd6362688dbb0",
		followerId: "6543f717e58bff37b869f1c6",
		followingIds: ["65493e24c8de5c0d2aae2c02"],
	},
	{
		_id: "654bab73fd6189afbd13841f",
		followerId: "654b746afe04eea62df345ee",
		followingIds: ["654699f7cd31b07c6ffb12a7"],
	},
	{
		_id: "654e3fea53da9bd34727de48",
		followerId: "654699f7cd31b07c6ffb12a7",
		followingIds: ["65440f06b024c711c86848cf", "655145a8bffb23ad9430d411"],
	},
	{
		_id: "654e4f667232699c337204cd",
		followerId: "654e4f443a97048d6a2a0a76",
		followingIds: [
			"6549cb3731fcc66d849e54bf",
			"65440f06b024c711c86848cf",
			"654699f7cd31b07c6ffb12a7",
		],
	},
	{
		_id: "6550c76f8fbe494e045db4a2",
		followerId: "65429c9ce63fd529796db6ea",
		followingIds: [
			"6549cb3731fcc66d849e54bf",
			"654e4f443a97048d6a2a0a76",
			"654b746afe04eea62df345ee",
		],
	},
	{
		_id: "655233d014b401909ab1256d",
		followerId: "65441d75191201fb82dfa4d6",
		followingIds: ["65440f06b024c711c86848cf"],
	},
	{
		_id: "655267096135b26f4682b7a1",
		followerId: "655265eaa51e1829f4ae18fd",
		followingIds: ["65440f06b024c711c86848cf", "6549cb3731fcc66d849e54bf"],
	},
	{
		_id: "6552bc19ac6f8409ad5543fa",
		followerId: "6545462ec0ceaee3e2da5d90",
		followingIds: ["65440f06b024c711c86848cf", "655265eaa51e1829f4ae18fd"],
	},
	{
		_id: "655308faef2da113bfcd39b6",
		followerId: "655308b5ef2da113bfcd39b5",
		followingIds: [
			"655265eaa51e1829f4ae18fd",
			"655145a8bffb23ad9430d411",
			"6549cb3731fcc66d849e54bf",
			"65493e24c8de5c0d2aae2c02",
			"65440f06b024c711c86848cf",
		],
	},
];
