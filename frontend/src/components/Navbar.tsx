import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			<nav className='border-gray-200 bg-slate-50 h-16'>
				<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
					<Link
						to={'/blogs'}
						className='flex items-center space-x-3 rtl:space-x-reverse'
					>
						<img
							src='https://flowbite.com/docs/images/logo.svg'
							className='h-8'
							alt='Flowbite Logo'
						/>
						<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-black'>
							Medium
						</span>
					</Link>
					<div className='hidden w-full md:block md:w-auto' id='navbar-default'>
						<ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white'>
							<li>
								<Link
									to={'/blog'}
									className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center'
									aria-current='page'
								>
									Publish
								</Link>
							</li>
							<li>
								<Link
									to={'/blogs'}
									className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500'
									aria-current='page'
								>
									Blogs
								</Link>
							</li>
							<li>
								<Link
									to={'/signup'}
									className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
								>
									SignUp
								</Link>
							</li>
							<li>
								<Link
									to='/signin'
									className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
								>
									Login
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
