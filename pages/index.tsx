import { getAllPokemon, getPokemon } from '../src/pokeAPI_Utils';
import styles from '../styles/Home.module.scss';
import ListItem from './../src/components/ListItem';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 10;
let pokemonArray: any[] = [];

export default function Home() {
	const [currentPage, setCurrentPage] = useState([]);
	const [currentPageNumber, setCurrentPageNumber] = useState<number>(-1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		getAllPokemon().then((data) => {
			pokemonArray = data?.results;
			setTotalPages(Math.ceil(data?.count / PAGE_SIZE));
			setCurrentPageNumber(0);
		});
	}, []);

	useEffect(() => {
		if (currentPageNumber >= 0) {
			const offset = PAGE_SIZE * currentPageNumber;
			const newPage = pokemonArray
				.slice(offset, offset + PAGE_SIZE)
				.map(async (pokemon: any) => {
					return await getPokemon(pokemon.name);
				});

			Promise.all(newPage).then((res: any) => {
				setCurrentPage(res);
			});
		}
	}, [currentPageNumber]);

	return (
		<>
			<div className={styles.list}>
				{currentPage.map((pokemon: any) => (<ListItem key={pokemon.name} name={pokemon.name} picture={pokemon.picture} abilities={pokemon.abilities} />))}
			</div>
			<div className={styles.pageDiv}>
				{
					Array.from({ length: totalPages }, (_, k) => (
						<button key={k} onClick={() => setCurrentPageNumber(k)}>{k}</button>
					))
				}
			</div>
		</>
	);
}
