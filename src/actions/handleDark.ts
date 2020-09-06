import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { MouseEventHandler, MouseEvent } from 'react';

const useDarkMode: () => [boolean, any] = () => {
	const [dark, setDark] = useState(false);

	const toggleDark = () => {
		const theme = window.localStorage.getItem('myTheme');
		// console.log(theme);
		setDark(theme === 'dark' ? false : true);
		window.localStorage.setItem('myTheme', theme === 'dark' ? 'light' : 'dark');
		window.location.reload();
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('myTheme');
		if (localTheme) {
			setDark(localTheme === 'dark' ? true : false);
		} else {
			window.localStorage.setItem('myTheme', 'light');
		}
	}, []);
	return [dark, toggleDark];
};

export default useDarkMode;
