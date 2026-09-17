import { useContext, useRef } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import ListItemDelete from 'Components/Icons/ListItemDelete';
import useOnClickOutside from 'Hooks/useOnClickOutside';

import styles from '../../BasketItem/ActionsList/styles.module.css';

import { BasketAddon } from '@/api-types/basket-api';

interface actionsListProps {
	isActionsOpen: boolean;
	closeActions: () => void;
	item: BasketAddon;
}

const ActionsList = ({ isActionsOpen, closeActions }: actionsListProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const { handleSelectSubscription } = useContext(BasketContext);

	const actionsListRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside([actionsListRef], () => closeActions());

	return isActionsOpen ? (
		<div className={styles.actionsList}>
			<button
				className={styles.actionItem}
				onClick={() => {
					handleSelectSubscription({ subscription: null });
					closeActions();
				}}
			>
				<div className={styles.iconWrap}>
					<ListItemDelete className={styles.delete} />
				</div>
				{t({ id: 'basketItem.actions.removeItem' })}
			</button>
		</div>
	) : null;
};

export default ActionsList;
