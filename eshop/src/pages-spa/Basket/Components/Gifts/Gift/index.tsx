import cx from 'classnames';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { getBundleProducerNames } from 'Services/BasketService/helpers';
import ImageLocal from 'Components/View/ImageLocal';

import styles from '../styles.module.css';
import GreenCheckbox from '../../BasketItem/GreenCheckbox';

import { AddonGift } from '@/domain/addons';
import { Bundle } from '@/domain/bundle';

interface GiftProps {
	gift:
		| (AddonGift & {
				bundle: Bundle | undefined;
		  })
		| null;
	setChosenGifts: (giftIds: string[] | null | undefined) => void;
	chosenGifts: string[] | null | undefined;
	isNoGift?: boolean;
}

const Gift = ({
	gift,
	setChosenGifts,
	chosenGifts,
	isNoGift = false,
}: GiftProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const checked =
		isNoGift && !chosenGifts
			? true
			: gift?.id && chosenGifts
			? chosenGifts.includes(gift.id)
			: false;

	const bundleProducerNames = getBundleProducerNames(gift?.bundle ?? null);

	const toggleGift = () => {
		if (isNoGift) {
			setChosenGifts(null);
			return;
		}
		if (!gift?.id) return;

		if (checked) {
			const newChosenGifts = chosenGifts
				? chosenGifts.filter((id) => id !== gift.id)
				: [];
			setChosenGifts(newChosenGifts.length > 0 ? newChosenGifts : null);
		} else {
			const newChosenGifts = chosenGifts
				? [...chosenGifts, gift.id]
				: [gift.id];
			setChosenGifts(newChosenGifts);
		}
	};

	return (
		<button
			className={cx(styles.gift, checked && styles.chosen)}
			key={gift?.id}
			onClick={toggleGift}
		>
			<div className={styles.checkWrapper}>
				<GreenCheckbox
					checked={checked}
					setChecked={toggleGift}
					tabIndex={-1}
				/>
			</div>
			{isNoGift ? (
				<div className={styles.noGiftWrapper}>
					<ImageLocal
						fileName="no_gift.svg"
						className={styles.noGiftImage}
					/>
				</div>
			) : (
				<div className={styles.giftImageWrapper}>
					<img
						// @ts-expect-error Next advises me to use null instead of '', but this is causing ts errors
						src={gift?.bundle?.images?.[0]?.domainUrls?.thumb_64x80 ?? null}
						className={styles.giftImage}
					/>
				</div>
			)}

			<div className={styles.giftInfo}>
				{isNoGift ? (
					<div className={styles.giftTitle}>Nechci dárek</div>
				) : (
					<>
						<div className={styles.giftTitle}>
							{getLocalizedValue(gift?.bundle?.name) ?? gift?.name}
						</div>
						<div className={styles.giftPrice}>
							{t({ id: 'giftInfo.price.freeSmall' })}
						</div>

						{bundleProducerNames?.length > 0 && (
							<div className={styles.seller}>
								Od: {bundleProducerNames.join(', ')}
							</div>
						)}
					</>
				)}
			</div>
		</button>
	);
};

export default Gift;
