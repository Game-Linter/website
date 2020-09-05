import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';

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
}

export const getStaticPaths: GetStaticPaths = async () => {
	const res: { kebabTitle: string }[] = await fetch(
		'https://api.game-linter.com/games'
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
	const res = await fetch(`https://api.game-linter.com/gamebyid/${params.id}`);
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
		},
		revalidate: 3600,
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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div>
			<p>{thumbnail}</p>
			<p>{backgroundimg}</p>
			<p>{count}</p>
		</div>
	);
};
