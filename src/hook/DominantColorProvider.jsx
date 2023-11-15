import { useState, useEffect, createContext } from "react";

export const DominantColorContext = createContext();

const DominantColorProvider = ({ children }) => {
	const [dominantColor, setDominantColor] = useState(
		sessionStorage.getItem("dominantColor") || "#f0f0f0"
	);

	useEffect(() => {
		sessionStorage.setItem("dominantColor", dominantColor);
	}, [dominantColor]);

	return (
		<DominantColorContext.Provider
			value={{ dominantColor, setDominantColor }}
		>
			{children}
		</DominantColorContext.Provider>
	);
};

export default DominantColorProvider;
