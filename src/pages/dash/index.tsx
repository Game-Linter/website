import { useState, FormEvent } from 'react';
import axios from 'axios';
import qs from 'querystring';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Form from '../../components/Form';
import fetch from 'isomorphic-unfetch';
import LoginForm from '../../components/loginForm';
import { useSnackbar } from 'notistack';
import { showErrors } from '../../actions/show-errors.action';

export const getServerSideProps: GetServerSideProps = async (context) => {
	// delete context.req.headers.accept;
	// console.log(context.req.headers);
	const { currentUser } = await axios
		.get('https://api.game-linter.com/api/v1/currentuser', {
			headers: {
				cookie: context.req.headers.cookie || '',
			},
		})
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});

	// console.log(currentUser);

	const isLogged = !(currentUser === null);

	if (isLogged) {
		return {
			props: {
				isLogged,
				name: currentUser.username as string,
			}, // will be passed to the page component as props
		};
	} else {
		return {
			props: {
				isLogged,
				name: '' as string,
			}, // will be passed to the page component as props
		};
	}
};

function Login({
	isLogged,
	name,
}): InferGetServerSidePropsType<typeof getServerSideProps> {
	// console.log(isLogged, name);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const HandleSubmit: (event: FormEvent<HTMLFormElement>) => void = () => {
		event.preventDefault();
		axios
			.post('https://api.game-linter.com/api/v1/signin', {
				username: email,
				password,
			})
			.then((res) => {
				console.log(res.data);
				enqueueSnackbar('Welcome Back!', {
					variant: 'success',
				});
				setTimeout(() => {
					window.location.reload();
					// window.location.href = '/dash';
				}, 1200);
			})
			.catch((err) => {
				// showErrors(err, enqueueSnackbar);
				err.response.data.errors.map((error: { message: string }) => {
					enqueueSnackbar(error.message, {
						variant: 'warning',
					});
				});
			});
	};

	return (
		<Layout>
			{isLogged ? (
				<Form name={name} />
			) : (
				<LoginForm
					HandleSubmit={HandleSubmit}
					email={email}
					password={password}
					setEmail={setEmail}
					setPassword={setPassword}
				/>
			)}
		</Layout>
	);
}

export default Login;
