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
		<div className="min-h-screen mx-auto overflow-x-hidden xl:w-11/12">
			<div className="grid grid-cols-8">
				<div
					className="xl:col-span-2  xl:fixed top-[70px] left-6 hidden xl:block"
					style={{ zIndex: 10 }}
				>
					<LeftNav
						followingCount={followingCount}
						postCount={postCount}
					/>
				</div>
				<div className="hidden xl:col-span-2 xl:block"></div>
				<div className=" col-span-8 lg:col-span-5 xl:col-span-4 mt-[70px] ">
					<NewsFeed updatePostCount={updatePostCount} />
				</div>
				<div className="md:col-span-2 md:fixed top-[70px] md:right-5 xl:right-6 hidden md:block h-full">
					<RightNav updateFollowingCount={updateFollowingCount} />
				</div>
			</div>
		</div>
	);
};

export default Home;
