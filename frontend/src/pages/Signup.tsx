import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupInput } from '@saadahmadhere/medium-common';
import { BACKEND_URL } from '../config';
import axios from 'axios';

const Signup = () => {
	const [userDeatils, setUserDetails] = useState<SignupInput>({
		firstName: '',
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await axios.post(`${BACKEND_URL}/user/signup`, userDeatils);
			if (res.status === 200) {
				// redirect to the blog page
				localStorage.setItem('token', res.data.token);
				navigate('/blogs');
			}
		} catch (error) {
			alert('something went wrong, ');
			console.log('something went wrong, ', (error as Error).message);
		} finally {
			setUserDetails({ firstName: '', email: '', password: '' });
		}
	};

	return (
		<div className='flex h-screen'>
			<section className='w-1/2 flex flex-col justify-center items-center'>
				<div className='w-1/2'>
					<div className='flex flex-col items-center justify-center mb-10'>
						<div className='text-3xl font-bold text-slate-900 w-max'>
							Create an account
						</div>
						<div className='font-semibold text-slate-400 '>
							Already have an account ?{' '}
							<Link to={'/signin'} className='text-slate-500'>
								Login
							</Link>
						</div>
					</div>
					<form
						className='flex flex-col gap-2'
						onSubmit={(e) => handleSubmit(e)}
					>
						<label htmlFor='name' className='text-slate-700 font-semibold'>
							Username
						</label>
						<input
							type='text'
							placeholder='Name'
							className='border-2 border-slate-200 p-2 rounded-md'
							value={userDeatils.firstName}
							onChange={(e) =>
								setUserDetails({ ...userDeatils, firstName: e.target.value })
							}
						/>
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
							Sign up
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

export default Signup;
