import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import Layout from '../../components/layout';
import { useState } from 'react';
import { FormEvent } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export const getServerSideProps: any = async (
	context: GetServerSidePropsContext
) => {
	const isLogged: boolean = await axios
		.get('https://api.game-linter.com/api/v1/currentuser', {
			headers: {
				cookie: context.req.headers.cookie || '',
			},
		})
		.then((res) => res.data.currentUser !== null);
	if (isLogged) {
		return {
			redirect: {
				destination: '/dash',
				permanent: false,
			},
		};
	}
	return {
		props: {
			isLogged,
		},
	};
};

export default function Signup({ isLogged }: any) {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [password2, setPassword2] = useState<string>('');
	const [name, setName] = useState<string>('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [isSending, setSending] = useState<boolean>(false);
	const router = useRouter();

	const HandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const barID = enqueueSnackbar('Loading...');
		setSending(true);
		try {
			const user = await axios
				.post('https://api.game-linter.com/api/v1/signup', {
					username: email,
					password,
					password2,
					name,
				})
				.then((res) => {
					closeSnackbar(barID);
					setSending(false);
					enqueueSnackbar('Account created check your email');
					return res.data;
				});

			setTimeout(() => {
				router.push('/dash');
			}, 1000);
		} catch (error) {
			closeSnackbar(barID);
			setSending(false);
			error.response?.data.errors.map((error: { message: string }) => {
				enqueueSnackbar(error.message, {
					variant: 'warning',
				});
			});
		}
	};

	return (
		<Layout>
			<div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="/logoalso.png"
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
							Signup
						</h2>
					</div>
					<form className="mt-8" onSubmit={!isSending && HandleSubmit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm">
							<div>
								<input
									aria-label="Email address"
									name="email"
									type="email"
									required
									className="appearance-none rounded-none bg-gray-600 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<input
									aria-label="Full name"
									name="Full name"
									type="Full name"
									required
									className="appearance-none rounded-none bg-gray-600 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
									placeholder="Full name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="-mt-px">
								<input
									aria-label="Password"
									name="password"
									type="password"
									required
									className="appearance-none rounded-none bg-gray-600 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="">
								<input
									aria-label="Password confirmation"
									name="Password confirmation"
									type="password"
									required
									className="appearance-none rounded-none bg-gray-600 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
									placeholder="Password confirmation"
									value={password2}
									onChange={(e) => setPassword2(e.target.value)}
								/>
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
								Create my account
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
