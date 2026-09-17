import { ReactNode } from 'react';

import removeDiacritics from '../../../../Helpers/removeDiacritics';
import { API_URL } from '../../../../Services/constants';

import styles from './style.module.css';

type TBundleProducerProps = {
	flag: ReactNode;
	name: string;
};

const BundleProducer = ({ flag, name }: TBundleProducerProps) => {
	const producerUrl = `${API_URL}/produkty/Vyrobce/${removeDiacritics(
		`${name}`
	)?.replaceAll(' ', '+')}`;

	return (
		<a
			href={producerUrl}
			target="blank"
			className={styles.producerLink}
		>
			{flag}
			<span className={styles.producerName}>{name}</span>
		</a>
	);
};

export default BundleProducer;
