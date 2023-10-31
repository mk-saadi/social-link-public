// import Navbar from "../shared/Navbar";
import LeftNav from "./home-component/LeftNav";
import RightNav from "./home-component/RightNav";
import NewsFeed from "./home-component/NewsFeed";
import { Divider } from "@mui/material";

const Home = () => {
	localStorage.removeItem("email");

	return (
		<>
			<div className="grid lg:grid-cols-8 min-h-screen overflow-x-hidden">
				<div
					className="lg:col-span-2 col-span-12"
					style={{ zIndex: 10 }}
				>
					<LeftNav />
				</div>
				<section className="col-span-4 mt-4">
					{/* <div className='hidden lg:block'>
						<Navbar />
					</div> */}

					<div>
						<NewsFeed />
					</div>
				</section>

				<section className="lg:col-span-2 hidden md:block ">
					<RightNav />
				</section>
			</div>
		</>
	);
};

export default Home;
