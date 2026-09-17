import { useContext } from 'react';
import { isEmpty, isNull } from 'lodash-es';
import useTodayTomorrowDate from 'Hooks/useTodayTomorrowDate/useTodayTomorrowDate';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';
import { StockAvailabilityProps } from './interfaces';

const StockAvailability = ({
	availableQuantity,
	deliveryDate,
	fallback = null,
	isTemporaryUnavailable = false,
	isSaleOver = false,
	isIntangible = false,
}: StockAvailabilityProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const getDateLabel = useTodayTomorrowDate();

	if (isSaleOver) {
		return (
			<span className={styles.isSaleOver}>
				{t({
					id: 'bundleAvailability.saleOver',
				})}
			</span>
		);
	}

	if (isTemporaryUnavailable)
		return (
			<span className={styles.isTemporaryUnavailable}>
				{t({
					id: 'bundle.temporaryUnavailable',
				})}
			</span>
		);

	if (isNull(availableQuantity) || isEmpty(availableQuantity)) return fallback;

	const isAvailable = availableQuantity.some((count) => count > 0);

	return isAvailable ? (
		<span className={styles.isAvailable}>
			<span className="fw-bolder">
				{t({
					id: 'bundleAvailability.available',
				})}
			</span>

			{isIntangible
				? `, ${t({ id: 'bundleAvailability.immediately' })}`
				: deliveryDate !== undefined
				? `, ${t(
						{ id: 'bundleAvailability.availableDeliveryDate' },
						{ day: `${getDateLabel(deliveryDate)}` }
				  )}`
				: null}
		</span>
	) : (
		<span className={styles.isTemporaryUnavailable}>
			{t({
				id: 'bundleAvailability.outOfStock',
			})}
		</span>
	);
};

export default StockAvailability;
