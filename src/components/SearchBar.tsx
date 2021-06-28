import { useState } from 'react';
import styles from '../../styles/SearchBar.module.scss';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

type PropType = {
	value: string,
	onChange: (value: string) => void
}

export default function Loading({ value, onChange }: PropType) {
	const [state, setState] = useState(value);
	return (
		<div className={styles.container}>
			{state && <button onClick={() => { onChange(''); setState(''); }}><AiOutlineClose /></button>}
			<input value={state} onChange={(e) => setState(e.target.value)} placeholder='Search' onKeyPress={(e) => e.key === 'Enter' && onChange(state)} />
			<button onClick={() => onChange(state)}><AiOutlineSearch /></button>
		</div>
	);
}
