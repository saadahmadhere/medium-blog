import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';

const Blog = () => {
	const { id } = useParams();
	const { blog, loading } = useBlog(id);
	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div className='flex flex-col items-center'>
			<div className='w-1/2 mt-4'>
				<div className='font-bold text-gray-950 text-3xl mb-2'>
					{blog.title}
				</div>
				<div className='text-gray-700'>{blog.content}</div>
			</div>
		</div>
	);
};

export default Blog;
