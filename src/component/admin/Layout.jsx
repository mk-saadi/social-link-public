import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="bg-[#ede6d7]">
			<Outlet />
		</div>
	);
};

export default Layout;
