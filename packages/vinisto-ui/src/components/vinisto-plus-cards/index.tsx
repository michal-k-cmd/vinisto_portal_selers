import cx from 'classnames';
import { ReactNode } from 'react';
import {
	ActionType,
	AddonResponse,
	AddonType,
	Currency,
} from 'vinisto_api_client/src/api-types/addons-api';
import {
	SubscriptionResponse,
	SubscriptionType,
} from 'vinisto_api_client/src/api-types/subscription-api';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import CheckIcon from '../../components/icons/check-simple';

import styles from './styles.module.css';
import Loading from './loading';
import {
	monthlyPriceSaveAmountHardcoded,
	originalMonthlyPrice,
	originalYearlyPrice,
	yearlyPriceSaveAmountHardcoded,
} from './constants';
//import { getSubscriptionPrices } from './helpers';

type TranslationKeys =
	| 'youSave'
	| 'withoutVat'
	| 'totalYearlyPrice'
	| 'monthly'
	| 'active'
	| 'activate'
	| 'renew';

export interface VinistoPlusCardsProps {
	monthlySubscription: AddonResponse | undefined;
	yearlySubscription: AddonResponse | undefined;
	onActivateClick?: () => (subscription: AddonResponse | undefined) => void;
	translations: { [key in TranslationKeys]: ReactNode };
	subscriptionsClassName?: string;
	isLoading?: boolean;
	nonInactiveSubscription?: SubscriptionResponse;
	inactiveSubscriptions?: SubscriptionResponse[];
}

const VinistoPlusCards = ({
	monthlySubscription,
	yearlySubscription,
	onActivateClick,
	translations,
	subscriptionsClassName,
	isLoading,
	nonInactiveSubscription,
	inactiveSubscriptions = [],
}: VinistoPlusCardsProps) => {
	const isSubscriptionTypeMatchingAddonType = (
		subscription: SubscriptionResponse,
		addon: AddonResponse
	) =>
		(subscription.type === SubscriptionType.Month &&
			addon.type === AddonType.SubscriptionMonth) ||
		(subscription.type === SubscriptionType.Year &&
			addon.type === AddonType.SubscriptionYear);

	if (isLoading) {
		return <Loading subscriptionsClassName={subscriptionsClassName} />;
	}
	if (!monthlySubscription && !yearlySubscription) return null;

	/* const { yearlyPriceSaveAmount } = getSubscriptionPrices({
		monthlySubscription,
		yearlySubscription,
	}); */

	return (
		<div className={cx(styles.subscriptions, subscriptionsClassName)}>
			{[yearlySubscription, monthlySubscription]
				.filter(
					(item): item is Exclude<typeof item, undefined> => item != undefined
				)
				.map((subscriptionAddon, i) => {
					const subscriptionPrice = subscriptionAddon.actions?.find(
						(action) => action.actionType === ActionType.SetPrice
					)?.price;

					const priceWithVat = subscriptionPrice?.valueWithVat;
					const currency = subscriptionAddon.currency;

					if (!currency) return null;

					return (
						<div
							key={`${subscriptionAddon.id}_${i}`}
							className={styles.subscriptionCard}
						>
							{subscriptionAddon.type === AddonType.SubscriptionMonth &&
								monthlyPriceSaveAmountHardcoded[currency] > 0 && (
									<div className={styles.savingBadge}>
										{translations.youSave}{' '}
										{getLocalizedPrice({
											price: monthlyPriceSaveAmountHardcoded[currency],
											currency,
										})}
									</div>
								)}
							{subscriptionAddon.type === AddonType.SubscriptionYear &&
								yearlyPriceSaveAmountHardcoded[currency] > 0 && (
									<div className={styles.savingBadge}>
										{translations.youSave}{' '}
										{getLocalizedPrice({
											price: yearlyPriceSaveAmountHardcoded[currency],
											currency,
										})}
									</div>
								)}
							<p className={styles.name}>{subscriptionAddon.name}</p>
							{subscriptionAddon.description && (
								<p className={styles.description}>
									{subscriptionAddon.description}
								</p>
							)}
							{subscriptionAddon.currency === Currency.CZK && (
								<p className={styles.originalPrice}>
									{getLocalizedPrice({
										price:
											subscriptionAddon.type === AddonType.SubscriptionYear
												? originalYearlyPrice[currency]
												: originalMonthlyPrice[currency],
										currency,
									})}
								</p>
							)}
							<p className={styles.priceWithVat}>
								{priceWithVat &&
									getLocalizedPrice({
										price:
											subscriptionAddon.type === AddonType.SubscriptionYear
												? Math.ceil(priceWithVat / 12)
												: priceWithVat,
										currency,
									})}
							</p>
							{subscriptionAddon.type === AddonType.SubscriptionYear &&
								priceWithVat && (
									<p className={styles.typeInfo}>
										{translations.monthly}
										<br />
										<b>
											{translations.totalYearlyPrice}{' '}
											{priceWithVat &&
												getLocalizedPrice({
													price: priceWithVat,
													currency,
												})}
										</b>
									</p>
								)}
							{subscriptionAddon.type === AddonType.SubscriptionMonth && (
								<p className={styles.typeInfo}>
									{translations.monthly}
									<br />
									<br />
								</p>
							)}
							{(() => {
								if (
									nonInactiveSubscription &&
									isSubscriptionTypeMatchingAddonType(
										nonInactiveSubscription,
										subscriptionAddon
									)
								) {
									return (
										<div
											className={cx(styles.subscribeButton, styles.greenText)}
										>
											Aktivní <CheckIcon />
										</div>
									);
								}
								if (nonInactiveSubscription) {
									return <div className={cx(styles.subscribeButton)}></div>;
								}

								return (
									<button
										disabled={onActivateClick == undefined}
										onClick={() => onActivateClick?.()(subscriptionAddon)}
										className={cx(styles.subscribeButton, {
											[styles.yearly]:
												subscriptionAddon.type === AddonType.SubscriptionYear,
											[styles.monthly]:
												subscriptionAddon.type === AddonType.SubscriptionMonth,
										})}
									>
										{inactiveSubscriptions.some((inactiveSubscription) =>
											isSubscriptionTypeMatchingAddonType(
												inactiveSubscription,
												subscriptionAddon
											)
										)
											? translations.renew
											: translations.activate}
									</button>
								);
							})()}
						</div>
					);
				})}
		</div>
	);
};

export default VinistoPlusCards;
