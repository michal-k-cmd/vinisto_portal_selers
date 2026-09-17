'use client';

import { useContext } from 'react';
import cx from 'classnames';
import NextLink from 'next/link';
import getBundleImage, { IMAGE_SIZE_THUMB_80x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { SideBasketContext } from 'Components/SideBasket/context';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';
import { BasketItem } from '@/api-types/basket-api';

interface ExtendedBundleItem extends BasketItem {
	bundle: Bundle | undefined;
}

const BundleItem = ({ basketItem }: { basketItem: ExtendedBundleItem }) => {
	const { openedBundleId } = useContext(SideBasketContext);
	const bundleId = basketItem.itemId ?? '';
	const t = useContext(LocalizationContext).useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	return (
		<div
			className={cx(styles.item, {
				active: openedBundleId === bundleId,
			})}
		>
			<NextLink
				href={`/${t({
					id: 'routes.product.route',
				})}/${getLocalizedValue(basketItem.bundle?.url ?? [])}`}
				className={styles.itemWrap}
			>
				<span className={styles.count}>{basketItem.quantity}</span>
				<img
					className={styles.image}
					src={getBundleImage(
						basketItem.bundle?.images ?? [],
						IMAGE_SIZE_THUMB_80x80
					)}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
			</NextLink>
		</div>
	);
};

export default BundleItem;
