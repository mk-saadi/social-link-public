import { useState, useEffect } from "react";

const CategoryList = ({ blogs, onCategorySelect, dominantColor }) => {
	const categoryNames = Array.from(new Set(blogs.map((bl) => bl.category)));
	const [selectedCategory, setSelectedCategory] = useState(categoryNames[0]);

	useEffect(() => {
		onCategorySelect(selectedCategory);
	}, [selectedCategory, onCategorySelect]);

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	useEffect(() => {
		if (!selectedCategory) {
			const initialCategory = categoryNames[0];
			setSelectedCategory(initialCategory);
		}
	}, [selectedCategory, categoryNames]);

	return (
		<div className="flex flex-row gap-2 lg:gap-3 overflow-x-auto storyModal">
			{categoryNames.map((category) => (
				<button
					key={category}
					className="flex items-center justify-center p-2 font-semibold rounded-md shadow-md text-xs lg:text-base"
					style={{
						backgroundColor:
							selectedCategory === category
								? dominantColor
								: "#fff",
						color:
							selectedCategory === category
								? "#fff"
								: dominantColor,
					}}
					onClick={() => handleCategoryClick(category)}
				>
					{category}
				</button>
			))}
		</div>
	);
};

export default CategoryList;
