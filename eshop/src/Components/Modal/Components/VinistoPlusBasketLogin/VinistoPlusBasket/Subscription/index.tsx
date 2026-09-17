import cx from 'classnames';
import { useContext } from 'react';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	monthlyPriceSaveAmountHardcoded,
	originalMonthlyPrice,
	originalYearlyPrice,
	yearlyPriceSaveAmountHardcoded,
} from 'vinisto_ui/src/components/vinisto-plus-cards/constants';

import styles from './styles.module.css';

import {
	ActionType,
	AddonResponse,
	AddonType,
	Currency,
} from '@/api-types/addons-api';

interface VinistoPlusBasketProps {
	subscription: AddonResponse;
	localySelectedSubscription: AddonResponse;
	setLocalySelectedSubscription: (subscription: AddonResponse) => void;
}

const Subscription = ({
	subscription,
	localySelectedSubscription,
	setLocalySelectedSubscription,
}: VinistoPlusBasketProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const subscriptionPrice = subscription.actions?.find(
		(action) => action.actionType === ActionType.SetPrice
	)?.price;
	const priceWithVat =
		subscriptionPrice?.valueWithVat !== null &&
		subscriptionPrice?.valueWithVat !== undefined
			? subscriptionPrice.valueWithVat
			: null;
	const currency = subscription.currency ?? Currency.CZK;

	return (
		<button
			className={cx(styles.subscription, {
				[styles.selected]:
					subscription.type === localySelectedSubscription.type,
			})}
			onClick={() => setLocalySelectedSubscription(subscription)}
		>
			<span className={styles.youSave}>
				{subscription.type === AddonType.SubscriptionMonth &&
					monthlyPriceSaveAmountHardcoded[currency] > 0 && (
						<div className={styles.savingBadge}>
							{t({ id: 'modal.vinistoPlusLogin.youSave' })}{' '}
							{getLocalizedPrice({
								price: monthlyPriceSaveAmountHardcoded[currency],
								currency,
							})}
						</div>
					)}
				{subscription.type === AddonType.SubscriptionYear &&
					yearlyPriceSaveAmountHardcoded[currency] > 0 && (
						<div className={styles.savingBadge}>
							{t({ id: 'modal.vinistoPlusLogin.youSave' })}{' '}
							{getLocalizedPrice({
								price: yearlyPriceSaveAmountHardcoded[currency],
								currency,
							})}
						</div>
					)}
			</span>
			<span className={styles.selectBadge}></span>
			<div className={styles.name}>{subscription?.name}</div>
			<div className={styles.description}>{subscription?.description}</div>
			<div className={styles.originalPrice}>
				{subscription.currency === Currency.CZK && (
					<p className={styles.originalPrice}>
						{getLocalizedPrice({
							price:
								subscription.type === AddonType.SubscriptionYear
									? originalYearlyPrice[currency]
									: originalMonthlyPrice[currency],
							currency,
						})}
					</p>
				)}
			</div>
			<div className={styles.price}>
				{priceWithVat &&
					getLocalizedPrice({
						price:
							subscription.type === AddonType.SubscriptionYear
								? Math.ceil(priceWithVat / 12)
								: priceWithVat,
						currency,
					})}
			</div>
			<div className={styles.infoText}>
				{t({ id: 'modal.vinistoPlusLogin.monthly' })}
			</div>
			<div className={styles.infoText2}>
				{subscription.type === AddonType.SubscriptionYear && priceWithVat && (
					<>
						<br />
						<br />
						<span>
							{t({ id: 'modal.vinistoPlusLogin.yearly' })}{' '}
							{getLocalizedPrice({
								price: priceWithVat,
								currency,
							})}
						</span>
					</>
				)}
			</div>
		</button>
	);
};

export default Subscription;
