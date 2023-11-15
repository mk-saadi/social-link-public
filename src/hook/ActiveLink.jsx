import { useContext } from "react";
import "./active.css";
import { NavLink } from "react-router-dom";
import { DominantColorContext } from "./DominantColorProvider";

const ActiveLink = ({ to, children }) => {
	const { dominantColor } = useContext(DominantColorContext);

	return (
		<NavLink
			to={to}
			className={({ isActive, isPending }) =>
				isActive ? "active" : isPending ? "pending" : ""
			}
		>
			{children}
		</NavLink>
	);
};

export default ActiveLink;
