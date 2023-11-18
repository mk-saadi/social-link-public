import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostContents1 = ({ content }) => {
	const [showFullContent, setShowFullContent] = useState(false);

	const toggleContentDisplay = () => {
		setShowFullContent(!showFullContent);
	};

	const lines = content?.split("\n");
	const displayedLines = showFullContent ? lines : lines?.slice(0, 150);
	const displayContent = displayedLines?.join("\n");

	return (
		<div className="relative">
			<ReactMarkdown
				className="text-sm font-semibold prose text-gray-600 break-words whitespace-pre-line markdown md:text-base"
				remarkPlugins={[remarkGfm]}
			>
				{displayContent}
			</ReactMarkdown>
			{lines?.length > 150 && (
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

export default PostContents1;
