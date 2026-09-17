import { MarkObj } from 'rc-slider/lib/Marks';

import DeliveryIcon from '../icons/Delivery';
import GiftIcon from '../icons/Gift';
import {
	GiftRuleType,
	IconDefaultVariant,
	IconGiftVariant,
} from '../icons/interfaces';
import { VinistoHelperDllEnumsCurrency } from '../../../../vinisto-api-client/src/api-types/product-api';

import styles from './styles.module.css';
import { Gift, GiftProgressBarProps } from './types';
import { MAX_VALUE, MIN_DISTANCE_BETWEEN_MARKS } from './constants';

const useCreateGiftMarks = ({
	minimalPriceForFreeDelivery,
	currency,
	totalMoneySpent,
	assignedGifts,
	possibleGifts,
}: {
	minimalPriceForFreeDelivery: number | null;
	currency: VinistoHelperDllEnumsCurrency;
	totalMoneySpent: number;
	assignedGifts?: Gift[];
	possibleGifts?: Gift[];
}): GiftProgressBarProps => {
	let totalMoneySpentAdjusted = totalMoneySpent;

	if (minimalPriceForFreeDelivery === null) {
		return {
			progressMarks: {},
			maxValue: MAX_VALUE,
			totalMoneySpent: totalMoneySpentAdjusted,
		};
	}

	const freeDeliveryGift = {
		orderPriceLimitFrom: minimalPriceForFreeDelivery,
		ruleType: GiftRuleType.GIFT_ORDER_PRICE_FROM,
		leftToSpent:
			minimalPriceForFreeDelivery - totalMoneySpent >= 0
				? minimalPriceForFreeDelivery - totalMoneySpent
				: 0,
		isGift: true,
	};

	const allGifts =
		assignedGifts
			?.concat(possibleGifts ?? [], freeDeliveryGift)
			.filter((gift) => gift.ruleType === GiftRuleType.GIFT_ORDER_PRICE_FROM)
			.sort((a, b) => a.orderPriceLimitFrom - b.orderPriceLimitFrom) ?? [];

	let maxValue =
		allGifts && allGifts.length > 0
			? allGifts[allGifts.length - 1].orderPriceLimitFrom
			: MAX_VALUE;

	const minDistance =
		maxValue / (allGifts.length + 1) < MIN_DISTANCE_BETWEEN_MARKS[currency]
			? MIN_DISTANCE_BETWEEN_MARKS[currency]
			: maxValue / (allGifts.length + 1);

	const isDeliveryFree = Boolean(
		totalMoneySpent - minimalPriceForFreeDelivery > 0
	);

	const getMark = (gifts: Gift[]) => {
		const adjustedMarks: Record<string | number, React.ReactNode | MarkObj> =
			{};
		let prevMark: number | null = null;

		gifts.map((gift, key: number) => {
			const currentMark = gift.orderPriceLimitFrom;

			const markKey =
				prevMark !== null &&
				currentMark - prevMark < MIN_DISTANCE_BETWEEN_MARKS[currency]
					? prevMark + MIN_DISTANCE_BETWEEN_MARKS[currency]
					: currentMark;
			const iconVariant =
				gift.leftToSpent <= 0
					? IconGiftVariant.ACTIVE
					: IconGiftVariant.INACTIVE;
			if (prevMark !== null && currentMark - prevMark < minDistance) {
				prevMark = prevMark + minDistance;
			} else {
				prevMark = currentMark;
			}

			if (gift.isGift === true) {
				adjustedMarks[markKey] = (
					<DeliveryIcon
						className={styles.freeGiftMark}
						key={key}
						variant={
							isDeliveryFree
								? IconDefaultVariant.ACTIVE
								: IconDefaultVariant.INACTIVE
						}
					/>
				);
			} else {
				adjustedMarks[markKey] = (
					<GiftIcon
						className={styles.freeGiftMark}
						key={key}
						variant={iconVariant}
					/>
				);
			}
			maxValue = maxValue < markKey ? markKey : maxValue;
		});

		return adjustedMarks;
	};

	const getAdjustedMoneySpent = (
		gifts: Gift[],
		adjustedMarks: Record<string | number, React.ReactNode | MarkObj>,
		totalMoneySpent: number
	): number => {
		//idea is to approximate the markedMoneySpent as percentage (ratio) of intervals of gifts that already aquired and aqcuired + 1
		//and then transfer it to the intevals in marks

		if (
			gifts.length <= 2 ||
			gifts[gifts.length - 1].orderPriceLimitFrom <= totalMoneySpent
		) {
			//no calculation needed because there is only one gift (so no intervals)
			//or user spent more than max gift threshold price
			return totalMoneySpent;
		}

		//intervals calculation
		let moneySpentLowerBound = 0;
		let moneySpentUpperBound = gifts[gifts.length - 1].orderPriceLimitFrom;
		let moneyMarksLowerBound = 0;
		let moneyMarksUpperBound = gifts[gifts.length - 1].orderPriceLimitFrom;
		const adjustedMarksValues = Object.keys(adjustedMarks)
			.map((x) => Number(x))
			.sort((a, b) => a - b);

		const moneySpentIndex = gifts.findIndex(
			(x) => x.orderPriceLimitFrom >= totalMoneySpent
		);

		if (moneySpentIndex == 0 || moneySpentIndex == -1) {
			//edge case for 0
			//also since gitfs are loaded asynchrnously, moneySpentIndex can be -1 before gifts are loaded
			moneySpentLowerBound = 0;
			moneySpentUpperBound = gifts[1].orderPriceLimitFrom;
			moneyMarksLowerBound = 0;
			moneyMarksUpperBound = adjustedMarksValues[1];
		} else {
			moneySpentLowerBound = gifts[moneySpentIndex - 1].orderPriceLimitFrom;
			moneySpentUpperBound = gifts[moneySpentIndex].orderPriceLimitFrom;
			moneyMarksLowerBound = adjustedMarksValues[moneySpentIndex - 1];
			moneyMarksUpperBound = adjustedMarksValues[moneySpentIndex];
		}

		const spentMoneyInterval = moneySpentUpperBound - moneySpentLowerBound;
		const marksMoneyInterval = moneyMarksUpperBound - moneyMarksLowerBound;

		if (spentMoneyInterval <= 0) {
			//no calculation needed
			return totalMoneySpent;
		}
		const intervalRatio =
			(totalMoneySpent - moneySpentLowerBound) / spentMoneyInterval;

		return marksMoneyInterval * intervalRatio + moneyMarksLowerBound;
	};

	const progressMarks = getMark(allGifts);
	totalMoneySpentAdjusted = getAdjustedMoneySpent(
		allGifts,
		progressMarks,
		totalMoneySpent
	);
	return { progressMarks, maxValue, totalMoneySpent: totalMoneySpentAdjusted };
};

export default useCreateGiftMarks;
