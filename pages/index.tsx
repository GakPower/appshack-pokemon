import { getAllPokemon, getBasicPokemon } from '../src/pokeAPI_Utils';
import styles from '../styles/Home.module.scss';
import ListItem from './../src/components/ListItem';
import { useEffect, useState } from 'react';
import Loading from './../src/components/Loading';

const PAGE_SIZE = 10;
let offset = 0;
let pokemonArray: any[] = [];

export default function Home() {
	const [currentPage, setCurrentPage] = useState([]);
	const [currentPageNumber, setCurrentPageNumber] = useState(-1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);
	const [sortingOption, setSortingOption] = useState(false);

	useEffect(() => {
		getAllPokemon().then((data) => {
			if (data.results) {
				const sortedData = (data.results.sort((a: any, b: any) => {
					if (sortingOption) {
						return a.name.localeCompare(b.name);
					} else {
						return b.name.localeCompare(a.name);
					}
				}));
				pokemonArray = sortedData;
				setTotalPages(Math.ceil(data?.count / PAGE_SIZE));
				setCurrentPageNumber(0);
			}
		});
	}, []);

	useEffect(() => {
		setLoading(true);

		offset = PAGE_SIZE * currentPageNumber;
		const newPage = pokemonArray
			.slice(offset, offset + PAGE_SIZE)
			.map(async (pokemon: any) => {
				return await getBasicPokemon(pokemon.name);
			});

		Promise.all(newPage).then((res: any) => {
			setCurrentPage(res);
			setLoading(false);
		});
	}, [currentPageNumber]);

	useEffect(() => {
		setLoading(true);
		const temp = pokemonArray.sort((a: any, b: any) => {
			if (sortingOption) {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		});
		pokemonArray = temp;
		const newPage = temp
			.slice(offset, offset + PAGE_SIZE)
			.map(async (pokemon: any) => {
				return await getBasicPokemon(pokemon.name);
			});

		Promise.all(newPage).then((res: any) => {
			setCurrentPage(res);
			setLoading(false);
		});
	}, [sortingOption]);

	return (
		<>
			<div className={styles.sortingOptions}><button onClick={() => setSortingOption(oldState => !oldState)}>Sort Alphabetically</button>{sortingOption ? 'DEC' : 'ASC'}</div>
			{!loading ? (
				<div className={styles.list}>
					{currentPage.map((pokemon: any) => (<ListItem key={pokemon.name} name={pokemon.name} picture={pokemon.picture} abilities={pokemon.abilities} />))}
				</div>
			) : <Loading />}

			<div className={styles.pageDiv}>
				{
					Array.from({ length: totalPages }, (_, k) => (
						<button key={k} className={currentPageNumber === k ? styles.selected : ''} onClick={() => setCurrentPageNumber(k)}>{k}</button>
					))
				}
			</div>
		</>
	);
}
