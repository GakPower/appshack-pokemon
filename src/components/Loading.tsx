/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/Loading.module.scss';

export default function Loading() {
	return (
		<div className={styles.container}>
			<img src={'/favicon.ico'} alt='Loading icon'/>
		</div>
	);
}
