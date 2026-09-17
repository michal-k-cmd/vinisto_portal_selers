import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';

import styles from './styles.module.css';

interface ReviewProps {
	text: string | null;
}

const Review = ({ text }: ReviewProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<div className={styles.review}>
			<h2 className={userSectionStyles.userSectionHeader}>
				{t({ id: 'userSection.boughtProduct.review' })}
			</h2>
			<p className={styles.text}>{text}</p>
		</div>
	);
};

export default Review;
