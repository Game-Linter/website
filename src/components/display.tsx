import GameItem from './gameitem';
import { Fragment } from 'react';

const Display = ({
	search,
	games,
	loading,
	visible,
	newGames,
}: {
	search: string;
	games: any[];
	newGames: any[];
	loading: (node: any) => void;
	visible: boolean;
}) => {
	return (
		<Fragment>
			{visible ? (
				<section className="text-gray-700 body-font">
					<div>
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 mt-16">
							All Games 🎲 🕹️
						</h1>
						<div className="h-1 w-20 bg-indigo-500 rounded mb-8"></div>
					</div>

					<div className="flex flex-wrap -m-4">
						{!search
							? games.map((game, index) => (
									<GameItem key={index} value={game} all />
							  ))
							: newGames.map((game, index) => (
									<GameItem key={index} value={game} all={false} />
							  ))}{' '}
					</div>
				</section>
			) : (
				<div
					ref={loading}
					className="text-4xl text-center mx-auto mt-32"
					key={0}
				>
					Loading ...
				</div>
			)}
		</Fragment>
	);
};

export default Display;
