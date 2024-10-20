import axios from 'axios';
import { useEffect, useState } from 'react';

import { BACKEND_URL } from '../config';

interface Blog {
	title: string;
	content: string;
}
export const useBlog = (id: string | undefined) => {
	const [blog, setBlog] = useState<Blog>({ title: '', content: '' });
	const [loading, setLoading] = useState<boolean>(false);

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

	return { blog, loading };
};
