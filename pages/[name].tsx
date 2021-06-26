import { getFullPokemon } from '../src/pokeAPI_Utils';
import { useEffect, useState } from 'react';
import Loading from './../src/components/Loading';
import { useRouter } from 'next/dist/client/router';
import ListItem from '../src/components/ListItem';
import { FullPokemon } from '../src/types';

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
	return (
		<>
			{pokemon ? <ListItem data={pokemon} /> : <Loading />}
		</>
	);
}
