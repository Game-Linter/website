import {
	useState,
	ChangeEventHandler,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';

type TGames = {
	games: any[];
	setNewGames: Dispatch<SetStateAction<any[]>>;
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
};

const Search = ({ games, setNewGames, setSearch, search }: TGames) => {
	const HandleChange: ChangeEventHandler = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		setSearch(event.target.value);
		var NewGames = games.filter((game) => {
			return game.title.toLowerCase().includes(search.toLowerCase());
		});
		setNewGames(NewGames);
	};
	return (
		<form
			className="container mx-auto px-4"
			onSubmit={(e) => e.preventDefault()}
		>
			<div className="flex items-center border-b-2 border-indigo-500 py-2">
				<input
					value={search}
					className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
					type="text"
					placeholder="Search..."
					aria-label="Full name"
					onChange={HandleChange}
				/>
			</div>
		</form>
	);
};
export default Search;
