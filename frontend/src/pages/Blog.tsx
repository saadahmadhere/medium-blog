import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config';

const Blog = () => {
	interface Blog {
		title: string;
		content: string;
	}

	const [blog, setBlog] = useState<Blog>({ title: '', content: '' });
	const [loading, setLoading] = useState<boolean>(false);
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const tokenStr = localStorage.getItem('token');
				const res = await axios.get(`${BACKEND_URL}/blog/${id}`, {
					headers: { Authorization: `${tokenStr}` },
				});
				const data = res.data.blog;
				setBlog(data);
			} catch (error) {
				console.log('some error occuered: ', { error });
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);
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
