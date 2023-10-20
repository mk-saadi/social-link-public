import Navbar from "../shared/Navbar";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const Home = () => {
    return (
        <>
            <div className="grid grid-cols-8 min-h-screen pt-14 lg:pt-28">
                <div className="col-span-2 hidden md:block bg-gray-600">
                    <LeftNav />
                </div>

                <div className="col-span-4">
                    <Navbar />
                    <p>main</p>
                </div>

                <section className="col-span-2 hidden md:block bg-gray-600">
                    <RightNav />
                </section>
            </div>
        </>
    );
};

export default Home;
