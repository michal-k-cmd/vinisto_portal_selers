import cx from 'classnames';
import AlertIcon from 'Components/Icons/Alert';
import Container from 'Components/View/Container';
import { getCustomerSupportContact } from 'Hooks/useCustomerSupportContact';

import styles from './styles.module.css';

const B2bPermissionMissingWarning = () => {
	const customerSupport = getCustomerSupportContact('b2b');

	return (
		<Container className="d-flex flex-grow-1 height-100 align-items-center justify-content-center pb-4">
			<div
				className={cx(
					'mb-4 d-flex gap-3 align-items-center py-3 px-4',
					styles.warningContainer
				)}
			>
				<AlertIcon />
				<div className={styles.warningText}>
					<div>Nemáte právo vytvářet B2b objednávky</div>
					<small>
						Pokud se jedná o chybu, kontaktujte prosím{' '}
						<a
							href={`mailto:${customerSupport.email}`}
							className={cx('text-decoration-underline', styles.warningLink)}
						>
							podporu
						</a>
					</small>
				</div>
			</div>
		</Container>
	);
};

export default B2bPermissionMissingWarning;
