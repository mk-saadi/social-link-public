import { useState } from "react";
import LeftNav from "../LeftNav";
import NewsFeed from "../NewsFeed";
import RightNav from "../RightNav";

const Home = () => {
	localStorage.removeItem("email");
	const [followingCount, setFollowingCount] = useState(0);
	const [postCount, setPostCount] = useState(0);

	const updateFollowingCount = (count) => {
		setFollowingCount(count);
	};

	const updatePostCount = (count) => {
		setPostCount(count);
	};

	return (
		<div className="md:w-11/12 mx-auto min-h-screen overflow-x-hidden">
			<div className="grid grid-cols-8">
				<div
					className="md:col-span-2  md:fixed top-[70px] left-6  hidden lg:block"
					style={{ zIndex: 10 }}
				>
					<LeftNav
						followingCount={followingCount}
						postCount={postCount}
					/>
				</div>
				<div className="lg:col-span-2  hidden lg:block"></div>
				<div className="col-span-8 md:col-span-6 lg:col-span-4 mt-[70px] md:-ml-12 lg:ml-0">
					<NewsFeed updatePostCount={updatePostCount} />
				</div>
				<div className="md:col-span-2 md:fixed top-[70px] md:right-[10px] lg:right-6 hidden md:block h-full">
					<RightNav updateFollowingCount={updateFollowingCount} />
				</div>
			</div>
		</div>
	);
};

export default Home;
