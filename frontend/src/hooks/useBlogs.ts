import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import useIsLoggedIn from './useIsLoggedIn';

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
	const { token } = useIsLoggedIn();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${BACKEND_URL}/blog/bulk`, {
					headers: { Authorization: `${token}` },
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
