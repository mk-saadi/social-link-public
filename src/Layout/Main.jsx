import { Outlet } from "react-router-dom";
import TopNavbar from "../component/shared/TopNavbar";

const Layout = () => {
	return (
		<div className="bg-[#e7e7e7] max-w-[1920px] mx-auto">
			<div
				className="w-full fixed top-0 mx-auto max-w-[1920px]"
				style={{ zIndex: "99999" }}
			>
				<TopNavbar />
			</div>
			<div className="">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
