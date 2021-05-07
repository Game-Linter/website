import {
	useState,
	useEffect,
	FormEventHandler,
	MouseEventHandler,
	ChangeEventHandler,
} from 'react';
import { useSnackbar } from 'notistack';
import { AnonymousCredential, BlobServiceClient } from '@azure/storage-blob';
import { genRandomName } from '../actions/genName';

const Form = ({ name }) => {
	const [Thumbnail, setThumbnail] = useState('');
	const [background, setbackground] = useState('');
	const [blobFile, setBlobFile] = useState<File | null>(null);
	const [thumbnail_done, setThumbnailDone] = useState<boolean>(false);
	const [background_done, setBackgroundDone] = useState<boolean>(false);
	const [code, setCode] = useState<string>('');
	const [typeofupload, setTypeofUpload] = useState<string>('background');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const submitGame: FormEventHandler<HTMLFormElement> = async (event: any) => {
		event.preventDefault();

		if (!thumbnail_done && !background_done) {
			enqueueSnackbar('Upload images first');
			return;
		}

		const api_url = 'https://api.game-linter.com/add-game';

		const {
			title,
			size,
			magnetLink,
			genre,
			thumbnail,
			review,
			background,
			trailer,
			NumberofFiles,
		} = event.target;

		const res = await fetch(api_url, {
			body: JSON.stringify({
				title: title.value,
				size: size.value,
				magnetLink: magnetLink.value,
				Genre: genre.value,
				Thumbnail: thumbnail.value,
				review: review.value,
				background: background.value,
				trailer: trailer.value,
				NumberofFiles: NumberofFiles.value,
				money_link: undefined,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			credentials: 'include',
		}).catch((err) => {
			enqueueSnackbar('Failed to submit Metadata', {
				variant: 'warning',
			});
			return err;
		});

		// const result = await res.json();
		// if (res.status === 201) {
		enqueueSnackbar('Success,  Game published');
		setBackgroundDone(false);
		setThumbnailDone(false);
		// window.location.reload();
		// }
	};

	const submitImage: MouseEventHandler<HTMLButtonElement> = async (event) => {
		const button_name = event.currentTarget.name;
		const res = await fetch('https://file.game-linter.com/api/v1/upload_file', {
			body: JSON.stringify({
				file_origin:
					button_name === 'upload_thumbnail' ? Thumbnail : background,
				type: button_name === 'upload_thumbnail' ? 'front' : 'back',
			}),
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
		}).catch((err) => {
			enqueueSnackbar('Failed to upload image', {
				variant: 'warning',
			});
			console.log(err);
			return err;
		});

		const result = await res.json();

		if (result.status === 200) {
			if (button_name === 'upload_thumbnail') {
				// console.log(result);
				setThumbnailDone(true);
				setThumbnail(result.url);
			} else {
				// console.log(result);
				setBackgroundDone(true);
				setbackground(result.url);
			}
		}
	};

	async function getSasToken(): Promise<any> {
		const res = await fetch(
			`https://upload.game-linter.com/api/upload-blob?code=${code}`,
			{
				mode: 'cors',
			}
		);

		return await res.json();
	}

	const uploadImageBlob = async (event) => {
		if (!blobFile) {
			return;
		}
		const { token } = await getSasToken();
		const destinationName = await genRandomName(blobFile, token);
		const blobServiceClient = new BlobServiceClient(
			`https://gamelinterstorage.blob.core.windows.net?${token}`,
			new AnonymousCredential()
		);

		const containerService = blobServiceClient.getContainerClient('media');
		let blobService;

		if (typeofupload === 'background') {
			blobService = containerService.getBlockBlobClient(
				'background/' + destinationName
			);
		} else {
			blobService = containerService.getBlockBlobClient(
				'thumbnail/' + destinationName
			);
		}
		const id = enqueueSnackbar('Uploading...', {
			autoHideDuration: 1000 * 10,
		});
		blobService
			.uploadBrowserData(blobFile, {
				blobHTTPHeaders: {
					blobContentType: blobFile.type,
				},
			})
			.then((res) => {
				closeSnackbar(id);
				enqueueSnackbar('Published image', {
					variant: 'success',
				});

				if (typeofupload === 'background') {
					setBackgroundDone(true);
					setbackground(
						`https://cdn.game-linter.com/media/background/${destinationName}`
					);
				} else {
					setThumbnailDone(true);
					// setBackgroundDone(true);
					setThumbnail(
						`https://cdn.game-linter.com/media/thumbnail/${destinationName}`
					);
				}
				// console.log(res._response.status);
			})
			.catch((err) => {
				enqueueSnackbar('Failed', {
					variant: 'warning',
				});
			});
	};

	useEffect(() => {
		setCode('Zrokzh20Dhr46ImaLgMmoSWlVAEjPFyY1JOsG/QY2wtnJ5JlpkY8SA==');
	}, []);

	return (
		<div>
			<h1 className="font-sans text-lg flex justify-center ">
				{'Welcome ' + name + ' 💖.'}
			</h1>
			<form
				onSubmit={submitGame}
				className="border-4 border-teal-500 rounded-md p-4"
			>
				<h2 className="text-center mx-auto  w-full  text-2xl underline font-mono">
					Game-Linter Console.
				</h2>
				<p className="text-center">adding a new game huh!</p>
				<div className="flex mt-5 justify-center">
					{background_done ? (
						<img
							src={background}
							className="w-64 h-32 rounded-lg border-2 border-red-300 shadow-xl"
							alt=""
						/>
					) : (
						''
					)}
					<input
						className="appearance-none bg-transparent border border-1 flex text-gray-700 mr-3 mt-2 py-1 px-2 leading-tight focus:outline-none w-full md:w-1/2"
						type="text"
						placeholder="Background Online URL"
						aria-label="Full name"
						name="background"
						value={background}
						onChange={(e) => setbackground(e.target.value)}
						disabled={background_done}
					/>
					<button
						className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-2 mr-4"
						type="button"
						onClick={submitImage}
						name="upload_background"
						disabled={background_done}
					>
						{background_done ? 'Done !!!' : 'Upload Image'}
					</button>
					{thumbnail_done ? (
						<img
							src={Thumbnail}
							className="w-32 h-64 rounded-lg border-2 border-red-300 shadow-xl"
							alt=""
						/>
					) : (
						''
					)}
					<input
						className="appearance-none bg-transparent border border-1 flex text-gray-700 mr-3 mt-2 py-1 px-2 leading-tight focus:outline-none w-full md:w-1/2"
						type="text"
						placeholder="Thumbnail Online URL"
						aria-label="Full name"
						name="thumbnail"
						value={Thumbnail}
						onChange={(e) => setThumbnail(e.target.value)}
						disabled={thumbnail_done}
					/>
					<button
						className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-2"
						type="button"
						onClick={submitImage}
						name="upload_thumbnail"
						disabled={thumbnail_done}
					>
						{thumbnail_done ? 'Done !!!' : 'Upload Image'}
					</button>
				</div>
				<div className="w-full md:w-1/2 flex mx-auto mt-5">
					<input
						className="appearance-none bg-transparent border border-1 flex text-gray-700 mr-3 mt-2 py-1 px-2 leading-tight focus:outline-none w-full md:w-1/2"
						type="file"
						placeholder="Background Online URL"
						aria-label="Full name"
						name="background_upload"
						onChange={(e) => {
							setBackgroundDone(false);
							setThumbnailDone(false);
							console.log(e.target.files[0]);
							setBlobFile(e.target.files[0]);
							return e;
						}}
					/>
					<div className="flex">
						<button
							className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-2 mr-4"
							type="button"
							onClick={uploadImageBlob}
							name="upload_background"
							disabled={background_done ? true : false}
						>
							{background_done ? 'Done !!!' : 'Upload Image'}
						</button>
						<div className="mt-5">
							<div
								className="flex"
								onChange={(e: any) => {
									console.log(e.target.value);
									setTypeofUpload(e.target.value);
									return e;
								}}
							>
								<input
									type="radio"
									id="toggle_thumbnail"
									name="toggle_thumbnail"
									defaultValue="thumbnail"
									className="mr-4 mt-1"
								/>
								<label htmlFor="toggle_thumbnail" className="mr-3">
									Thumbnail
								</label>
								<input
									type="radio"
									id="toggle_background"
									name="toggle_background"
									defaultValue="background"
									className="mr-4 mt-1"
									defaultChecked={true}
								/>
								<label htmlFor="toggle_background">Background</label>
							</div>
						</div>
					</div>
				</div>
				<div className="block mt-4 justify-center mx-auto">
					<h1 className="font-semibold text-2xl text-center underline mb-4">
						Game Metadata
					</h1>
					<div className="flex flex-wrap">
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Game title
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="GTA"
								name="title"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Game size in GB
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="5"
								name="size"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Magnet Link
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="magnet:xtr"
								name="magnetLink"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Genre
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="5"
								name="genre"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Reviews
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="60"
								name="review"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Trailer
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="https://youtube.com/..."
								name="trailer"
							/>
						</div>
						<div className="w-1/2 mx-auto px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Number Of files
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="5"
								name="NumberofFiles"
							/>
						</div>
					</div>
				</div>
				{/* 
				<button
					className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
					type="button"
				>
					Cancel
				</button>

				<div>
					<input
						className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
						type="text"
						placeholder="Jane Doe"
						aria-label="Full name"
					/>
					<button
						className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
						type="button"
					>
						Sign Up
					</button>
					<button
						className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
						type="button"
					>
						Cancel
					</button>
				</div> */}
				<button
					type="submit"
					className="bg-blue-500 p-4 rounded text-gray-100 justify-center flex mx-auto "
				>
					Submit Meta Data
				</button>
			</form>
		</div>
	);
};

export default Form;
