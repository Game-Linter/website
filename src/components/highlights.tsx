import GameItem from '../components/gameitem';

const Highlights = ({ feat }: { feat: any[] }) => {
	return (
		<section className="text-gray-700 body-font">
			<div className="container px-5 py-24 mx-auto">
				<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
					Highlights 🌞🌞🌞
				</h1>
				<span className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
					last changed at 01:00 GMT
				</span>
				<div className="h-1 w-20 bg-indigo-500 rounded mb-8"></div>
				<div className="flex flex-wrap -m-4">
					{feat.map((pop, index) => (
						<GameItem key={index} value={pop} all={false} />
					))}{' '}
				</div>
			</div>
		</section>
	);
};
export default Highlights;
