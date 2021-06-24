import { useEffect, useState } from 'react';
import { getPokemon } from '../src/pokeAPI_Utils';
import styles from '../styles/Home.module.scss';
import ListItem from './../src/components/ListItem';

export default function Home() {
	const [pokemonArray, setPokemonArray] = useState([]);

	useEffect(() => {
		getPokemon().then((data) => {
			setPokemonArray(data.results);
		});
	}, []);
	return (
		<>
			<div className={styles.list}>
				{pokemonArray.map((pokemon: any) => (<ListItem key={pokemon.name} name={pokemon.name} picture={pokemon.picture} abilities={pokemon.abilities} />))}
			</div>
		</>
	);
}
