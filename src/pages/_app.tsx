// import '../styles/globals.css';
import '../styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer, Slide } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
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
		</>
	);
}

export default MyApp;
