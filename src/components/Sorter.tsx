import { useState } from 'react';
import styles from '../../styles/Sorter.module.scss';
import { IoIosArrowDown } from 'react-icons/io';

type PropType = {
	value: boolean,
	onChange: (isASC: boolean) => void,
	loading: boolean
}

export default function Sorter({ value, onChange, loading }: PropType) {
	const options = [
		'A - Z',
		'Z - A',
	];
	const [openSorter, setOpenSorter] = useState(false);
	const [selectedSorter, setSelectedSorter] = useState<string>(value ? options[0] : options[1]);
	return (
		<div
			className={`${styles.sorter} ${openSorter && styles.open} ${loading && styles.loading}`}
			onClick={() => setOpenSorter((oldState) => !oldState)}
		>
			{options
				.filter((element) => element !== selectedSorter)
				.map((element) => {
					return (
						<div
							key={element}
							onClick={() => {
								onChange(selectedSorter !== options[0]);
								setSelectedSorter(element);
							}}
						>
							{element}
						</div>
					);
				})}
			<div>
				{selectedSorter}
				<IoIosArrowDown />
			</div>
		</div>
	);
}
