import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export const getGames: GetStaticProps = async (context) => {
	const games = fetch('https://game-linter.com').then((res) => res.json());
	return {
		props: {
			games,
		},
	};
};
