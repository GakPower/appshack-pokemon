/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/ListItem.module.scss';

type PropType = {
	name: string,
	picture: string
	abilities: string[]
}

export default function ListItem({ name, picture, abilities }: PropType) {
	return (
		<div className={styles.container}>
			<img className={styles.picture} src={picture} alt={`Pokemon named ${name}`} />
			<ul>
				<li><strong>{name}</strong></li>
				{abilities.map(ability => <li key={`${name}_${ability}`}>{ability}</li>)}
			</ul>
		</div>
	);
}
