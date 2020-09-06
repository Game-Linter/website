import NavBar from './navbar';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment } from 'react';
import Footer from './footer';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
	const token = await fetch('https://api.game-linter.com/games')
		.then((res) => res.json())
		.then((res) => res._csrf as string);
	console.log(token);
	return {
		props: { token },
		revalidate: 1,
	};
};

const Layout = ({
	children,
	token,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<Fragment>
			<NavBar />
			<div className="card border-0 shadow my-5 look">
				<div className="card-body p-5 " id="tobeblurred">
					{children}
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default Layout;
