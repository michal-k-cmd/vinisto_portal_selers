import Skeleton from 'react-loading-skeleton';

import { LetterBoxProps } from './interfaces';
import styles from './styles.module.css';

const LetterBox = ({ children, href, isLoading }: LetterBoxProps) => {
	return isLoading ? (
		<Skeleton className={styles.skeleton} />
	) : (
		<a
			href={href}
			className={styles.wrapper}
		>
			{children}
		</a>
	);
};

export default LetterBox;
