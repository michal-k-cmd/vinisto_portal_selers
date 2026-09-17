import { lazy, Suspense, useContext, useRef } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import Loader from 'Components/View/Loader';
import Flag from 'Components/Flag';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';
import modalStyles from 'Components/Modal/styles.module.css';
const CloseIcon = lazy(() => import('Components/Icons/Close'));
const PinpointIcon = lazy(() => import('Components/Icons/Pinpoint'));
const ModalCloseIcon = lazy(
	() => import('Components/Modal/Components/ModalCloseIcon')
);
import { BasketContext } from 'Services/BasketService';

import styles from './styles.module.css';

interface ChangeCurrencyProps {
	setIsOpened: (value: boolean) => void;
	selectedCurrency: VinistoHelperDllEnumsCurrency;
	setSelectedCurrency: (value: VinistoHelperDllEnumsCurrency) => void;
}

const ChangeCurrency = ({
	setIsOpened,
	selectedCurrency,
	setSelectedCurrency,
}: ChangeCurrencyProps) => {
	const { handleShowSuccessNotification } = useContext(NotificationsContext);
	const { isDesktop } = useContext(DeviceServiceContext);
	const { useFormatMessage, setCurrency } = useContext(LocalizationContext);
	const { toggleCountryOfSaleAndCurrency } = useContext(BasketContext);
	const t = useFormatMessage();

	const closeChangeCurrency = () => {
		setIsOpened(false);
	};

	const handleSaveCurrency = (currency?: VinistoHelperDllEnumsCurrency) => {
		toggleCountryOfSaleAndCurrency({
			currency: currency ?? selectedCurrency,
		});
		setCurrency(currency ?? selectedCurrency);
		handleShowSuccessNotification('modal.currency.success');
		closeChangeCurrency();
	};

	const changeCurrencyRef = useRef(null);

	useOnClickOutside([changeCurrencyRef], closeChangeCurrency);

	return (
		<div
			ref={changeCurrencyRef}
			className={styles.changeCurrencyWrap}
		>
			<div className={styles.headingWrap}>
				<h2 className={styles.heading}>
					<Suspense fallback={<Loader blank />}>
						<PinpointIcon className="me-3" />
					</Suspense>
					{t({ id: 'modal.currency.modalTitle' })}
				</h2>
				<button
					type="button"
					className={styles.close}
					onClick={closeChangeCurrency}
				>
					<Suspense fallback={<Loader blank />}>
						<ModalCloseIcon />
					</Suspense>
				</button>
			</div>
			<div className={styles.changeCurrency}>
				<div className={styles.title}>{t({ id: 'modal.currency.title' })}</div>
				<div className={styles.subtitle}>
					{t({ id: 'modal.currency.text' })}
				</div>
				<div className={styles.radioWrapper}>
					<div className={styles.radio}>
						<input
							className={styles.radioInput}
							id="CZK"
							type="radio"
							checked={selectedCurrency === VinistoHelperDllEnumsCurrency.CZK}
							readOnly
							onClick={() => {
								setSelectedCurrency(VinistoHelperDllEnumsCurrency.CZK);
								if (isDesktop)
									handleSaveCurrency(VinistoHelperDllEnumsCurrency.CZK);
							}}
						/>
						<button
							className={styles.radioSpan}
							onClick={() => {
								setSelectedCurrency(VinistoHelperDllEnumsCurrency.CZK);
								if (isDesktop)
									handleSaveCurrency(VinistoHelperDllEnumsCurrency.CZK);
							}}
						></button>
						<label
							htmlFor="CZK"
							className="m-0"
						>
							<Flag
								code={'cz'}
								width={26}
								height={19}
								className={cx('vinisto-flag', styles.flag)}
							/>
							{t({ id: 'modal.currency.czk' })}
						</label>
					</div>
					<div className={styles.radio}>
						<input
							className={styles.radioInput}
							id="EUR"
							type="radio"
							checked={selectedCurrency === VinistoHelperDllEnumsCurrency.EUR}
							readOnly
							onClick={() => {
								setSelectedCurrency(VinistoHelperDllEnumsCurrency.EUR);
								if (isDesktop)
									handleSaveCurrency(VinistoHelperDllEnumsCurrency.EUR);
							}}
						/>
						<button
							className={styles.radioSpan}
							onClick={() => {
								setSelectedCurrency(VinistoHelperDllEnumsCurrency.EUR);
								if (isDesktop)
									handleSaveCurrency(VinistoHelperDllEnumsCurrency.EUR);
							}}
						></button>
						<label
							htmlFor="EUR"
							className="m-0"
						>
							<Flag
								code={'svk'}
								width={26}
								height={19}
								className={cx('vinisto-flag', styles.flag)}
							/>
							{t({ id: 'modal.currency.eur' })}
						</label>
					</div>
				</div>
			</div>
			<div>
				<div className={cx(modalStyles.footer, styles.footer)}>
					<button
						type="button"
						className={cx(modalStyles.deleteButton, 'vinisto-btn')}
						onClick={closeChangeCurrency}
					>
						<Suspense fallback={<Loader blank />}>
							<CloseIcon
								alt={`${t({
									id: 'addAddressForm.resetButton.alt',
								})}`}
								className={modalStyles.closeIcon}
							/>
						</Suspense>
						{t({ id: 'addAddressForm.resetButton' })}
					</button>
					<button
						type="submit"
						className={cx(
							modalStyles.saveButton,
							'vinisto-btn vinisto-bg-darker-gray'
						)}
						onClick={() => handleSaveCurrency()}
					>
						{t({ id: 'addAddressForm.submitButton' })}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangeCurrency;
