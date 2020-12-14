import axios from 'axios';
import { useState, FormEvent, FC } from 'react';
import Layout from '../../components/layout';
import { showErrors } from '../../actions/show-errors.action';
import { useSnackbar } from 'notistack';

const Resetpassword: () => JSX.Element = () => {
	const [email, setEmail] = useState<string>('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await axios
			.post('https://api.game-linter.com/api/v1/reset-email', {
				email,
			})
			.then((res) => {
				enqueueSnackbar('Check you inbox', {
					variant: 'success',
				});
			})
			.catch(showErrors);
	};

	return (
		<Layout>
			<div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full">
					<form className="mt-8" onSubmit={HandleSubmit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm">
							<div className="font-bold text-3xl">What's your email</div>
							<hr className="from-indigo-400 bg-green-500" />
							<hr className="from-indigo-400 bg-green-500" />
							<hr className="from-indigo-400 bg-green-500" />
							<hr className="from-indigo-400 bg-green-500" />
							<hr className="from-indigo-400 bg-green-500" />
							<div className="mt-5 text-xl">
								<div className="mt-1 relative rounded-md shadow-sm">
									<input
										type="email"
										name="email"
										id="email"
										className="focus:border-indigo-500 block w-full pl-7 pr-12 border-gray-300 rounded-md"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<div className="absolute inset-y-0 right-0 flex items-center"></div>
								</div>
							</div>
						</div>
						<div className="mt-6 flex items-center justify-between">
							<div className="text-sm leading-5"></div>
						</div>
						<div className="mt-6">
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
							>
								Send me a recovery Email
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Resetpassword;
