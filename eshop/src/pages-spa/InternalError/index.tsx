import { FC } from 'react';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import Card from 'Components/View/Card';

import styles from './styles.module.css';

const InternalError: FC = () => {
	return (
		<section id="content-wrapper">
			<ContainerFullWidth>
				<Card className={styles.errorCard}>
					<div className={styles.errorTitle}>
						Omlouváme se, něco se pokazilo ..
					</div>
					<div className={styles.errorText}>
						.. zkuste prosím stránku{' '}
						<span className={styles.errorLink}>obnovit</span>, nebo jít na{' '}
						<span className={styles.errorLink}>úvodní stránku &gt;</span>
					</div>
				</Card>
			</ContainerFullWidth>
		</section>
	);
};

export default InternalError;
