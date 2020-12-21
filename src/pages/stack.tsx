import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/layout';
import Link from 'next/link';

export default function Stack() {
	const [banner, setBanner] = useState(false);

	useEffect(() => {
		const theme = window.localStorage.getItem('theme');
		setBanner(theme === 'dark' ? false : true);
	}, []);

	return (
		<Fragment>
			<Layout>
				<div className="text-center font-sans">
					<h1 className="text-lg font-semibold">Hi</h1>
					<p className="mt-10">
						After serving more than a total of 10K different people for a year,
						We are seeking to becoming something else, something better,
						something
					</p>
					<label className="font-bold">Different</label>
					<div className="flex mx-auto h-1 w-20 bg-indigo-500 rounded my-8"></div>
					<p>
						Making this website was a lot of fun, it was a reflection of a set
						of skills we wanted to develop, it was purely for learning purposes,
						and was created like any other professional website, checkout the
						tech-stack below.
					</p>
					<p className="text-xl mt-2">Thank you for using our website</p>
					<p className="font-mono mt-10">
						Please refer to{' '}
						<Link href="/request">
							<a className="inline-block bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2">
								suggestions
							</a>
						</Link>
						if you have any proposals, anything to say at all or just to say
						`thank you`, we would be happy to oblige.
					</p>
					{banner ? (
						<div
							className="container mx-auto mt-5"
							dangerouslySetInnerHTML={{
								__html: `<a frameborder="0" data-theme="light" data-layers="1,2,3,4" data-stack-embed="true" href="https://embed.stackshare.io/stacks/embed/3fe99729b169275f64af0eb0c84093"/></a><script async src="https://cdn1.stackshare.io/javascripts/client-code.js" charset="utf-8"></script>`,
							}}
						></div>
					) : (
						<div
							className="container mx-auto mt-5"
							dangerouslySetInnerHTML={{
								__html: `<a frameborder="0" data-theme="dark" data-layers="1,2,3,4" data-stack-embed="true" href="https://embed.stackshare.io/stacks/embed/3fe99729b169275f64af0eb0c84093"/></a><script async src="https://cdn1.stackshare.io/javascripts/client-code.js" charset="utf-8"></script>`,
							}}
						></div>
					)}
				</div>
			</Layout>
		</Fragment>
	);
}
