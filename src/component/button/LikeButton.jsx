import React, { useEffect, useState } from "react";

const LikeButton = () => {
	const [isAnimating, setAnimating] = useState(false);

	const handleClick = () => {
		// Start the animation
		setAnimating(true);

		// Reset the animation after a delay (700ms in this example)
		setTimeout(() => {
			setAnimating(false);
		}, 1500);
	};

	return (
		<button
			className={`bubbly-button ${isAnimating ? "animate" : ""}`}
			onClick={handleClick}
		>
			Like
		</button>
	);
};

export default LikeButton;
