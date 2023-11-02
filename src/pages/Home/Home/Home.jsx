import LeftNav from "../LeftNav";
import NewsFeed from "../NewsFeed";
import RightNav from "../RightNav";

const Home = () => {
	localStorage.removeItem("email");

	return (
		<div className="md:w-11/12 mx-auto min-h-screen">
			<div className="grid grid-cols-8">
				<div
					className="md:col-span-2  md:fixed top-4  hidden md:block"
					style={{ zIndex: 10 }}
				>
					<LeftNav />
				</div>
				<div className="md:col-span-2 "></div>
				<div className="col-span-8 md:col-span-4 ">
					<NewsFeed />
				</div>
				<div className="md:col-span-2 md:fixed top-4 right-6 hidden md:block border h-full">
					<RightNav />
				</div>
			</div>
		</div>
	);
};

export default Home;
