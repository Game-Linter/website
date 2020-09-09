// import '../styles/globals.css';
import '../styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer, Slide } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import axios from 'axios';
import { toast } from 'react-toastify';
import { w3cwebsocket } from 'websocket';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

Sentry.init({
	dsn:
		'https://ae57e74d182f46b8928e1ad3a1f4226c@o337865.ingest.sentry.io/5421685',
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
});

let Client = new w3cwebsocket(
	'wss://api.game-linter.com/socket',
	'echo-protocol',
	'https://api.game-linter.com'
);

Client.onerror = function () {
	console.log('Connection Error');
};

const Notifier = async () => {
	const latestGameTitle = await axios
		.get('https://api.game-linter.com/games', {
			withCredentials: true,
		})
		.then((res) => res.data.resp[0]);
	if (Notification.permission === 'granted') {
		const newNotif = new Notification(
			`New Game! Download ${latestGameTitle.title} free torrent`,
			{
				icon: '/logoalso.png',
				dir: 'auto',
			}
		);
		newNotif.onclick = function (ev) {
			ev.preventDefault();
			window.open(`https://game-linter.com/game/${latestGameTitle.kebabTitle}`);
		};
	}
};
Client.onmessage = function (e) {
	if (typeof e.data === 'string') {
		toast.success('New game added!!');
		setTimeout(() => {
			window.location.href = '/';
		}, 3500);
		Notifier();
	}
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GoogleReCaptchaProvider reCaptchaKey="6LcsfNoUAAAAAPLspEptovhkJMU4-cgZBh4bEPwr">
				<Component {...pageProps} />
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar
					newestOnTop
					closeOnClick
					rtl={false}
					draggable={false}
					pauseOnHover
					transition={Slide}
				/>
			</GoogleReCaptchaProvider>
		</>
	);
}

export default MyApp;
