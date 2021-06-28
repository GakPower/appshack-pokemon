import { getFullPokemon } from '../src/pokeAPI_Utils';
import { useEffect, useState } from 'react';
import Loading from './../src/components/Loading';
import { useRouter } from 'next/dist/client/router';
import ListItem from '../src/components/ListItem';
import { FullPokemon } from '../src/types';
import Head from 'next/head';

export default function Pokemon() {
	const router = useRouter();
	const { name } = router.query;
	const [pokemon, setPokemon] = useState<FullPokemon>();

	useEffect(() => {
		if (name) {
			getFullPokemon(name as string).then((res: FullPokemon) => {
				setPokemon(res);
			});
		}
	}, [name]);

	const getCapitalizedString = (str: string) => {
		return str.replace(/^\w/, (c) => c.toUpperCase());
	};
	return (
		<>
			<Head>
				{name && <title>Pokemon: {getCapitalizedString(name as string)}</title>}
			</Head>
			{pokemon ? <ListItem data={pokemon} /> : <Loading />}
		</>
	);
}
