import { useContext } from 'react';
import { BasketContext } from 'Services/BasketService';
import Config from 'Config';
import { ModalContext } from 'Components/Modal/context';
import { BASKET_SHARE_MODAL } from 'Components/Modal/constants';

import styles from './styles.module.css';

const BasketShare = () => {
	const { handleOpenModal } = useContext(ModalContext);
	const { basketState } = useContext(BasketContext);
	const items = basketState?.items;
	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin + '/'
			: Config.baseUrl;

	if (!items?.length) return null;

	const shareUrl = new URL(
		`${origin}cartshare?${items
			.map((item) => `bundleIds=${item.itemId}_${item.quantity}`)
			.join('&')}`
	);

	return (
		<div className={styles.share}>
			<button
				className={styles.shareButton}
				onClick={() =>
					handleOpenModal(BASKET_SHARE_MODAL, {
						shareUrl,
					})
				}
			>
				&nbsp;
			</button>
		</div>
	);
};

export default BasketShare;
