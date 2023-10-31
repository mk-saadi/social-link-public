import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostContent = ({ content }) => {
	const [showFullContent, setShowFullContent] = useState(false);

	const toggleContentDisplay = () => {
		setShowFullContent(!showFullContent);
	};

	const lines = content?.split("\n");
	const displayedLines = showFullContent ? lines : lines?.slice(0, 3);
	const displayContent = displayedLines?.join("\n");

	return (
		<div className="relative">
			<ReactMarkdown
				className="whitespace-pre-line markdown prose text-gray-700 font-semibold break-words text-sm md:text-lg"
				remarkPlugins={[remarkGfm]}
			>
				{displayContent}
			</ReactMarkdown>
			{lines?.length > 3 && (
				<button
					onClick={toggleContentDisplay}
					className="text-accent font-medium mt-2 cursor-pointer hover:underline"
				>
					{showFullContent ? "Show Less" : "Show More"}
				</button>
			)}
		</div>
	);
};

export default PostContent;
