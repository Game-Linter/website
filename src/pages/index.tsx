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
	Fragment,
} from 'react';
import Highlights from '../components/highlights';
import TopDownloads from '../components/topDownloads';
import Display from '../components/display';
import fetch from 'isomorphic-unfetch';
import { useSnackbar } from 'notistack';
import Confetti from 'react-dom-confetti';

const config = {
	angle: '122',
	spread: 360,
	startVelocity: 40,
	elementCount: 70,
	dragFriction: 0.12,
	duration: 3000,
	stagger: 3,
	width: '10px',
	height: '10px',
	perspective: '500px',
	colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { pics, resp, popu, feat, _csrf } = await fetch(
		'https://api.game-linter.com/games',
		{
			headers: {
				referer: 'https://game-linter.com/',
			},
		}
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
	const [newGames, setNewGames] = useState([]);
	const [search, setSearch] = useState<string>('');
	const [visible, setVisible] = useState<boolean>(false);
	const [lmao, setToken] = useToken();
	const [banner, setBanner] = useState(true);
	const [confetti, setConfetti] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

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
		const theme = window.localStorage.getItem('myTheme');
		setBanner(theme === 'dark' ? false : true);
	}, []);
	return (
		<Fragment>
			<HeadElement token={token} index />
			<main>
				<Layout>
					{banner ? <Banner /> : ''}
					<div className="container mx-auto px-4">
						<div className="bg-teal-300 text-center lg:py-4 md:py-4 lg:px-4 lg:rounded md:rounded sm:rounded">
							<span className="float-left">🎄 </span>
							<span className="float-left">🎄 </span>
							<span className="float-left">🎄 </span>
							<div
								className="p-2 bg-green-500 items-center text-indigo-100 leading-none lg:rounded-full md:rounded-full flex lg:inline-flex  md:inline-flex"
								role="alert"
							>
								<span
									className="font-semibold mr-2 text-left flex-auto cursor-pointer"
									onClick={() => {
										setConfetti(!confetti);
										setTimeout(() => {
											setConfetti(false);
										}, 3000);
									}}
								>
									Happy New Year Gamers!
								</span>{' '}
							</div>
							<span className="float-right">🎄 </span>
							<span className="float-right">🎄 </span>
							<span className="float-right">🎄 </span>
							<Confetti
								active={confetti}
								config={{
									angle: 122,
									spread: 360,
									startVelocity: 40,
									elementCount: 70,
									dragFriction: 0.12,
									duration: 3000,
									stagger: 3,
									width: '15px',
									height: '15px',
									colors: [
										'#a864fd',
										'#29cdff',
										'#78ff44',
										'#ff718d',
										'#fdff6a',
									],
								}}
							/>
						</div>
					</div>
					<Carousel pics={pics} />
					<Highlights feat={feat} />
					<TopDownloads popu={popu} />
					<Search
						search={search}
						setSearch={setSearch}
						games={games}
						setNewGames={setNewGames}
					/>
					<Display
						games={games}
						newGames={newGames}
						search={search}
						loading={Loading}
						visible={visible}
					/>
				</Layout>
			</main>
		</Fragment>
	);
}
