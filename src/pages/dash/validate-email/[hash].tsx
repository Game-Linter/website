import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Fragment, useState, FormEvent } from 'react';
import Layout from '../../../components/layout';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const response = await axios
			.get(`https://api.game-linter.com/api/v1/validate-email/${params.hash}`)
			.then((res) => res.status);
		return {
			props: { validToken: true, validation: params.hash },
		};
	} catch (error) {
		return {
			props: { validToken: false, errors: error.response.data.errors },
		};
	}
};

interface IProps {
	validToken: boolean;
	errors: any[];
	validation: string;
}

const ChangePassword: (props: IProps) => JSX.Element = ({
	validToken,
	errors,
	validation,
}) => {
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [errorMessages, setErrorMessages] = useState<JSX.Element>(<p></p>);
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	const HandleSubmit: (event: FormEvent<HTMLFormElement>) => void = async (
		e
	) => {
		e.preventDefault();

		axios
			.post('https://api.game-linter.com/api/v1/update-password', {
				password,
				passwordConfirm,
				validation,
			})
			.then((res) => {
				enqueueSnackbar('Success, password changed successfully', {
					variant: 'info',
				});
				setTimeout(() => {
					router.push('/dash');
				}, 1500);
			})
			.catch((err) => {
				err.response.data.errors.map((error) => {
					enqueueSnackbar(error.message, {
						variant: 'warning',
					});
				});
			});
	};
	return (
		<Layout>
			{validToken ? (
				<div>
					<div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
						<div className="max-w-md w-full">
							<form className="mt-8" onSubmit={HandleSubmit}>
								<input type="hidden" name="remember" defaultValue="true" />
								<div className="rounded-md shadow-sm">
									<div className="font-bold text-3xl">
										Provide a new password
									</div>
									<hr className="from-indigo-400 bg-green-500" />
									<hr className="from-indigo-400 bg-green-500" />
									<hr className="from-indigo-400 bg-green-500" />
									<hr className="from-indigo-400 bg-green-500" />
									<hr className="from-indigo-400 bg-green-500" />
									<div className="mt-5 text-xl">
										<div className="mt-1 relative rounded-md shadow-sm">
											<input
												type="password"
												name="password"
												id="password"
												className="focus:border-indigo-500 block w-full pl-7 pr-12 border-gray-300 rounded-md"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="New password"
											/>
											<div className="absolute inset-y-0 right-0 flex items-center mt-5"></div>

											<input
												type="password"
												name="password"
												id="password"
												className="focus:border-indigo-500 block w-full pl-7 pr-12 border-gray-300 rounded-md mt-8"
												value={passwordConfirm}
												onChange={(e) => setPasswordConfirm(e.target.value)}
												placeholder="Confirm password"
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
										Change My Password
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div>
						<div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
							{errors.map((error) => {
								return (
									<div className="bg-red-200 relative text-red-500 py-3 px-3 rounded-lg">
										{error.message}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default ChangePassword;
