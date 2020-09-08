import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import qs from 'querystring';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Layout from '../../components/layout';
import Head from 'next/head';

function Request() {
	const [request, setRequest] = useState('');
	const [isSending, setIsSending] = useState(false);
	const onChange = (event) => {
		setRequest(event.target.value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		setIsSending(true);
		let token = document
			.querySelector("meta[name='csrf-token']")
			?.getAttribute('content');
		await axios
			.post('/api/mailer', qs.stringify({ lmao: request }), {
				withCredentials: true,
				headers: {
					'X-CSRF-Token': token ? token : '',
				},
			})
			.then(
				() => {
					setIsSending(false);
					toast.info('Thank you!');
					setTimeout(() => {
						window.location.href = '/';
					}, 1500);
				},
				() => {
					setIsSending(false);
					toast.warn('Sorry, try again later');
				}
			);
	};

	return (
		<Layout>
			<Head>
				<title>Request a Game Or Report a Game</title>
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=UA-148360710-2"
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
					  window.dataLayer = window.dataLayer || [];
					  function gtag(){dataLayer.push(arguments);}
					  gtag('js', new Date());
					
					  gtag('config', 'UA-148360710-2');
					`,
					}}
				/>
			</Head>
			<LoadingOverlay
				active={isSending}
				spinner={<PacmanLoader size={100} color={'#FFFFFF'} />}
			>
				<form onSubmit={onSubmit}>
					<section className="text-gray-700 body-font relative">
						<div className="container px-5 py-24 mx-auto">
							<div className="flex flex-col text-center w-full mb-12">
								<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
									Request/Report
								</h1>
								<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
									Is there a game you want, or want to report?
								</p>
							</div>
							<div className="lg:w-1/2 md:w-2/3 mx-auto">
								<div className="flex flex-wrap -m-2">
									<div className="p-2 w-full text-black">
										<textarea
											className="w-full bg-gray-100 rounded text-black border-gray-400 focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
											placeholder="Message"
											defaultValue={''}
											required
											value={request}
											onChange={onChange}
										/>
									</div>
									<div className="p-2 w-full">
										<button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
											Send
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</form>
			</LoadingOverlay>
		</Layout>
	);
}

export default Request;
