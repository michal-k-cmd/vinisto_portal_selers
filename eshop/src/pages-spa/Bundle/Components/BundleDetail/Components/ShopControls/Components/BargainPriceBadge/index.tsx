import HexagonIcon from 'Components/Icons/Hexagon';
import React, { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { GUARANTEE_PRICE_MODAL } from 'Components/Modal/constants';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';

interface BargainPriceBadgeProps {
	bundle?: Bundle;
}

const BargainPriceBadge = ({ bundle }: BargainPriceBadgeProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const t = useFormatMessage();

	return (
		<button
			onClick={() =>
				handleOpenModal(GUARANTEE_PRICE_MODAL, {
					bundle,
				})
			}
			className={styles.priceBadgeWrap}
		>
			<HexagonIcon className={styles.badgeLeft} />
			<span className={styles.priceBadge}>
				{t({ id: 'bargainPriceBadge.text' })}
			</span>
			<HexagonIcon className={styles.badgeRight} />
		</button>
	);
};

export default BargainPriceBadge;
