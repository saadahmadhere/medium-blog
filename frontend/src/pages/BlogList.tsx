import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import BlogCard from '../components/BlogCard';

const BlogList = () => {
	interface AuthorType {
		firstName: string;
		id: string;
	}
	interface BlogType {
		title: string;
		content: string;
		isPublished: boolean;
		id: string;
		author: AuthorType;
		createdAt: string;
		updatedAt: string;
	}
	type blogListType = BlogType[];

	const [blogs, setBlogs] = useState<blogListType>([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		(async () => {
			try {
				const tokenStr = localStorage.getItem('token');
				setLoading(true);
				const res = await axios.get(`${BACKEND_URL}/blog/bulk`, {
					headers: { Authorization: `${tokenStr}` },
				});

				if (res.status === 200) {
					setBlogs(res.data.blogs);
				}
			} catch (error) {
				console.log('some error occuered: ', { error });
			} finally {
				setLoading(false);
			}
		})();
	}, []);
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
