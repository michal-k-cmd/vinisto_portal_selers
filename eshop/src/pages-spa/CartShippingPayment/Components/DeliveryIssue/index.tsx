'use client';

import WarningIcon from 'Components/Icons/Warning';
import { parseAsString, useQueryState } from 'nuqs';
import { useContext, useEffect } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { OrderContext } from 'Services/OrderService/context';

import styles from './styles.module.css';

const DeliveryIssue = () => {
	const { deliveryMethod } = useContext(OrderContext);
	const [issue, setIssue] = useQueryState(
		'issue',
		parseAsString.withDefault('')
	);
	const t = useContext(LocalizationContext).useFormatMessage();

	useEffect(() => {
		if (deliveryMethod) {
			setIssue('');
		}
	}, [deliveryMethod, setIssue]);

	if (!issue || issue === '') {
		return null;
	}

	return (
		<div className={styles.issueContainer}>
			<WarningIcon className={styles.issueIcon} />

			{issue === 'unavailableMethods' && (
				<p className={styles.issueMessage}>
					{t({
						id: 'cartShippingPayment.deliveryList.issue.unavailableMethods',
					})}
				</p>
			)}
		</div>
	);
};

export default DeliveryIssue;
