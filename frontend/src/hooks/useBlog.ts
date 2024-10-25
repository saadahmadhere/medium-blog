import axios from 'axios';
import { useEffect, useState } from 'react';

import { BACKEND_URL } from '../config';
import useIsLoggedIn from './useIsLoggedIn';

interface Blog {
	title: string;
	content: string;
}
export const useBlog = (id: string | undefined) => {
	const [blog, setBlog] = useState<Blog>({ title: '', content: '' });
	const [loading, setLoading] = useState<boolean>(false);
	const { token } = useIsLoggedIn();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${BACKEND_URL}/blog/${id}`, {
					headers: { Authorization: `${token}` },
				});
				const data = res.data.blog;
				setBlog(data);
			} catch (error) {
				console.log('some error occuered: ', { error });
			} finally {
				setLoading(false);
			}
		})();
	}, [id, token]);

	return { blog, loading };
};
