import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
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
				className="whitespace-pre-line markdown prose text-gray-600 font-semibold break-words text-sm md:text-base"
				remarkPlugins={[remarkGfm]}
			>
				{displayContent}
			</ReactMarkdown>
			{lines?.length > 3 && (
				<div className="flex justify-end">
					<button
						onClick={toggleContentDisplay}
						className="text-[#32308E] text-xl cursor-pointer hover:underline"
					>
						{showFullContent ? (
							<AiFillCaretUp />
						) : (
							<AiFillCaretDown className="mt-5" />
						)}
					</button>
				</div>
			)}
		</div>
	);
};

export default PostContent;
