import { Link } from 'react-alice-carousel';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsOrderOrderState } from '@/api-types/product-api';
import { VinistoOrderDllModelsApiOrderOrder } from '@/api-types/order-api';

interface ContractWithdrawLinkProps {
	order: VinistoOrderDllModelsApiOrderOrder;
}

const ContractWithdrawLink = ({ order }: ContractWithdrawLinkProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const orderDeliveryRecord = order.stateChangeRecords.find(
		(record) => record.state === VinistoHelperDllEnumsOrderOrderState.DELIVERED
	);

	const orderDeliveryTime = orderDeliveryRecord?.changeTime
		? dayjs(orderDeliveryRecord.changeTime)
		: null;
	const now = dayjs();

	const isOrderDeliveredNoMoreThan15daysAgo =
		!!orderDeliveryRecord &&
		orderDeliveryTime &&
		now.diff(orderDeliveryTime, 'day') <= 15;

	if (!isOrderDeliveredNoMoreThan15daysAgo) return null;

	return (
		<Link
			href={`/odstoupeni-od-smlouvy?oid=${order.id}`}
			className={styles.contractWithdrawLink}
		>
			{t({ id: 'contractWithdraw.link.label' })}
		</Link>
	);
};

export default ContractWithdrawLink;
