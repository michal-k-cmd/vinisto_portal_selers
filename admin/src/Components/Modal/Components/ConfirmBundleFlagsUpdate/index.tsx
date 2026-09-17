import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { CButton } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import BundleService from 'Services/Bundle';
import { IS_GIFT, TEMPORARY_UNAVAILABLE } from 'Constants/flags';
import { type Flag } from 'Pages/BundleDetail/helpers';

import { ConfirmBundleFlagsUpdateModalData } from './interfaces';
import styles from './styles.module.css';

const ConfirmBundleFlagsUpdateModal = () => {
	const localizationContext = useContext(LocalizationContext);
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const {
		vinistoUser: { loginHash },
	} = useContext(AuthenticationContext);
	const { data, handleCloseModal } = useContext(ModalContext);
	const t = localizationContext.useFormatMessage();

	const {
		desiredFlag,
		desiredState,
		incompatibleFlags,
		bundleId,
		refetchBundleDetail,
	} = data as ConfirmBundleFlagsUpdateModalData;

	const translationMap = {
		[TEMPORARY_UNAVAILABLE]: t({
			id: 'admin.bundleDetail.temporaryUnavailable.label',
		}),
		[IS_GIFT]: t({ id: 'admin.bundleDetail.isGift.label' }),
	};

	const incompatiblesToTuples = incompatibleFlags.map(
		(flag) => [flag, !desiredState] as const
	);

	const compatibleState = [
		...incompatiblesToTuples,
		[desiredFlag, desiredState] as const,
	];

	const updateBundle = (flag: Flag, desiredState: boolean) => {
		if (flag === TEMPORARY_UNAVAILABLE) {
			return BundleService.setIsBundleTemporaryUnavailable({
				desiredState,
				bundleId,
				userLoginHash: loginHash,
			});
		}

		if (flag === IS_GIFT) {
			return BundleService.setIsBundleGift({
				desiredState,
				bundleId,
				userLoginHash: loginHash,
			});
		}
	};

	const handleConfirm = async () => {
		for (const [flag, state] of compatibleState) {
			await updateBundle(flag, state);
		}
	};

	return (
		<div>
			<div>
				{t(
					{ id: 'admin.modal.confirmBundleFlagsUpdate.message' },
					{
						flag: (
							<span className={styles.enhanced_text}>
								{translationMap[desiredFlag]}
							</span>
						),
						list: (
							<ul className={styles.list}>
								{(incompatibleFlags ?? []).map((flag) => (
									<li key={flag}>
										<span className={styles.enhanced_text}>
											{translationMap[flag]}
										</span>{' '}
										– {t({ id: 'admin.yes' })}
									</li>
								))}
							</ul>
						),
					}
				)}
			</div>
			<div className={styles.button_container}>
				<CButton
					onClick={() =>
						handleConfirm()
							.then(() => {
								handleShowSuccessNotification('admin.batchUpdateFlags.success');
								refetchBundleDetail();
							})
							.catch(() => {
								handleShowErrorNotification('admin.batchUpdateFlags.error');
							})
							.finally(() => {
								handleCloseModal();
							})
					}
				>
					{t({ id: 'admin.modal.confirmBundleFlagsUpdate.cta.label' })}
				</CButton>
			</div>
		</div>
	);
};

export default ConfirmBundleFlagsUpdateModal;
