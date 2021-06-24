import { getPokemon } from '../src/pokeAPI_Utils';
import styles from '../styles/Home.module.scss';
import ListItem from './../src/components/ListItem';
import { useEffect, useState } from 'react';

export default function Home() {
	const [pokemonArray, setPokemonArray] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		getPokemon(currentPage).then((data) => {
			setPokemonArray(data.results);
			setTotalPages(data.count / 10);
		});
	}, [currentPage]);
	return (
		<>
			<div className={styles.list}>
				{pokemonArray.map((pokemon: any) => (<ListItem key={pokemon.name} name={pokemon.name} picture={pokemon.picture} abilities={pokemon.abilities} />))}
			</div>
			<div className={styles.pageDiv}>
				{
					Array.from({ length: totalPages }, (_, k) => (
						<button onClick={() => setCurrentPage(k)}>{k}</button>
					))
				}
			</div>
		</>
	);
}
