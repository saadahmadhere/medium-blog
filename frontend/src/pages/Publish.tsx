import React from 'react';

const Publish = () => {
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
				/>
				<label htmlFor='content' className='self-start text-lg font-semibold'>
					Content
				</label>
				<textarea id='content' className='border-2 rounded w-full p-2 h-80' />
				<button
					type='submit'
					className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200  hover:bg-green-800 mt-4'
				>
					Publish post
				</button>
			</div>
		</div>
	);
};

export default Publish;
