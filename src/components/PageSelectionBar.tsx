import styles from '../../styles/PageSelectionBar.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { useEffect, useState } from 'react';

type PropType = {
	totalPages: number,
	pageNumber: number,
	onChange: (pageNumber: number) => void
}

export default function PageSelectionBar({ totalPages, pageNumber, onChange }: PropType) {
	const [numbersDisplayed, setNumbersDisplayed] = useState<number[]>([]);

	useEffect(() => {
		const array = [];
		for (let i = pageNumber - 3; i <= pageNumber + 3; i++) {
			if (i >= 0 && i < totalPages) {
				array.push(i);
			}
		}

		setNumbersDisplayed(array);
	}, [pageNumber, totalPages]);

	const updatePageNumber = (newNumber: number) => {
		if (newNumber >= 0 && newNumber < totalPages) {
			onChange(newNumber);
		}
	};

	return (
		<div className={styles.container}>
			<button className={styles.prev} onClick={() => updatePageNumber(0)}><IoIosArrowDown /><IoIosArrowDown /></button>
			<button className={styles.prev} onClick={() => updatePageNumber(pageNumber - 1)}><IoIosArrowDown /></button>
			{
				numbersDisplayed.map((n) => (
					<button key={n} className={pageNumber === n ? styles.selected : ''} onClick={() =>
						updatePageNumber(n)
					}>{n}</button>
				))
			}
			<button className={styles.next} onClick={() => updatePageNumber(pageNumber + 1)}><IoIosArrowDown /></button>
			<button className={styles.next} onClick={() => updatePageNumber(totalPages - 1)}><IoIosArrowDown /><IoIosArrowDown /></button>
		</div >
	);
}
