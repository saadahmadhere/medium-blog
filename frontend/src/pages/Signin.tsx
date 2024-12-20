import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninInput } from '@saadahmadhere/medium-common';
import { BACKEND_URL } from '../config';
import axios from 'axios';

const Signin = () => {
	const [userDeatils, setUserDetails] = useState<SigninInput>({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await axios.post(`${BACKEND_URL}/user/signin`, userDeatils);
			if (res.status === 200) {
				localStorage.setItem('token', res.data.token);
				// redirect to the blog page
				navigate('/blogs');
			}
		} catch (error) {
			alert('something went wrong, ');
			console.log('something went wrong, ', (error as Error).message);
		} finally {
			setUserDetails({ email: '', password: '' });
			setLoading(false);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div className='flex h-[calc(100vh-4rem)]'>
			<section className='w-1/2 flex flex-col justify-center items-center'>
				<div className='w-1/2'>
					<div className='flex flex-col items-center justify-center mb-10'>
						<div className='text-3xl font-bold text-slate-900 w-max'>
							Login to your account
						</div>
					</div>
					<form
						className='flex flex-col gap-2'
						onSubmit={(e) => handleSubmit(e)}
					>
						<label htmlFor='email' className='text-slate-700 font-semibold'>
							Email
						</label>
						<input
							type='email'
							placeholder='Email'
							className='border-2 border-slate-200 p-2 rounded-md'
							value={userDeatils.email}
							onChange={(e) =>
								setUserDetails({ ...userDeatils, email: e.target.value })
							}
							autoFocus
						/>
						<label htmlFor='password' className='text-slate-700 font-semibold'>
							Password
						</label>
						<input
							type='password'
							placeholder='Password'
							className='border-2 border-slate-200 p-2 rounded-md'
							value={userDeatils.password}
							onChange={(e) =>
								setUserDetails({ ...userDeatils, password: e.target.value })
							}
						/>
						<button
							className='bg-slate-900 text-white p-2 rounded-md mt-5'
							type='submit'
						>
							Login
						</button>
					</form>
				</div>
			</section>

			<section className='w-1/2 bg-slate-100 text-3xl font-extrabold flex flex-col justify-center px-10'>
				The customer service of this blog site is exceptional.
				<div className='font-semibold text-base text-gray-600 mt-5'>
					-Stan Lee
				</div>
			</section>
		</div>
	);
};

export default Signin;
