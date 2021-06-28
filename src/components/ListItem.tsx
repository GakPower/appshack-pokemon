import styles from '../../styles/ListItem.module.scss';
import { useRouter } from 'next/dist/client/router';
import { FlexiblePokemon } from '../types';
import Image from 'next/image';

export default function ListItem({ data, clickable }: { data: FlexiblePokemon, clickable?: boolean }) {
	const router = useRouter();
	const { name, picture, abilities, stats, weight, species } = data;
	return (
		<div className={`${styles.container} ${clickable && styles.clickable}`} onClick={() => clickable && router.push(`/${name}`)}>
			<div>
				<Image src={picture} alt={`Pokemon named ${name}`} width={200} height={200} />
				<h1>{name}</h1>
				{stats && species}
			</div>
			<div>
				<strong>Abilities</strong>
				{abilities.map(ability => <span key={`${name}_${ability}`}>{ability}</span>)}
				{stats && (
					<>
						<strong>Details</strong>
						{Object.entries(stats).map((spec => <div key={`${name}_${spec[0]}`}>{spec[0]}:<span>{spec[1]}</span></div>))}
					</>
				)}
				{weight && <div key={`${name}_weight`}>weight:<span>{weight}</span></div>}
			</div>
		</div>
	);
}
