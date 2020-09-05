import Link from 'next/link';

interface TResponse {
	title: string;
	img: string;
	id: string;
	kebabTitle: string;
	webp: string;
}

const Carousel = ({ pics }: { pics: TResponse[] }) => {
	return (
		<section className="text-gray-700 body-font">
			<div className="container px-5 py-24 mx-auto flex flex-wrap">
				<div className="flex w-full mb-20 flex-wrap">
					<h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
						Latest Added.
					</h1>
				</div>
				<div className="flex flex-wrap md:-m-2 -m-1">
					<div className="flex flex-wrap w-1/2">
						<Link href={'/game/' + pics[0]?.kebabTitle}>
							<div className="md:p-2 p-1 w-full">
								<picture>
									<source
										srcSet={pics[0]?.webp.replace('.jpeg', '.webp')}
										type="image/webp"
									/>
									<source srcSet={pics[0]?.img} type="image/jpeg" />
									<img
										alt={pics[0]?.title}
										className="w-full h-full object-cover object-center block"
										src={pics[0]?.img}
									/>
								</picture>
							</div>
						</Link>
						<Link href={'/game/' + pics[1]?.kebabTitle}>
							<div className="md:p-2 p-1 w-full">
								<picture>
									<source
										srcSet={pics[1]?.webp.replace('jpeg', 'webp')}
										type="image/webp"
									/>
									<source srcSet={pics[1]?.img} type="image/jpeg" />
									<img
										alt={pics[1]?.title}
										className="w-full object-cover h-full object-center block"
										src={pics[1]?.img}
									/>
								</picture>
							</div>
						</Link>
					</div>

					<div className="flex flex-wrap w-1/2">
						<div className="md:p-2 p-1 w-1/2">
							<Link href={'/game/' + pics[2]?.kebabTitle}>
								<picture>
									<source
										srcSet={pics[2]?.webp.replace('jpeg', 'webp')}
										type="image/webp"
									/>
									<source srcSet={pics[2]?.img} type="image/jpeg" />
									<img
										alt={pics[2]?.title}
										className="w-full object-cover h-full object-center block"
										src={pics[2]?.img}
									/>
								</picture>
							</Link>
						</div>
						<div className="md:p-2 p-1 w-1/2">
							<Link href={'/game/' + pics[3]?.kebabTitle}>
								<picture>
									<source
										srcSet={pics[3]?.webp.replace('jpeg', 'webp')}
										type="image/webp"
									/>
									<source srcSet={pics[3]?.img} type="image/jpeg" />

									<img
										alt={pics[3]?.title}
										className="w-full object-cover h-full object-center block"
										src={pics[3]?.img}
									/>
								</picture>
							</Link>
						</div>
						<div className="md:p-2 p-1 w-full">
							<Link href={'/game/' + pics[4]?.kebabTitle}>
								<picture>
									<source
										srcSet={pics[4]?.webp.replace('jpeg', 'webp')}
										type="image/webp"
									/>
									<source srcSet={pics[4]?.img} type="image/jpeg" />

									<img
										alt={pics[4]?.title}
										className="w-full h-full object-cover object-center block"
										src={pics[4]?.img}
									/>
								</picture>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Carousel;
