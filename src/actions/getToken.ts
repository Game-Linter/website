import { useState, Dispatch, SetStateAction } from 'react';

const useToken: () => [string, Dispatch<SetStateAction<string>>] = () => {
	const [token, setToken] = useState('');
	return [token, setToken];
};

export default useToken;
