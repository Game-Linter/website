import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Carousel from '../components/carousel';
import Layout from '../components/layout';

interface TResponse {
	title: string;
	img: string;
	id: string;
	kebabTitle: string;
	webp: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const pics = await fetch('https://api.game-linter.com/games')
		.then((res) => res.json())
		.then((res) => res.pics as TResponse);

	return {
		props: {
			pics,
		},
		revalidate: 3600,
	};
};

export default function Home({
	pics,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div>
			<Head>
				<title>Game-Linter</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Layout>
					<div className="card-body p-5">
						<div className="container mx-auto px-4">
							<div className="bg-indigo-200 text-center lg:py-4 md:py-4 lg:px-4 lg:rounded md:rounded sm:rounded">
								<div
									className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full md:rounded-full flex lg:inline-flex  md:inline-flex"
									role="alert"
								>
									<span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
										New
									</span>
									<span
										className="font-semibold mr-2 text-left flex-auto cursor-pointer"
										onClick={() => {
											window.localStorage.setItem('myTheme', 'dark');
											return window.location.reload();
										}}
									>
										Check out the New Dark Mode
									</span>
									<svg
										className="fill-current opacity-75 h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					<Carousel pics={pics} />
				</Layout>
			</main>
		</div>
	);
}
