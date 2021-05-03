import Link from 'next/link';
import _ from 'lodash';

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
	WebpBack: string;
	genre: string;
	i_back: string;
}

interface IProps {
	all: boolean;
	value: IReturnValue;
}

function GameItem(props: IProps) {
	return (
		<div className={'p-4 lg:w-1/' + (props.all ? '5' : '4')}>
			<div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden img-game">
				<Link as={'/game/' + props.value.kebabTitle} href="/game/[id]">
					<a>
						<picture>
							<source
								srcSet={props.value.WebpBack?.replace('jpeg', 'webp')}
								type="image/webp"
							/>
							<source srcSet={props.value.i_back} type="image/jpeg" />
							<img
								className="lg:h-48 md:h-36 w-full object-cover object-center"
								src={props.value.i_back}
								alt={props.value.title}
							/>
						</picture>
					</a>
				</Link>
				<div className="p-6">
					<h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
						{_.upperFirst(props.value.genre)}
					</h2>
					<h1 className="title-font text-lg font-medium text-gray-900 mb-3">
						{_.upperFirst(props.value.title)}
					</h1>
					<p className="leading-relaxed mb-3"></p>
					<div className="flex items-center flex-wrap ">
						<Link as={'/game/' + props.value.kebabTitle} href="/game/[id]">
							<a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
								Download
								<svg
									className="w-4 h-4 ml-2"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14" />
									<path d="M12 5l7 7-7 7" />
								</svg>
							</a>
						</Link>
						<span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
							<img src="/folder.svg" className="w-4 h-4 mr-1" alt="size" />
							{props.value.size + 'GB'}
						</span>
						<span className="text-gray-600 inline-flex items-center leading-none text-sm">
							<img
								src="/download.svg"
								className="w-4 h-4 mr-1"
								alt="download-count"
							/>
							{props.value.count}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameItem;
