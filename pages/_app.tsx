import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main>
			<Head>
				<title>AppShack PokeAPI Visualization</title>
				<meta name='description' content='A Front-end application that visualizes PokeAPI' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />
		</main>
	);
}
export default MyApp;
