import { useEffect, useState } from 'react';

const useIsLoggedIn = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState<string | undefined>(undefined);

	useEffect(() => {
		const tokenStr = localStorage.getItem('token');
		if (tokenStr) {
			setToken(tokenStr);
			setIsLoggedIn(true);
		}
	}, []);
	return { isLoggedIn, token };
};

export default useIsLoggedIn;
