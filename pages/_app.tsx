import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main>
			<Head>
				<title>AppShack PokeAPI</title>
				<meta name='description' content='A Front-end application that visualizes PokeAPI' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />

			<div style={{ position: 'fixed', top: 20, left: 20, display: 'flex', alignItems: 'center', border: '2px solid black', borderRadius: '15px', padding: '5px' }}>
				<Image src='/favicon.ico' alt='Pokemon Icon' width={50} height={50} />
				<h2 style={{ fontWeight: 'bold' }}>AppShack <span style={{ color: '#E64C3C' }}>Poke</span>API</h2>
			</div>
		</main>
	);
}
export default MyApp;
