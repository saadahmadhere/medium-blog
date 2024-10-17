import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

const BlogList = () => {
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		(async () => {
			const tokenStr = localStorage.getItem('token');
			const res = await axios.get(`${BACKEND_URL}/blog/bulk`, {
				headers: { Authorization: `${tokenStr}` },
			});
			if (res.status === 200) {
				setBlogs(res.data.blogs);
			}
		})();
	}, []);
	if (blogs.length === 0) {
		return <div>No blogs found</div>;
	}
	return (
		<div>
			{blogs.map((blog) => {
				return <div key={blog}>{blog}</div>;
			})}
		</div>
	);
};

export default BlogList;
