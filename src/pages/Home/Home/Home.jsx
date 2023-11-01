import LeftNav from "../LeftNav";
import NewsFeed from '../NewsFeed'
import RightNav from '../RightNav'


const Home = () => {
    localStorage.removeItem("email");

    return (
        <div className="w-11/12 mx-auto">
            <div className="flex gap-10 py-10">
                <div className="w-4/12 "
                // style={{ zIndex: 10 }}
                >
                    <LeftNav />
                </div>
                <div className="w-full">
                    <NewsFeed />
                </div>
                <div className="w-4/12">
                    <RightNav />
                </div>
            </div>
        </div>
    );
};

export default Home;
