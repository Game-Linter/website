import Link from 'next/link';

export default () => {
	return (
		<footer className="text-gray-700 body-font">
			<div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
				<Link href="/">
					<div
						className="flex title-font font-medium items-center md:justify-start
						justify-center text-gray-900"
					>
						<img
							src={'/logoalso.png'}
							className="w-12 h-12 text-white p-2 rounded-full"
							alt=""
						/>
						<span className="ml-3 text-xl">Game-Linter</span>
					</div>
				</Link>
				<p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
					© {new Date().getFullYear()} game-linter
				</p>
				<span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
					<a
						className="text-gray-500"
						href="https://www.facebook.com/Game-Linter-118768386190163"
					>
						<svg
							fill="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							className="w-5 h-5"
							viewBox="0 0 24 24"
						>
							<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
						</svg>
					</a>
					<a className="ml-3 text-gray-500" href="https://discord.gg/4cfGp5Q">
						<svg
							stroke="currentColor"
							strokeWidth={2}
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 245 240"
						>
							<path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" />
							<path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
						</svg>
					</a>
				</span>
			</div>
		</footer>
	);
};
