import { useState, FormEvent } from 'react';
import axios from 'axios';
import qs from 'querystring';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import { InferGetServerSidePropsType } from 'next';
import Form from '../../components/Form';
import fetch from 'isomorphic-unfetch';
import LoginForm from '../../components/loginForm';
import { FormHelperText } from '@material-ui/core';

export const getServerSideProps = async () => {
	let name: string | null = null;
	const res = await fetch('https://api.game-linter.com/dashboard', {
		headers: {
			referer: 'https://game-linter.com/',
		},
	});
	const isLogged: boolean = await res.json().then((res) => res.isLogged);

	// if (isLogged) {
	// 	const res = await fetch('https://api.game-linter.com/user', {
	// 		headers: {
	// 			referer: 'https://game-linter.com/',
	// 		},
	// 	});
	// 	name = await res.json().then((res) => res.data.name as string);
	// }

	return {
		props: {
			isLogged,
			name: name,
		},
	};
};

const Login = ({
	isLogged,
	name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const HandleSubmit: (event: FormEvent<HTMLFormElement>) => void = () => {
		event.preventDefault();
		axios
			.post(
				'https://api.game-linter.com/login',
				qs.stringify({
					username: email,
					password,
				}),
				{
					withCredentials: true,
				}
			)
			.then(
				(res) => {
					console.log(res.data);
					toast.success('Welcome Back!');
				},
				(rej) => {
					if (rej) {
						console.log(rej);
						toast.warn('Wrong Email/Password');
					}
				}
			);
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
};

export default Login;
