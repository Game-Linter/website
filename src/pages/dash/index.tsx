import { useState, FormEvent } from 'react';
import axios from 'axios';
import qs from 'querystring';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import { InferGetServerSidePropsType } from 'next';
import Form from '../../components/Form';
import fetch from 'isomorphic-unfetch';
import LoginForm from '../../components/loginForm';

export const getServerSideProps = async ({ req }) => {
	let name: string | null = null;

	try {
		const res = await axios.get(
			'https://api.game-linter.com/api/v1/currentuser',
			{
				headers: req.headers,
			}
		);
		console.log(res);
		console.log(res.data);
		let isLogged = res.data.currentUser !== null;
		name = await res.data.name;

		return {
			props: {
				isLogged,
				name,
			},
		};
	} catch (error) {
		console.log(error);
	}
};

const Login = ({ isLogged, name }: any) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const HandleSubmit: (event: FormEvent<HTMLFormElement>) => void = () => {
		event.preventDefault();
		axios
			.post('https://api.game-linter.com/api/v1/signin', {
				username: email,
				password,
			})
			.then(
				(res) => {
					console.log(res.data);
					toast.success('Welcome Back!');
					window.location.reload();
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
