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

			<div style={{ display: 'flex', alignItems: 'center', border: '2px solid black', borderRadius: '15px', padding: '5px', margin: '20px' }}>
				<Image src='/favicon.ico' alt='Pokemon Icon' width={50} height={50} />
				<h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>AppShack <span style={{ color: '#E64C3C' }}>Poke</span>API</h2>
			</div>

			<Component {...pageProps} />
		</main>
	);
}
export default MyApp;
