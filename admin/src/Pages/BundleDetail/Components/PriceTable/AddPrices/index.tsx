import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { CButton } from '@coreui/react';
import { FaMoneyBillAlt } from 'react-icons/fa';

import styles from './styles.module.css';
import { AddPricesProps } from './interfaces';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

const AddPrices = ({
	disabled,
	addBundlePriceFunction,
	addBundleDiscountPriceFunction,
	bundlePrices,
}: AddPricesProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.addPriceButtons}>
			<CButton
				color="primary"
				onClick={() => addBundlePriceFunction(false)}
				className={cx('px-3 admin-action-button', styles.addPriceButton)}
				type="button"
				disabled={disabled}
			>
				<FaMoneyBillAlt className="action-button-icon" />

				{t({ id: 'admin.btn.addPriceToBundle' })}
			</CButton>
			<CButton
				color="primary"
				onClick={() => addBundleDiscountPriceFunction(false)}
				className={cx('px-3 admin-action-button', styles.addPriceButton)}
				type="button"
				disabled={disabled}
			>
				<FaMoneyBillAlt className="action-button-icon" />

				{t({ id: 'admin.btn.addDiscountPriceToBundle' })}
			</CButton>
			<CButton
				color="primary"
				onClick={() => addBundlePriceFunction(true)}
				className={cx('px-3 admin-action-button', styles.addPriceButton)}
				type="button"
				disabled={disabled}
			>
				{t({ id: 'admin.btn.addVinistoPlusPriceToBundle' })}
			</CButton>
			<CButton
				color="primary"
				onClick={() => addBundleDiscountPriceFunction(true)}
				className={cx('px-3 admin-action-button', styles.addPriceButton)}
				type="button"
				disabled={
					disabled ||
					!bundlePrices.some(
						(price) =>
							price.priceType === VinistoHelperDllEnumsPriceLevel.VinistoPlus
					)
				}
			>
				{t({ id: 'admin.btn.addVinistoPlusDiscountPriceToBundle' })}
			</CButton>
		</div>
	);
};

export default AddPrices;
