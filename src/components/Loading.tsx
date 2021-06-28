import Image from 'next/image';
import styles from '../../styles/Loading.module.scss';

export default function Loading() {
	return (
		<div className={styles.container}>
			<Image src={'/favicon.ico'} alt='Loading icon' width={70} height={70} />
		</div>
	);
}
