import { useEffect, useState } from 'react';

const useIsLoggedIn = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const tokenStr = localStorage.getItem('token');
		if (tokenStr) {
			setIsLoggedIn(true);
		}
	}, []);
	return { isLoggedIn };
};

export default useIsLoggedIn;
