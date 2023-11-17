const PhotoList = ({ posts }) => {
	const image = posts.filter((po) => po.image !== null).map((po) => po.image);

	return (
		<div className=" bg-white rounded-md shadow-md drop-shadow min-w-[311px]">
			<p className="p-2 text-xl font-semibold text-gray-600">
				Photos {image.length}
			</p>
			<hr className="bg-gray-400 bg-opacity-70 border-0 h-[1px] mb-2" />
			<div className="xl:max-h-[500px] storyModal overflow-y-auto flex flex-col">
				{posts?.map((post, index) => (
					<div key={index}>
						<img
							src={post?.image}
							className=""
							alt=""
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default PhotoList;
