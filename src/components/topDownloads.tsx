import { Fragment } from 'react';
import GameItem from './gameitem';

const TopDownloads = ({ popu }: { popu: any[] }) => {
	return (
		<Fragment>
			<section className="text-gray-700 body-font">
				<div className="container px-5 py-24 mx-auto">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
						Most Downloaded 🔥
					</h1>
					<div className="h-1 w-20 bg-indigo-500 rounded mb-8"></div>
					<div className="flex flex-wrap -m-4">
						{popu.map((pop, index) => (
							<GameItem key={index} value={pop} all={false} />
						))}{' '}
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default TopDownloads;
