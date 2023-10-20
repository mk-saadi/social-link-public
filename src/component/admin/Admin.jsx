import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";

const Admin = () => {
    return (
        <div className="bg-[#ede6d7]">
            <Outlet />
            <Footer />
        </div>
    );
};

export default Admin;
