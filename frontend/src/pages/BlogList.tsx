import BlogCard from '../components/BlogCard';
import { useBlogs } from '../hooks/useBlogs';

const BlogList = () => {
	const { blogs, loading } = useBlogs();

	if (loading) {
		return <div>Loading...</div>;
	}
	if (blogs.length === 0) {
		return <div>No blogs found</div>;
	}
	return (
		<div className='flex flex-col items-center pt-4'>
			{blogs.map((blog) => {
				return (
					<div key={blog.title} className='w-1/2'>
						<BlogCard
							title={blog.title}
							content={blog.content}
							createdAt={blog.createdAt}
							authorName={blog.author.firstName}
							blogId={blog.id}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default BlogList;
