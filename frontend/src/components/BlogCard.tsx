import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
	title: string;
	content: string;
	createdAt: string;
	authorName: string;
	blogId: string;
}

const BlogCard = ({
	title,
	content,
	createdAt,
	authorName,
	blogId,
}: BlogCardProps) => {
	const navigate = useNavigate();

	const handleBlogCardClick = (): void => {
		navigate(`/blog/${blogId}`);
	};
	const getTruncatedContent = (content: string): string => {
		if (content.length > 100) {
			return content.substring(0, 100) + '...';
		}
		return content;
	};
	return (
		<div
			className='border-solid border-2 border-gray-400 rounded mb-4 cursor-pointer'
			onClick={handleBlogCardClick}
		>
			<div>{title}</div>
			<div>{getTruncatedContent(content)}</div>
			<div>
				created at:
				{new Date(createdAt).toLocaleDateString()}
			</div>
			<div>Author: {authorName}</div>
		</div>
	);
};

export default BlogCard;
