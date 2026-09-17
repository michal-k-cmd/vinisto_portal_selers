import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

const PlatformMismatchModal = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOnLogOut } = useContext(AuthenticationContext);
	const isB2b = useIsB2b();

	const targetUri = isB2b
		? process.env.NEXT_PUBLIC_BASE_URI
		: process.env.NEXT_PUBLIC_B2B_URI;

	return (
		<div className={styles.modal}>
			<p className={styles.text}>
				{t({
					id: isB2b
						? 'modal.platformMismatch.b2b.description'
						: 'modal.platformMismatch.b2c.description',
				})}
			</p>
			<a
				href={targetUri}
				className={styles.primaryAction}
			>
				{t({ id: 'modal.platformMismatch.continue' })}
			</a>
			<button
				type="button"
				onClick={handleOnLogOut}
				className={styles.secondaryAction}
			>
				{t({ id: 'modal.platformMismatch.logOut' })}
			</button>
		</div>
	);
};

export default PlatformMismatchModal;
