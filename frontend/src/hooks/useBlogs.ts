import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

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

export const useBlogs = () => {
	const [blogs, setBlogs] = useState<BlogType[]>([]);
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

	return { blogs, loading };
};
