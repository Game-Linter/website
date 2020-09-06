import { GetStaticProps, InferGetStaticPropsType } from 'next';
import HeadElement from '../components/head';
import Carousel from '../components/carousel';
import Layout from '../components/layout';
import Banner from '../components/darkmodeBanner';
import Search from '../components/search';
import useToken from '../actions/getToken';
import {
	useEffect,
	useState,
	useCallback,
	useRef,
	MutableRefObject,
} from 'react';
import Highlights from '../components/highlights';
import TopDownloads from '../components/topDownloads';
import Display from '../components/display';

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { pics, resp, popu, feat, _csrf } = await fetch(
		'https://api.game-linter.com/games'
	).then((res) => res.json());
	return {
		props: {
			pics,
			token: _csrf,
			resp,
			popu,
			feat,
		},
		revalidate: 1,
	};
};

export default function Home({
	pics,
	token,
	resp,
	popu,
	feat,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [games, setGames] = useState([]);
	const [search, setSearch] = useState<string>('');
	const [visible, setVisible] = useState<boolean>(false);
	const [lmao, setToken] = useToken();

	const observer: MutableRefObject<any> = useRef();
	const Loading = useCallback((node) => {
		if (observer.current) {
			observer.current.disconnect();
		}
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setVisible(true);
			}
		});
		if (node && observer.current && observer) {
			observer.current.observe(node);
		}
	}, []);

	useEffect(() => {
		setGames(resp);
		setToken(token);
	}, []);
	return (
		<div>
			<HeadElement token={token} index />
			<main>
				<Layout>
					<Banner />
					<Carousel pics={pics} />
					<Highlights feat={feat} />
					<TopDownloads popu={popu} />
					<Search
						search={search}
						setSearch={setSearch}
						games={games}
						setNewGames={setGames}
					/>
					<Display
						games={games}
						search={search}
						loading={Loading}
						visible={visible}
					/>
				</Layout>
			</main>
		</div>
	);
}
