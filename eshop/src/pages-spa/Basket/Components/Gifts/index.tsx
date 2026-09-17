import { useContext, useEffect } from 'react';
import ImageLocal from 'Components/View/ImageLocal';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import {
	isOrderPriceGiftRule,
	sortGiftsByorderPriceLimitFrom,
} from './helpers';
import styles from './styles.module.css';
import Gift from './Gift';

const Gifts = () => {
	const { possibleGiftsIncludingBundles, assignedGiftsIncludingBundles } =
		useContext(BasketContext);

	const { selectedGiftsId: chosenGifts, setSelectedGiftsId: setChosenGifts } =
		useContext(BasketContext);

	useEffect(() => {
		if (chosenGifts === undefined && assignedGiftsIncludingBundles.length > 0) {
			const defaultSelectedIds = assignedGiftsIncludingBundles
				.filter((gift) => gift.isSelectedByDefault)
				.map((gift) => gift.id);

			if (defaultSelectedIds.length > 0) {
				setChosenGifts(defaultSelectedIds);
			}
		}
	}, [assignedGiftsIncludingBundles, chosenGifts, setChosenGifts]);

	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);

	const sortedPossibleGiftsArray = possibleGiftsIncludingBundles
		?.filter(isOrderPriceGiftRule)
		?.sort(sortGiftsByorderPriceLimitFrom);

	const closestPossibleGift = sortedPossibleGiftsArray?.[0];

	const closestPossibleGiftName = closestPossibleGift?.name ?? '';

	const closestPossibleGiftLeftToSpent = closestPossibleGift?.leftToSpent ?? 0;

	const giftleftTospentInfo = t(
		{
			id: 'giftInfo.description',
		},
		{
			orderPriceLimitFrom: (
				<span
					key="giftInfo.description.orderPriceLimitFrom"
					className={styles.remaining}
				>
					{getLocalizedPrice({
						price: closestPossibleGiftLeftToSpent,
						currency,
					})}
				</span>
			),
		}
	);

	const giftDescription = t(
		{
			id: 'giftInfo.description.productName',
		},
		{
			productName: closestPossibleGiftName,
		}
	);

	if (
		closestPossibleGiftLeftToSpent === 0 &&
		assignedGiftsIncludingBundles.length === 0
	)
		return null;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t(
					{ id: 'giftInfo.pickGift' },
					{
						emphasized: (
							<span
								className={styles.highlighted}
								key="giftInfo.pickGift.emphasized"
							>
								{t({ id: 'giftInfo.price.freeSmall' })}
							</span>
						),
					}
				)}
			</div>

			{closestPossibleGiftLeftToSpent > 0 && (
				<div className={styles.info}>
					<div className={styles.iconWrapper}>
						<ImageLocal
							fileName="info_icon.svg"
							className={styles.icon}
						/>
					</div>
					<span>
						{giftleftTospentInfo} {giftDescription}
					</span>
				</div>
			)}

			{assignedGiftsIncludingBundles.length > 0 && (
				<>
					<p className={styles.subheading}>{t({ id: 'giftInfo.pick' })}</p>

					<div className={styles.gifts}>
						{assignedGiftsIncludingBundles
							.sort(sortGiftsByorderPriceLimitFrom)
							.map((gift) => (
								<Gift
									key={gift.id}
									gift={gift}
									setChosenGifts={setChosenGifts}
									chosenGifts={chosenGifts}
									isNoGift={false}
								/>
							))}

						<Gift
							key={'noGift'}
							gift={null}
							setChosenGifts={setChosenGifts}
							chosenGifts={chosenGifts}
							isNoGift={true}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Gifts;
