/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/ListItem.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

type DataType = {
	name: string,
	picture: string,
	abilities: string[],
	stats?: { [spec: string]: number },
	weight?: number,
	species?: number
}

export default function ListItem({ data, clickable }: { data: DataType, clickable?: boolean }) {
	const router = useRouter();
	const { name, picture, abilities, stats, weight, species } = data;
	return (
		<div className={`${styles.container} ${clickable && styles.clickable}`} onClick={() => clickable && router.push(`/${name}`)}>
			<img className={styles.picture} src={picture} alt={`Pokemon named ${name}`} />
			<ul>
				<li><span><strong>{name}</strong></span></li>
				<li><strong>Abilities:</strong></li>
				{abilities.map(ability => <li key={`${name}_${ability}`}>{ability}</li>)}
				{stats && (
					<>
						<li><strong>Specs:</strong></li>
						{Object.entries(stats).map((spec => <li key={`${name}_${spec[0]}`}>{`${spec[0]} => ${spec[1]}`}</li>))}
					</>
				)}
				{weight && <li><strong>Weight:</strong> {weight}</li>}
				{species && <li><strong>Species:</strong> {species}</li>}

			</ul>
		</div>
	);
}
