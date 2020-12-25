import axios from 'axios';
import { useState, useEffect } from 'react';
import qs from 'querystring';
import { useSnackbar } from 'notistack';

const Form = ({ name }) => {
	const [title, setTitle] = useState('');
	const [size, setsize] = useState(undefined);
	const [Genre, setGenre] = useState('');
	const [magnetLink, setmagnetLink] = useState('');
	const [review, setreview] = useState(undefined);
	const [Thumbnail, setThumbnail] = useState('');
	const [background, setbackground] = useState('');
	const [trailer, settrailer] = useState('');
	const [NumberofFiles, setNumberofFiles] = useState(undefined);
	const [money_link, setMoney_link] = useState('');
	const { enqueueSnackbar } = useSnackbar();

	const HandleSubmit = (event: any) => {
		event.preventDefault();
		axios
			.post(
				'https://api.game-linter.com/add-game',
				qs.stringify({
					title,
					size,
					magnetLink,
					Genre,
					Thumbnail,
					review,
					background,
					trailer,
					NumberofFiles,
					money_link,
				}),
				{
					timeout: 5000,
					withCredentials: true,
				}
			)
			.then(
				() => {
					enqueueSnackbar('Game added, successfuly');
					setTimeout(() => {
						window.location.href = '/';
					}, 1200);
				},
				(e) => {
					e.response.data.errors.map((error) => {
						enqueueSnackbar(error.message, {
							variant: 'warning',
						});
					});
				}
			);
	};

	return (
		<div>
			<h1 className="font-sans text-lg flex justify-center ">
				{'Welcome ' + name + ' 💖.'}
			</h1>
			<form
				onSubmit={HandleSubmit}
				className="grid grid-cols-2 border border-1 border-black"
			>
				<div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
					<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
						{' '}
						<label>Title</label>
						<input
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							name="title"
							type="text"
							className="form-control"
							id="inputEmail4"
							placeholder="Title"
							required
						/>{' '}
					</div>
					<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
						{' '}
						<label>Size in GB</label>
						<input
							value={size}
							onChange={(event) => setsize(event.target.value)}
							name="size"
							type="text"
							className="form-control"
							id="inputPassword4"
							placeholder="size"
							required
						/>{' '}
					</div>
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>Genre</label>
					<input
						value={Genre}
						onChange={(event) => setGenre(event.target.value)}
						name="genre"
						type="text"
						className="form-control"
						id="inputAddress"
						placeholder="game genre"
						required
					/>{' '}
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>Number of files</label>
					<input
						value={NumberofFiles}
						onChange={(event) => setNumberofFiles(event.target.value)}
						name="files"
						type="number"
						className="form-control"
						id="inputAddress2"
						placeholder="in numbers..."
						required
					/>{' '}
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>
						<b>Magnet</b> link
					</label>
					<input
						value={magnetLink}
						onChange={(event) => setmagnetLink(event.target.value)}
						name="magnetlink"
						type="text"
						className="form-control"
						id="inputAddress2"
						placeholder=""
						required
						autoComplete="off"
					/>{' '}
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>Review</label>
					<input
						value={review}
						onChange={(event) => setreview(event.target.value)}
						name="review"
						max="100"
						min="0"
						type="number"
						className="form-control"
						id="inputAddress2"
						required
						placeholder="in percent..."
					/>{' '}
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>Thumbnail link</label>
					<input
						value={Thumbnail}
						onChange={(event) => setThumbnail(event.target.value)}
						name="thumbnail"
						type="text"
						className="form-control"
						id="inputAddress2"
						required
						placeholder="link"
						autoComplete="off"
					/>{' '}
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>background link</label>
					<input
						value={background}
						onChange={(event) => setbackground(event.target.value)}
						name="backgroundimg"
						type="text"
						className="form-control"
						id="inputAddress2"
						required
						placeholder="link"
						autoComplete="off"
					/>{' '}
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>Money Link</label>
					<input
						value={money_link}
						onChange={(event) => setMoney_link(event.target.value)}
						name="backgroundimg"
						type="text"
						className="form-control"
						id="inputAddress2"
						placeholder="link"
						autoComplete="off"
					/>{' '}
				</div>
				<div className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					{' '}
					<label>Trailer Link</label>
					<input
						value={trailer}
						onChange={(event) => settrailer(event.target.value)}
						name="trailerlink"
						type="text"
						className="form-control"
						id="inputAddress2"
						required
						placeholder="link"
						autoComplete="off"
					/>{' '}
				</div>
				<button
					type="submit"
					className="mt-5 border-4 bg-blue-300 border-gray-300"
				>
					Done!
				</button>{' '}
				<button
					onClick={(event) => {
						event.preventDefault();
						axios
							.get('https://api.game-linter.com/api/v1/signout', {})
							.then(() => window.location.reload());
					}}
					className="mt-5 border-4 bg-green-300 border-gray-300"
				>
					Sign out!
				</button>
			</form>
		</div>
	);
};

export default Form;
