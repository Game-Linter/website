import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import React, { useEffect, useState, RefObject } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import qs from 'querystring';
import HeadElement from '../../components/head';
import fetch from 'isomorphic-unfetch';
import Clipboard from 'react-clipboard.js';
import { useSnackbar } from 'notistack';
import ReactMarkdown from 'react-markdown';

type IParamURI = { params: { id: string } };
interface IReturnValue {
	thumbnail: string;
	title: string;
	size: number;
	files: number;
	magnetlink: string;
	review: number;
	backgroundimg: string;
	trailerlink: string;
	kebabTitle: string;
	comments: { content: string }[];
	count: number;
	WebpThumb: string;
	info: string;
	genre: string;
	shortLink: string;
	i_thumbnail: string;
	i_back: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const res: { kebabTitle: string }[] = await fetch(
		'https://api.game-linter.com/games',
		{
			headers: {
				referer: 'https://game-linter.com/',
			},
		}
	)
		.then((res) => res.json())
		.then((data) => data.resp);
	const paths = res.map((vl) => {
		return { params: { id: vl.kebabTitle } } as IParamURI;
	});
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<IReturnValue> = async ({
	params,
}) => {
	// Fetch data from external API
	// console.log(ctx.params);
	const res = await fetch(`https://api.game-linter.com/gamebyid/${params.id}`, {
		headers: {
			referer: 'https://game-linter.com/',
		},
	});
	const shortLink = await Axios.post(
		`https://short.game-linter.com/api/shorten`,
		qs.stringify({
			longUri: `https://game-linter.com/game/${params.id}`,
		})
	).then((res) => res.data.shortenedUrl as string);
	const data = await res.json();
	const {
		backgroundimg,
		comments,
		count,
		files,
		kebabTitle,
		magnetlink,
		review,
		size,
		thumbnail,
		title,
		trailerlink,
		WebpThumb,
		genre,
		i_thumbnail,
		i_back,
	} = data.resp as IReturnValue;

	// Pass data to the page via props
	return {
		props: {
			backgroundimg,
			comments,
			count,
			files,
			kebabTitle,
			magnetlink,
			review,
			size,
			thumbnail,
			title,
			trailerlink,
			WebpThumb,
			info: data.info,
			genre,
			shortLink,
			i_thumbnail,
			i_back,
		},
		revalidate: 1,
	};
};

export default ({
	thumbnail,
	backgroundimg,
	comments,
	count,
	files,
	kebabTitle,
	magnetlink,
	review,
	size,
	title,
	trailerlink,
	WebpThumb,
	info,
	genre,
	shortLink,
	i_thumbnail,
	i_back,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const messageRef: RefObject<any> = React.createRef();

	const [acomment, setAcomment] = useState<string>('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		const portalRoot = document.getElementById('portal');
		if (localStorage.getItem('myTheme') === 'light') {
			portalRoot.style.cssText +=
				"background: url('" +
				i_back +
				"') no-repeat fixed center center !important; background-size: cover !important;-o-background-size: cover !important;-moz-background-size: cover !important;-webkit-background-size: cover !important;";
			const blurRoot = document.getElementById('tobeblurred');
			blurRoot.style.cssText +=
				'backdrop-filter: blur(4px); border-radius: 40px';
		}
		return () => {
			portalRoot.style.cssText = '';
			const blurRoot = document.getElementById('tobeblurred');
			blurRoot.style.cssText = '';
		};
	}, []);

	const share = async () => {
		enqueueSnackbar('Link copied!', {
			variant: 'success',
			preventDuplicate: true,
		});
		// try {
		// 	// const response = await Axios.post(
		// 	// 	'https://short.game-linter.com/api/shorten',
		// 	// 	qs.stringify({
		// 	// 		longUri: window.location.href,
		// 	// 	}),
		// 	// 	{
		// 	// 		withCredentials: true,
		// 	// 	}
		// 	// );
		// 	navigator.clipboard.writeText(shortLink).then(() => {
		// 	});
		// } catch (error) {
		// 	toast.error('OOps');
		// 	console.log(error);
		// }
	};

	const HandleClick = async () => {
		let token = document
			.querySelector('meta[name="csrf-token"]')
			?.getAttribute('content');
		Axios.patch(
			'https://api.game-linter.com/increment',
			qs.stringify({
				gameId: kebabTitle,
				count: count + 1,
			}),
			{
				timeout: 2000,
				headers: {
					'X-CSRF-Token': token,
				},
				withCredentials: true,
			}
		).then(
			(res) => {
				if (res.data) {
					alert(
						'if you dont have a torrent client exemple: uTorrent, please install it first then click the Download'
					);
					toast.success('Enjoy!');
					// if (resp.money_link) {
					//     return window.location.href = resp.money_link;
					// }
					return (window.location.href = magnetlink);
				}
			},
			() => {
				toast.warn('Something went wrong');
			}
		);
	};

	const data: IReturnValue = {
		thumbnail,
		backgroundimg,
		comments,
		count,
		files,
		kebabTitle,
		magnetlink,
		review,
		size,
		title,
		trailerlink,
		WebpThumb,
		info,
		genre,
		shortLink,
		i_thumbnail,
		i_back,
	};
	return (
		<>
			<HeadElement index={false} data={data} />
			<Layout>
				<div id="blur" className="flex-wrap">
					<div style={{ display: 'block' }}>
						<section className="text-gray-700 body-font">
							<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
								<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
									<picture>
										<source
											srcSet={i_thumbnail?.replace('.jpeg', '.webp')}
											type="image/webp"
										/>
										<source srcSet={i_thumbnail} type="image/jpeg" />
										<source
											srcSet={WebpThumb.replace('.jpeg', '.webp')}
											type="image/webp"
										/>
										<img
											className="object-cover object-center rounded"
											alt={title}
											src={i_thumbnail}
											onDragStart={(e) => e.preventDefault()}
										/>
									</picture>
								</div>
								<div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
									<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-200 underline">
										{title}
									</h1>
									<p className="mb-8 leading-relaxed text-white">
										Info hash: {info}
									</p>
									<div className="flex justify-center">
										<button
											onClick={() =>
												messageRef.current.scrollIntoView({
													behavior: 'smooth',
												})
											}
											className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
										>
											Scroll to Bottom
										</button>
										<Clipboard
											data-clipboard-text={shortLink}
											onSuccess={share}
											onError={() =>
												toast.warn('Error copying text to Clipboard')
											}
										>
											<button
												className="ml-4 inline-flex  bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-oroange-600 rounded text-lg"
												style={{
													color: 'black ',
												}}
												data-clipboard-text={shortLink}
											>
												Share This page
											</button>
										</Clipboard>
									</div>
								</div>
							</div>
						</section>
					</div>
					<section className="text-gray-700 body-font">
						<div className="container px-5 py-24 mx-auto">
							<div className="flex flex-wrap -m-4 text-center">
								<div className="p-4 sm:w-1/4 w-1/2">
									<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
										{count}
									</h2>
									<p className="leading-relaxed font-bold text-pink-200">
										Downloads
									</p>
								</div>
								<div className="p-4 sm:w-1/4 w-1/2">
									<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
										{comments?.length}
									</h2>
									<p className="leading-relaxed text-shadow font-bold text-pink-200">
										Comments
									</p>
								</div>
								<div className="p-4 sm:w-1/4 w-1/2">
									<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
										{review ? review + ' %' : ''}
									</h2>
									<p className="leading-relaxed font-bold text-pink-200">
										Reviews
									</p>
								</div>
								<div className="p-4 sm:w-1/4 w-1/2">
									<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
										{size ? size + ' GB' : ''}
									</h2>
									<p className="leading-relaxed font-bold text-pink-200">
										Size
									</p>
								</div>
							</div>
						</div>
					</section>
					<div>
						<section className="text-gray-700 body-font">
							<div className="container px-5 py-24 mx-auto flex flex-col">
								<div className="lg:w-6/6 mx-auto w-full">
									<div className="rounded-lg h-auto overflow-hidden wtf-lg">
										<iframe
											width="1010"
											height="616"
											src={trailerlink}
											frameBorder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											className="mx-auto"
										></iframe>
									</div>
								</div>
								{/* <div className="lg:w-6/6 mx-auto mt-8 w-full">
									<div className="rounded-lg h-auto overflow-hidden wtf-lg">
										<iframe
											width="1010"
											height="616"
											src="https://www.youtube.com/embed/3Lc2QmykQWY"
											frameBorder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											className="mx-auto"
										></iframe>
									</div>
								</div> */}
							</div>
						</section>
					</div>
					<div className="flex justify-center">
						<button
							onClick={HandleClick}
							type="button"
							ref={messageRef}
							className="bg-gray-500 hover:bg-gray-600 font-bold py-2 px-4 rounded inline-flex items-center mr-4 mb-4"
						>
							<svg
								className="fill-current w-4 h-4 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
							</svg>
							<span>Download</span>
						</button>
						{/* <a
							href={'https://www.g2a.com/search?query=' + kebabTitle}
							type="button"
							className="bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded inline-flex items-center mr-4 mb-4"
							target="__blank"
						>
							<svg
								className="fill-current w-4 h-4 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
							</svg>
							<span>Buy Game</span>
						</a> */}
					</div>
					<hr style={{ backgroundColor: 'lightgray', marginBottom: '1em' }} />
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<section className="text-gray-700 body-font relative">
									<form
										onSubmit={(e) => {
											e.preventDefault();
											Axios.post(
												'https://api.game-linter.com/submit-comment',
												qs.stringify({
													gameId: kebabTitle,
													content: acomment,
												}),
												{
													headers: {
														'X-CSRF-Token': document
															.querySelector("meta[name='csrf-token']")
															?.getAttribute('content'),
													},
													withCredentials: true,
												}
											)
												.then(() => {
													toast.success('Submitted');
													comments = [
														...comments,
														{
															content: acomment,
														},
													];
													setAcomment('');
												})
												.catch(() => toast.warn('Something went wrong'));
										}}
									>
										<div className="container px-5 py-24 mx-auto">
											<div className="lg:w-1/2 md:w-2/3 mx-auto">
												<div className="flex flex-wrap -m-2">
													<div className="p-2 w-full text-black">
														<textarea
															className="w-full text-black bg-gray-700 rounded border border-gray-400 focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
															placeholder="Leave a comment"
															required
															onChange={(e) => setAcomment(e.target.value)}
															defaultValue={''}
															value={acomment}
														/>
													</div>
													<div className="p-2 w-full">
														<button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
															Post
														</button>
													</div>
												</div>
											</div>
										</div>
									</form>
								</section>
							</div>
							<div className="flex flex-col text-center w-full mb-12">
								<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-300">
									Comments:
								</h1>
							</div>
							<section className="text-gray-700 body-font overflow-hidden">
								<div className="container px-5 py-24 mx-auto">
									<div className="-my-8">
										{comments?.length ? (
											<div className="h-1 w-20 bg-indigo-500 rounded mb-8"></div>
										) : (
											''
										)}
										<div className="container mx-auto px-4">
											{comments?.map((value, index) => (
												<div className="bg-teal-100 text-center lg:py-4 md:py-4 lg:px-4 rounded my-4">
													<div
														className="p-2 bg-gray-700 items-center text-indigo-100 leading-none lg:rounded-full md:rounded-full flex lg:inline-flex  md:inline-flex"
														role="alert"
													>
														<span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
															{index + 1}
														</span>
														<span className="mr-2 text-left flex-auto">
															<ReactMarkdown>{value.content}</ReactMarkdown>
														</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};
