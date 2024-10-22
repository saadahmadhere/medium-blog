import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreateBlogInput } from '@saadahmadhere/medium-common';
import { BACKEND_URL } from '../config';

const Publish = () => {
	const [blog, setBlog] = useState<CreateBlogInput>({ title: '', content: '' });
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBlog({ ...blog, title: e.target.value });
	};
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBlog({ ...blog, content: e.target.value });
	};
	const handlePublish = async () => {
		setLoading(true);

		try {
			const tokenStr = localStorage.getItem('token');
			const res = await axios.post(`${BACKEND_URL}/blog`, blog, {
				headers: { Authorization: `${tokenStr}` },
			});
			if (res.status === 200) {
				alert('Blog published successfully');
			}
			navigate('/blogs');
		} catch (error) {
			console.log('error publishing blog: ', (error as Error).message);
		} finally {
			setLoading(false);
			setBlog({ title: '', content: '' });
		}
	};

	if (loading) {
		return <div className='w-full flex justify-center'>Loading...</div>;
	}

	return (
		<div className='w-full flex justify-center'>
			<div className='w-1/2 flex flex-col items-center p-2'>
				<label htmlFor='title' className='self-start text-lg font-semibold'>
					Title
				</label>
				<input
					type='text'
					id='title'
					className='border-2 rounded w-full p-2'
					autoFocus
					onChange={handleTitleChange}
					value={blog.title}
				/>
				<label htmlFor='content' className='self-start text-lg font-semibold'>
					Content
				</label>
				<textarea
					id='content'
					className='border-2 rounded w-full p-2 h-80'
					value={blog.content}
					onChange={handleContentChange}
				/>
				<button
					type='submit'
					className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200  hover:bg-green-800 mt-4'
					onClick={handlePublish}
				>
					Publish post
				</button>
			</div>
		</div>
	);
};

export default Publish;
