import { useState, FormEvent } from 'react';
import axios from 'axios';
import qs from 'querystring';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Form from '../../components/Form';
import fetch from 'isomorphic-unfetch';
import LoginForm from '../../components/loginForm';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const data = await axios
		.get('https://api.game-linter.com/api/v1/currentuser')
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});

		console.log(data);

	// const isLogged = !(currentUser === null);

	// if (isLogged) {
	// 	return {
	// 		props: {
	// 			isLogged,
	// 			name: currentUser.username as string,
	// 		}, // will be passed to the page component as props
	// 	};
	// } else {
		return {
			props: {
				isLogged : true,
				name: '' as string,
			}, // will be passed to the page component as props
		};
	// }
};

function Login({
	isLogged,
	name,
}): InferGetServerSidePropsType<typeof getServerSideProps> {
	console.log(isLogged, name);
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
					// window.location.reload();
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
}

export default Login;
