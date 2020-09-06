import Link from 'next/link';

const Navbar: () => JSX.Element = () => {
	return (
		<header className="text-gray-700 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
					<Link href="/request">
						<a className="mr-5 hover:text-gray-900">Request</a>
					</Link>
					{/* <Link to='/request' className="mr-5 hover:text-gray-900">Report</Link> */}

					<a className="bg-gray-700 border-0 py-1 px-3 focus:outline-none hover:bg-gray-600 rounded text-base">
						<img
							src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDMwMi40IDMwMi40Ij48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjA0LjggOTcuNkMxOTEuMiA4NCAxNzIgNzUuMiAxNTEuMiA3NS4ycy00MCA4LjQtNTMuNiAyMi40Yy0xMy42IDEzLjYtMjIuNCAzMi44LTIyLjQgNTMuNmE3Ni4zIDc2LjMgMCAwIDAgNzYgNzYgNzYuMyA3Ni4zIDAgMCAwIDc2LTc2YzAtMjAuOC04LjQtNDAtMjIuNC01My42em0tMTQuNCA5Mi44Yy0xMCAxMC0yNCAxNi0zOS4yIDE2cy0yOS4yLTYtMzkuMi0xNi0xNi0yNC0xNi0zOS4yIDYtMjkuMiAxNi0zOS4yIDI0LTE2IDM5LjItMTYgMjkuMiA2IDM5LjIgMTYgMTYgMjQgMTYgMzkuMi02IDI5LjItMTYgMzkuMnpNMjkyIDE0MC44aC0zMC44Yy01LjYgMC0xMC40IDQuOC0xMC40IDEwLjQgMCA1LjYgNC44IDEwLjQgMTAuNCAxMC40SDI5MmM1LjYgMCAxMC40LTQuOCAxMC40LTEwLjQgMC01LjYtNC44LTEwLjQtMTAuNC0xMC40ek0xNTEuMiAyNTAuOGMtNS42IDAtMTAuNCA0LjgtMTAuNCAxMC40VjI5MmMwIDUuNiA0LjggMTAuNCAxMC40IDEwLjQgNS42IDAgMTAuNC00LjggMTAuNC0xMC40di0zMC44YzAtNS42LTQuOC0xMC40LTEwLjQtMTAuNHpNMjU4IDI0My42bC0yMi0yMmMtMy42LTQtMTAuNC00LTE0LjQgMHMtNCAxMC40IDAgMTQuNGwyMiAyMmM0IDQgMTAuNCA0IDE0LjQgMHM0LTEwLjQgMC0xNC40ek0xNTEuMiAwYy01LjYgMC0xMC40IDQuOC0xMC40IDEwLjR2MzAuOGMwIDUuNiA0LjggMTAuNCAxMC40IDEwLjQgNS42IDAgMTAuNC00LjggMTAuNC0xMC40VjEwLjRjMC01LjYtNC44LTEwLjQtMTAuNC0xMC40ek0yNTguNCA0NC40Yy00LTQtMTAuNC00LTE0LjQgMGwtMjIgMjJjLTQgNC00IDEwLjQgMCAxNC40IDMuNiA0IDEwLjQgNCAxNC40IDBsMjItMjJjNC00IDQtMTAuNCAwLTE0LjR6TTQxLjIgMTQwLjhIMTAuNGMtNS42IDAtMTAuNCA0LjgtMTAuNCAxMC40czQuNCAxMC40IDEwLjQgMTAuNGgzMC44YzUuNiAwIDEwLjQtNC44IDEwLjQtMTAuNCAwLTUuNi00LjgtMTAuNC0xMC40LTEwLjR6TTgwLjQgMjIxLjZjLTMuNi00LTEwLjQtNC0xNC40IDBsLTIyIDIyYy00IDQtNCAxMC40IDAgMTQuNHMxMC40IDQgMTQuNCAwbDIyLTIyYzQtNCA0LTEwLjQgMC0xNC40ek04MC40IDY2LjRsLTIyLTIyYy00LTQtMTAuNC00LTE0LjQgMHMtNCAxMC40IDAgMTQuNGwyMiAyMmM0IDQgMTAuNCA0IDE0LjQgMHM0LTEwLjQgMC0xNC40eiIvPjwvc3ZnPg=="
							alt="Toggler"
						/>
					</a>
					{/* <a className="mr-5 hover:text-gray-900"></a> */}
				</nav>
				<Link href="/">
					<a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
						<img
							src={'https://game-linter.com/static/media/logoalso.1b70fb49.png'}
							alt=""
							className="w-16 h-16 text-white p-2 rounded-full"
						/>
						<span className="ml-3 text-xl">Game-Linter</span>
					</a>
				</Link>
				<div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 text-white">
					<a
						href="https://discord.gg/4cfGp5Q"
						target="__blank"
						className="font-semibold inline-flex items-center bg-gray-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
					>
						<span>Join Discord</span>
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							className="w-4 h-4 ml-1"
							viewBox="0 0 24 24"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
