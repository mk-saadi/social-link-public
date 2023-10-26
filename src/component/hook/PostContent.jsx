import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostContent = ({ content }) => {
	const [showFullContent, setShowFullContent] = useState(false);

	const toggleContentDisplay = () => {
		setShowFullContent(!showFullContent);
	};

	const words = content?.split(/\s+/);
	const maxWords = 30;

	const displayContent = showFullContent
		? words.join(" ")
		: words.slice(0, maxWords).join(" ");

	return (
		<div className='relative '>
			<ReactMarkdown
				className='whitespace-pre-line markdown prose text-gray-300 break-words text-sm md:text-base'
				remarkPlugins={[remarkGfm]}
			>
				{displayContent}
			</ReactMarkdown>
			{words.length > maxWords && (
				<div className='flex justify-end'>
					<button
						onClick={toggleContentDisplay}
						className='text-accent cursor-pointer text-2xl'
					>
						{showFullContent ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</button>
				</div>
			)}
		</div>
	);
};

export default PostContent;
