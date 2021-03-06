import Link from 'next/link';

const LoginForm = ({
	HandleSubmit,
	setEmail,
	email,
	password,
	setPassword,
	remember,
	setRemember,
}) => {
	return (
		<div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div>
					<img
						className="mx-auto h-12 w-auto"
						src="/logoalso.png"
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
						Sign in to Admin Console
					</h2>
				</div>
				<form className="mt-8" onSubmit={HandleSubmit}>
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
					</div>
					<div className="mt-6 flex items-center justify-between">
						<div className="text-sm leading-5">
							<div className="flex justify-items-auto">
								<input
									type="checkbox"
									className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150 mt-2 flex"
									onChange={(e) => setRemember(!remember)}
									checked={remember}
								/>
								<label className="m-1" onClick={(e) => setRemember(!remember)}>
									Remember me
								</label>
							</div>
							<Link href="/dash/reset-password">
								<a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
									Forgot your password?
								</a>
							</Link>
						</div>
					</div>
					<div className="mt-6">
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
