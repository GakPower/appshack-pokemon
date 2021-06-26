import { getFullPokemon } from '../src/pokeAPI_Utils';
import { useEffect, useState } from 'react';
import Loading from './../src/components/Loading';
import { useRouter } from 'next/dist/client/router';
import ListItem from '../src/components/ListItem';

export default function Pokemon() {
	const router = useRouter();
	const { name } = router.query;
	const [pokemon, setPokemon] = useState<any>({});

	useEffect(() => {
		if (name) {
			getFullPokemon(name as string).then((res: any) => {
				console.log(res);

				setPokemon(res);
			});
		}
	}, [name]);
	return (
		<>
			{pokemon.name ? <ListItem data={pokemon} /> : <Loading />}
		</>
	);
}
