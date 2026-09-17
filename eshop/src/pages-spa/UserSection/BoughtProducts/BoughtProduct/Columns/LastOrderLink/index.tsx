import { useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';
import { LastOrderLinkProps } from './interface';

const LastOrderLink = ({ order, className }: LastOrderLinkProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	if (!order) return;

	return (
		<div className={className}>
			<Link
				href={`/${t({ id: 'routes.user-section.route' })}/${t({
					id: 'routes.user-section.orders.route',
				})}?id=${order.order_id}`}
				className={styles.orderLink}
			>
				{t({ id: 'userSection.order.title' }, { value: order.order_number })}
			</Link>
		</div>
	);
};

export default LastOrderLink;
