import React, { ReactElement } from 'react';
import {
	useEffect,
	useState,
	useCallback,
	useRef,
	MutableRefObject,
	Fragment,
} from 'react';

interface Props {}

export default function MusicBot({}: Props): ReactElement {
	const [banner, setBanner] = useState(true);
	useEffect(() => {
		const theme = window.localStorage.getItem('myTheme');
		setBanner(theme === 'dark' ? false : true);
	}, []);
	return (
		<div className="card-body p-5">
			<div className="container mx-auto px-4">
				<div
					className={`bg-yellow-${
						banner ? '300' : '700'
					} text-center lg:py-4 md:py-4 lg:px-4 lg:rounded md:rounded sm:rounded `}
				>
					<h1 className="mx-auto text-4xl font-semibold underline font-mono">
						AI Powered Music Bot <br />
					</h1>
					<h1 className="no-underline mx-auto text-4xl font-semibold font-mono">
						🎹🎻
					</h1>
					<a
						className="mt-5 p-6 bg-orange-400 items-center text-black leading-none lg:rounded-full md:rounded-full flex lg:inline-flex  md:inline-flex w-auto"
						role="alert"
						href="https://top.gg/bot/724010668751323196"
						target="__blank"
					>
						{/* <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"></span> */}
						<span className="font-semibold mr-2 text-left flex-auto cursor-pointer">
							Get our free optimized Discord Music Bot to keep jamming while
							playing your favorite Games
						</span>
						{/* <svg
							className="fill-current opacity-75 h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
						</svg> */}
					</a>
				</div>
			</div>
		</div>
	);
}
