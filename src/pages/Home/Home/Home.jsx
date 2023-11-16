import { useState } from "react";
import LeftNav from "../LeftNav";
import NewsFeed from "../NewsFeed";
import RightNav from "../RightNav";

const Home = () => {
	localStorage.removeItem("email");
	const [postCount, setPostCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);

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
				<div className="lg:col-span-2 lg:fixed top-[70px] lg:right-6 xl:right-6 hidden lg:block h-full">
					<RightNav
						updateFollowingCount={updateFollowingCount}
						postCount={postCount}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
