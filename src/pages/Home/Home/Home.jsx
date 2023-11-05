import LeftNav from "../LeftNav";
import NewsFeed from "../NewsFeed";
import RightNav from "../RightNav";

const Home = () => {
	localStorage.removeItem("email");

	return (
		<div className="md:w-11/12 mx-auto min-h-screen">
			<div className="grid grid-cols-8">
				<div
					className="md:col-span-2  md:fixed top-[70px] left-6  hidden lg:block"
					style={{ zIndex: 10 }}
				>
					<LeftNav />
				</div>
				<div className="lg:col-span-2  hidden lg:block"></div>
				<div className="col-span-8 md:col-span-6 lg:col-span-4 mt-[70px] md:-ml-12 lg:ml-0">
					<NewsFeed />
				</div>
				<div className="md:col-span-2 md:fixed top-[70px] md:right-[10px] lg:right-6 hidden md:block h-full">
					<RightNav />
				</div>
			</div>
		</div>
	);
};

export default Home;
