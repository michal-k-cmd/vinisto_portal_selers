import { Fragment, useContext, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { BasketContext } from 'Services/BasketService';
import useGetSubscriptionAddons from 'Hooks/useGetSubscriptionAddons';
import { LocalizationContext } from 'Services/LocalizationService';
import { getSubscriptionPrices } from 'vinisto_ui/src/components/vinisto-plus-cards/helpers';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { Button } from 'vinisto_ui';
import useGetUserSubscriptions from 'Hooks/useGetUserSubscriptions';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import ImageLocal from 'Components/View/ImageLocal';
import { useQueryClient } from '@tanstack/react-query';
import CloseIcon from 'Components/Icons/Close';
import { ModalContext } from 'Components/Modal/context';
import { VINISTO_PLUS_BASKET_LOGIN_MODAL } from 'Components/Modal/constants';
import { MultiplatformBasketResponse } from 'Services/BasketService/interfaces';

import styles from './styles.module.css';

import { AddonResponse, AddonType, Currency } from '@/api-types/addons-api';
import {
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';

const VinistoPlusBanner = () => {
	const queryClient = useQueryClient();
	const t = useContext(LocalizationContext).useFormatMessage();

	const { handleSelectSubscription } = useContext(BasketContext);
	const { handleOpenModal } = useContext(ModalContext);

	const [hideWidget, setHideWidget] = useState<boolean>(false);

	const selectedSubscription = queryClient
		.getQueryData<MultiplatformBasketResponse | null>(['basketByUserOrId'])
		?.addons?.find(
			(addon) =>
				addon.type === AddonType.SubscriptionMonth ||
				addon.type === AddonType.SubscriptionYear
		);

	const { vinistoUser, isLoggedIn } = useContext(AuthenticationContext);
	const userId = vinistoUser?.id;

	const selectSubscription = (subscription: AddonResponse | null) => {
		handleSelectSubscription({ subscription: subscription ?? null });
	};

	const userSubscriptionsQuery = useGetUserSubscriptions({
		params: { UserId: userId ?? '' },
	});

	const nonInactiveSubscription =
		userSubscriptionsQuery.data?.subscriptions?.find(
			(sub) =>
				(sub.type === SubscriptionType.Month ||
					sub.type === SubscriptionType.Year) &&
				sub.state !== SubscriptionState.Inactive
		);

	const vinistoPlusQuery = useGetSubscriptionAddons();

	// User closed the widget, do not show again
	if (hideWidget) return null;

	// User is already subscribed, no need to show banner
	if (nonInactiveSubscription) return null;

	// Disable VinistoPlus features by env flag
	if (
		process.env.NEXT_PUBLIC_IS_VINISTO_PLUS_ACTIVE === 'false' ||
		process.env.NEXT_PUBLIC_IS_VINISTO_PLUS_ACTIVE_BASKET === 'false'
	)
		return null;

	const monthlySubscription = vinistoPlusQuery.data?.monthlySubscription;
	const yearlySubscription = vinistoPlusQuery.data?.yearlySubscription;

	// No subscriptions available
	if (!monthlySubscription && !yearlySubscription) return null;

	const { monthlyPriceWithVat, yearlyPriceWithVat } = getSubscriptionPrices({
		monthlySubscription,
		yearlySubscription,
	});

	const thingsToEnjoy = [
		'vinistoPlus.banner.thingsToEnjoy.discounts',
		'vinistoPlus.banner.thingsToEnjoy.freeDelivery',
	];

	return (
		<div
			className={styles.wrapper}
			suppressHydrationWarning
		>
			<button
				className={styles.hideWidget}
				onClick={() => setHideWidget(true)}
			>
				<CloseIcon />
			</button>
			<div className={styles.imgWrap}>
				<ImageLocal
					fileName="vinisto_plus.svg"
					alt={`${t({
						id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
					})}`}
					className={styles.desktopImg}
				/>
				<ImageLocal
					fileName="vinisto_plus_wide.svg"
					alt={`${t({
						id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
					})}`}
					className={styles.mobileImg}
				/>
			</div>
			<h2 className={styles.heading}>
				{t(
					{ id: 'vinistoPlus.banner.callToAction.title' },
					{
						thingsToEnjoy: thingsToEnjoy.map((item, index) => (
							<Fragment key={item}>
								{index > 0 &&
									` ${t({
										id: 'vinistoPlus.banner.thingsToEnjoy.conjunction',
									})} `}
								<span className={styles.wineHeading}>{t({ id: item })}</span>
							</Fragment>
						)),
					}
				)}
			</h2>
			<p className={styles.text}>
				{t(
					{ id: 'vinistoPlus.banner.callToAction.info' },
					{
						subscriptionName: (
							<strong key="subscriptionName">
								{t({
									id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
								})}
							</strong>
						),
					}
				)}
			</p>
			<div className={styles.buttons}>
				<Button
					onClick={() => {
						selectSubscription(null);
					}}
					className={cx(
						styles.button,
						!selectedSubscription && styles.selected
					)}
				>
					<span className={styles.radio}></span>
					{t({ id: 'vinistoPlus.banner.choices.notInterested' })}
				</Button>
				{yearlySubscription && (
					<Button
						onClick={() => {
							isLoggedIn
								? selectSubscription(yearlySubscription ?? null)
								: handleOpenModal(VINISTO_PLUS_BASKET_LOGIN_MODAL, {
										selectSubscription,
										yearlySubscription,
										monthlySubscription,
										subscriptionType: AddonType.SubscriptionYear,
								  });
						}}
						className={cx(
							styles.button,
							yearlySubscription?.id === selectedSubscription?.addonId &&
								styles.selected
						)}
					>
						<span className={styles.radio}></span>
						<span className={styles.capitalize}>{`${t({
							id: 'year.adjective',
						})}`}</span>{' '}
						{`${t({
							id: 'membership',
						})} `}
						<span className={styles.price}>
							{`${getLocalizedPrice({
								price: yearlyPriceWithVat / 12,
								currency: yearlySubscription?.currency ?? Currency.CZK,
							})}
						/ ${t({ id: 'month.singular' })}`}{' '}
						</span>
						<span className={styles.yearlyPrice}>
							(
							{getLocalizedPrice({
								price: yearlyPriceWithVat,
								currency: yearlySubscription?.currency ?? Currency.CZK,
							})}
							)
						</span>
					</Button>
				)}

				{monthlySubscription && (
					<Button
						onClick={() => {
							isLoggedIn
								? selectSubscription(monthlySubscription ?? null)
								: handleOpenModal(VINISTO_PLUS_BASKET_LOGIN_MODAL, {
										selectSubscription,
										yearlySubscription,
										monthlySubscription,
										subscriptionType: AddonType.SubscriptionMonth,
								  });
						}}
						className={cx(
							styles.button,
							monthlySubscription?.id === selectedSubscription?.addonId &&
								styles.selected
						)}
					>
						<span className={styles.radio}></span>
						<span className={styles.capitalize}>{`${t({
							id: 'month.adjective',
						})}`}</span>{' '}
						{`${t({
							id: 'membership',
						})} `}
						<span className={styles.price}>
							{getLocalizedPrice({
								price: monthlyPriceWithVat,
								currency: monthlySubscription?.currency ?? Currency.CZK,
							})}{' '}
							/ {t({ id: 'month.singular' })}
						</span>
					</Button>
				)}
			</div>
			{selectedSubscription && (
				<p className={styles.selectedInfo}>
					{t(
						{ id: 'vinistoPlus.banner.selectedSubscription.info' },
						{
							termsLink: (
								<Link
									href={`/${t({ id: 'routes.vinistoPlus.terms.route' })}`}
									target="_blank"
									key="termsLink"
									className={styles.termsLink}
								>
									{t({
										id: 'vinistoPlus.banner.selectedSubscription.info.link',
									})}
								</Link>
							),
						}
					)}
				</p>
			)}
		</div>
	);
};

export default VinistoPlusBanner;
