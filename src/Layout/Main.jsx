import { Outlet } from "react-router-dom";
import TopNavbar from "../component/shared/TopNavbar";

const Layout = () => {
	return (
		<div className="bg-[#EFF3F8]">
			<TopNavbar />
			<Outlet />
		</div>
	);
};

export default Layout;
