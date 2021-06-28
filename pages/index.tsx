import { getAllPokemon, getBasicPokemon } from '../src/pokeAPI_Utils';
import styles from '../styles/Home.module.scss';
import ListItem from './../src/components/ListItem';
import { useEffect, useState } from 'react';
import Loading from './../src/components/Loading';
import { BasicPokemon } from '../src/types';
import Sorter from '../src/components/Sorter';
import PageSelectionBar from '../src/components/PageSelectionBar';
import SearchBar from '../src/components/SearchBar';

const PAGE_SIZE = 10;
let offset = 0;
let pokemonArray: { name: string }[] = [];

export default function Home() {
	const [currentPage, setCurrentPage] = useState<BasicPokemon[]>([]);
	const [currentPageNumber, setCurrentPageNumber] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);
	const [sortingOption, setSortingOption] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		getAllPokemon().then((data) => {
			if (data.length) {
				setLoading(true);

				pokemonArray = data;
				pokemonArray = getSortedPokemon(true);
				setTotalPages(Math.ceil(data.length / PAGE_SIZE));
				updateCurrentPage();
			}
		});
	}, []);

	useEffect(() => {
		setLoading(true);

		offset = PAGE_SIZE * currentPageNumber;
		updateCurrentPage();
	}, [currentPageNumber]);

	useEffect(() => {
		setLoading(true);

		pokemonArray = getSortedPokemon(sortingOption);
		updateCurrentPage();
	}, [sortingOption]);

	useEffect(() => {
		if (searchValue) {
			setLoading(true);
			const newPage = pokemonArray
				.filter((element) => element.name.match(searchValue))
				.slice(0, PAGE_SIZE)
				.map(async (pokemon) => {
					return await getBasicPokemon(pokemon.name);
				});

			Promise.all(newPage).then((res) => {
				setCurrentPage(res);

				setLoading(false);
			});
		} else {
			setLoading(true);

			updateCurrentPage();
		}
	}, [searchValue]);

	const getSortedPokemon = (option: boolean) => {
		return pokemonArray.sort((a, b) => {
			if (option) {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		});
	};

	const updateCurrentPage = () => {
		const newPage = pokemonArray
			.slice(offset, offset + PAGE_SIZE)
			.map(async (pokemon) => {
				return await getBasicPokemon(pokemon.name);
			});

		Promise.all(newPage).then((res) => {
			setCurrentPage(res);

			setLoading(false);
		});
	};

	return (
		<>
			{loading ? <Loading /> : (
				<>
					{searchValue && !currentPage.length && !loading && <strong>There are no results</strong>}
					<SearchBar value={searchValue} onChange={setSearchValue} />
					<div className={styles.list}>
						{currentPage.map((pokemon) => (<ListItem key={pokemon.name} data={pokemon} clickable />))}
					</div>
					<Sorter value={sortingOption} onChange={(isASC) => setSortingOption(isASC)} loading={!pokemonArray} />
					{!searchValue && <PageSelectionBar totalPages={totalPages} pageNumber={currentPageNumber} onChange={(pageNumber) => setCurrentPageNumber(pageNumber)} />}
				</>
			)}
		</>
	);
}
