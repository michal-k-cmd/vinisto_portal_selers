import cx from 'classnames';

import GiftIcon from '../icons/Gift';
import DeliveryIcon from '../icons/Delivery';
import { PURCHASE_GIFT_TYPES } from '../gift-progress-bar/types';
import { IconGiftVariant } from '../icons/interfaces';
import CheckIcon from '../icons/check-in-hexagon';

import styles from './styles.module.css';
import {
	GiftPurchaseProps,
	PurchaseGiftProps,
	PurchaseGiftUnfulfilledProps,
} from './types';

const BundlePurchase = ({ text }: PurchaseGiftProps) => (
	<div className={styles.giftWrap}>
		<div className={styles.giftIcon}>
			<CheckIcon variant={IconGiftVariant.ACTIVE} />
		</div>
		<div className={styles.giftTextFullfilled}>{text}</div>
	</div>
);

const TransportGiftPurchase = ({ text }: PurchaseGiftProps) => (
	<div className={styles.giftWrap}>
		<div className={styles.giftIcon}>
			<CheckIcon variant={IconGiftVariant.ACTIVE} />
		</div>
		<div className={styles.giftTextFullfilled}>{text}</div>
	</div>
);

const PurchaseGiftUnfulfilledTransport = ({ text }: PurchaseGiftProps) => (
	<div className={styles.giftWrap}>
		<div className={styles.giftIcon}>
			<DeliveryIcon variant={IconGiftVariant.INACTIVE} />
		</div>
		<div className={styles.giftText}>{text}</div>
	</div>
);

const PurchaseGiftUnfulfilledBundle = ({
	text,
	imageUrl,
}: PurchaseGiftUnfulfilledProps) => {
	return (
		<div className={styles.giftWrap}>
			<div className={styles.giftIcon}>
				<GiftIcon variant={IconGiftVariant.INACTIVE} />
			</div>
			<img
				className={styles.giftImage}
				src={imageUrl}
				alt=""
			/>
			<div className={cx(styles.giftUnfullfiedBundleText, styles.giftText)}>
				{text}
			</div>
		</div>
	);
};

const GiftPurchase = ({
	isFulfilled,
	type,
	text,
	imageUrl,
}: GiftPurchaseProps) => {
	if (!isFulfilled)
		switch (type) {
			case PURCHASE_GIFT_TYPES.bundle:
				return (
					<PurchaseGiftUnfulfilledBundle
						text={text}
						// @ts-expect-error Empty string cases issue in Next
						imageUrl={imageUrl || null}
					/>
				);
			case PURCHASE_GIFT_TYPES.transport:
				return <PurchaseGiftUnfulfilledTransport text={text} />;
		}

	switch (type) {
		case PURCHASE_GIFT_TYPES.bundle:
			return <BundlePurchase text={text} />;
		case PURCHASE_GIFT_TYPES.transport:
			return <TransportGiftPurchase text={text} />;
	}
};

export default GiftPurchase;
