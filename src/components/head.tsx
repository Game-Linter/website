import Head from 'next/head';

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
}

const HeadElement = ({
	token,
	data,
	index,
}: {
	token?: string;
	index: boolean;
	data?: IReturnValue;
}) => {
	return (
		<Head>
			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=UA-148360710-1"
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-148360710-1');`,
				}}
			></script>

			<title>
				{index
					? 'Game-Linter'
					: 'Game-Linter | Download ' +
					  data.title +
					  ' Handepicked Torrent file'}
			</title>
			<link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
			<link rel="dns-prefetch" href="https://s3.game-linter.com/" />
			<meta
				name="description"
				content={
					index
						? 'Magnet link sharing platform, game-linter does not host or store any illegal contents on its servers. All this website does is present games and information that was collected across certain trusted sources over the internet, based on the quality of the uploads, ratings and download counts, cannot be held responsible for any content.'
						: 'Download ' +
						  data.title +
						  ' free Torrent from game-linter.com, Tested and Working 100%'
				}
			/>
			<link rel="canonical" href="https://game-linter.com" />
			<script
				data-ad-client="ca-pub-1032102225919169"
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
			></script>
			<meta name="csrf-token" content={token} />
			<meta
				name="keywords"
				content={
					!index
						? data.title +
						  ', ' +
						  data.kebabTitle +
						  ' utorrent, games, kickass ,best, free, pc, games, 2018, single, player, pc, games, video games, online, ad free, cracked, cracked pc games, skidrow, fit, girl, fitgirl'
						: 'utorrent, games, kickass ,best, free, pc, games, 2018, single, player, pc, games, video games, online, ad free, cracked, cracked pc games, skidrow, fit, girl, fitgirl'
				}
			/>
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<meta
				property="og:title"
				content={
					index
						? 'Game-linter - Download handpicked torrent Games for free'
						: 'Game-linter | Download ' +
						  data.title +
						  ' Handpicked Torrent file'
				}
			/>
			<meta property="og:type" content="website" />
			<meta
				name="og:description"
				content={
					index
						? 'Magnet link sharing platform, game-linter does not host or store any illegal contents on its servers. All this website does is present games and information that was collected across certain trusted sources over the internet, based on the quality of the uploads, ratings and download counts, cannot be held responsible for any content.'
						: 'Download ' +
						  data.title +
						  ' free Torrent from game-linter.com, Tested and Working 100%'
				}
			/>
			<meta
				property="og:image"
				content={
					index
						? 'https://s3.game-linter.com/need-for-speed-heat-deluxe-edition-back.webp'
						: data.backgroundimg
				}
			/>
			<meta
				property="og:url"
				content={
					index
						? 'https://game-linter.com/'
						: 'https://game-linter.com/game/' + data.kebabTitle
				}
			/>
		</Head>
	);
};
export default HeadElement;
