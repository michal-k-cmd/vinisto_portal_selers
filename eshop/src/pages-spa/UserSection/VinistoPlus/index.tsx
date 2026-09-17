'use client';

import { useContext, useRef } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { useQuery } from '@tanstack/react-query';
import ImageLocal from 'Components/View/ImageLocal';
import { useGetAllDeliveries } from 'Hooks/useGetDeliveries';
import DeliveryCard from 'Components/DeliveryCard';
import { useQueryState } from 'nuqs';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import router from 'next/router';
import PaymentCard from 'Components/PaymentCard';
import { Button } from 'vinisto_ui';
import useGetSubscriptionAddons from 'Hooks/useGetSubscriptionAddons';
import Link from 'next/link';

import BreadCrumbsUserSection from '../Breadcrumbs';

import styles from './styles.module.css';
import VinistoPlusCardsHeader from './VinistoPlusCardsHeader';
import OrderInfo from './OrderInfo';
import Billings from './Billings';
import CancelSubscriptionModal, {
	CancelSubscriptionModalRef,
} from './CancelSubscriptionModal';

import api from '@/api';
import { subscriptionReadOnlyApi } from '@/subscription-service';
import {
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';
import { ActionType } from '@/api-types/addons-api';
import { VinistoGopayDllModelsApiPaymentReturn } from '@/api-types/services-api';
import { VinistoHelperDllEnumsErrorSpecificError } from '@/api-types/order-api';
import { ApiError } from '@/domain/error';
import { B2C_NUMERIC_CODE } from '@/shared';

const VinistoPlus = () => {
	const cancelModalRef = useRef<CancelSubscriptionModalRef>(null);
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		countryOfSale,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { id: userId } = useContext(AuthenticationContext).vinistoUser;

	// TODO abstract this to a hook call
	const userSubscriptionsQuery = useQuery({
		queryKey: ['userSubscriptionsQuery', userId],
		queryFn: () =>
			subscriptionReadOnlyApi
				.subscriptionsList({ UserId: userId ?? '' })
				.then((res) => res.data),
	});

	const vinistoPlusQuery = useGetSubscriptionAddons();

	const vinistoPlusDeliveries = useGetAllDeliveries({
		AllowedCountry: countryOfSale,
		Currency: currency,
		IsSubscriber: true,
		IsActive: true,
		PlatformId: B2C_NUMERIC_CODE,
	});

	const nonInactiveSubscription =
		userSubscriptionsQuery.data?.subscriptions?.find(
			(sub) =>
				(sub.type === SubscriptionType.Month ||
					sub.type === SubscriptionType.Year) &&
				sub.state !== SubscriptionState.Inactive
		);

	const inactiveSubscription =
		!nonInactiveSubscription &&
		userSubscriptionsQuery.data?.subscriptions?.find(
			(sub) =>
				(sub.type === SubscriptionType.Month ||
					sub.type === SubscriptionType.Year) &&
				sub.state == SubscriptionState.Inactive
		);

	const existingSubscription = nonInactiveSubscription ?? inactiveSubscription;

	const inactiveSubscriptions =
		userSubscriptionsQuery.data?.subscriptions?.filter(
			(sub) => sub.state === SubscriptionState.Inactive
		) ?? [];

	const shouldShowVinistoPlusCards = !nonInactiveSubscription;

	const [apiOrderId, setApiOrderId] = useQueryState('oid');
	const [goPayPaymentId] = useQueryState('id');

	const goPayPaymentQuery = useQuery(
		['goPayPaymentQuery', apiOrderId],
		() =>
			api
				.get<VinistoGopayDllModelsApiPaymentReturn>(
					`services-api/gopay/${goPayPaymentId}`
				)
				.then((response) => {
					setApiOrderId(response?.payment?.orderId || null);
					return response.payment;
				})
				.catch((responseError: ApiError) => {
					if (
						responseError.message ===
						VinistoHelperDllEnumsErrorSpecificError.GOPAY_PAYMENT_STATUS_ERROR
					) {
						router.push('/');
					}
				}),
		{
			enabled: Boolean(goPayPaymentId),
		}
	);

	const subscriptionEndDate = nonInactiveSubscription?.endDate
		? dayjs(nonInactiveSubscription?.endDate)
		: null;

	const subscriptionRenewalDate = nonInactiveSubscription?.endDate
		? dayjs(nonInactiveSubscription?.endDate).add(1, 'day')
		: null;

	const subscriptionRenewalDiffInDays = subscriptionRenewalDate
		? Math.ceil(subscriptionRenewalDate.diff(dayjs(), 'day', true))
		: null;

	const subscriptionEndDiffInDays = subscriptionEndDate
		? Math.ceil(subscriptionEndDate.diff(dayjs(), 'day', true))
		: null;

	if (apiOrderId) {
		return (
			<>
				<BreadCrumbsUserSection />
				<OrderInfo
					orderId={apiOrderId}
					goPayState={goPayPaymentQuery.data?.state ?? undefined}
					refetchSubscriptions={userSubscriptionsQuery.refetch}
				/>
			</>
		);
	}

	return (
		<>
			<BreadCrumbsUserSection />

			<ImageLocal
				fileName="vinisto_plus.svg"
				alt="Vinisto PLUS+"
				title="Vinisto PLUS+"
				className={styles.vinistoPlusImage}
			/>
			<h1
				className={cx(
					userSectionStyles.userSectionMainHeader,
					styles.mainHeader
				)}
			>
				{existingSubscription
					? t(
							{ id: 'userSection.vinistoplus.member.title' },
							{
								subscriptionPeriod: (() => {
									if (existingSubscription.type === SubscriptionType.Month)
										return (
											<span
												className={styles.subscriptionType}
												key="month"
											>
												{t({ id: 'month.adjective' })}
											</span>
										);
									if (existingSubscription.type === SubscriptionType.Year)
										return (
											<span
												className={styles.subscriptionType}
												key="yearly"
											>
												{t({ id: 'year.adjective' })}
											</span>
										);
								})(),
								subscriptionName: t({
									id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
								}),
								subscriptionState: (() => {
									if (
										existingSubscription.state === SubscriptionState.Active &&
										!existingSubscription.isRenewDisabled
									)
										// Active and not cancelled
										return (
											<span
												className={cx(
													styles.greenText,
													styles.subscriptionType
												)}
												key={'SubscriptionState.Active'}
											>
												{t({ id: 'vinistoPlus.state.Active' })}
											</span>
										);
									if (
										existingSubscription.state === SubscriptionState.Active &&
										existingSubscription.isRenewDisabled
									)
										// Active but cancelled
										return (
											<span
												className={cx(styles.redText, styles.subscriptionType)}
												key={'SubscriptionState.WaitingToEnd'}
											>
												{t({ id: 'vinistoPlus.state.WaitingToEnd' })}
											</span>
										);
									if (existingSubscription.state === SubscriptionState.Inactive)
										return (
											<span
												className={cx(styles.redText, styles.subscriptionType)}
												key={'SubscriptionState.Inactive'}
											>
												{t({ id: 'vinistoPlus.state.Inactive' })}
											</span>
										);
									if (
										existingSubscription.state ===
										SubscriptionState.WaitingToPayment
									)
										return (
											<span
												className={cx(styles.redText, styles.subscriptionType)}
												key={'SubscriptionState.WaitingToPayment'}
											>
												{t({ id: 'vinistoPlus.state.WaitingToPayment' })}
											</span>
										);
								})(),
							}
					  )
					: t({ id: 'userSection.vinistoplus.becomeMember' })}
			</h1>

			{nonInactiveSubscription?.isRenewDisabled &&
				nonInactiveSubscription?.endDate && (
					<p className={styles.infoText}>
						{t(
							{ id: 'userSection.vinistoPlus.member.endDateInfo' },
							{
								emphasizedSubstring: (
									<strong key="emphasizedSubstring">
										{t(
											{
												id: 'userSection.vinistoPlus.member.endDateEmphasizedSubstring',
											},
											{
												daysRemainingToEnd: subscriptionEndDiffInDays,
											}
										)}
									</strong>
								),

								endDate: dayjs(nonInactiveSubscription.endDate).format(
									'D. M. YYYY'
								),
							}
						)}
					</p>
				)}

			{existingSubscription && !existingSubscription.isRenewDisabled && (
				<p className={cx(styles.infoText, styles.subscriptionInfoText)}>
					{t(
						{ id: 'userSection.vinistoplus.member.automaticRenewalInfo' },
						{
							emphasizedSubstring: (
								<strong key="emphasizedSubstring">
									{t(
										{
											id: 'userSection.vinistoplus.member.automaticRenewalEmphasizedSubstring',
										},
										{ daysRemainingToRenewal: subscriptionRenewalDiffInDays }
									)}
								</strong>
							),
							renewalDate: subscriptionRenewalDate?.format('D. M. YYYY'),
							subscriptionPeriod: (() => {
								if (nonInactiveSubscription?.type === SubscriptionType.Month)
									return t({ id: 'month.singular' });
								if (nonInactiveSubscription?.type === SubscriptionType.Year)
									return t({ id: 'year.singular' });
								return '…';
							})(),
							subscriptionPrice: (() => {
								const monthlySubscription =
									vinistoPlusQuery.data?.monthlySubscription;
								const yearlySubscription =
									vinistoPlusQuery.data?.yearlySubscription;

								const monthlyPrice = monthlySubscription?.actions?.find(
									(action) => action.actionType === ActionType.SetPrice
								)?.price;
								const yearlyPrice = yearlySubscription?.actions?.find(
									(action) => action.actionType === ActionType.SetPrice
								)?.price;

								if (
									nonInactiveSubscription?.type === SubscriptionType.Month &&
									typeof monthlyPrice?.valueWithVat === 'number' &&
									monthlySubscription?.currency
								)
									return getLocalizedPrice({
										price: monthlyPrice?.valueWithVat,
										currency: monthlySubscription?.currency,
									});
								if (
									nonInactiveSubscription?.type === SubscriptionType.Year &&
									typeof yearlyPrice?.valueWithVat === 'number' &&
									yearlySubscription?.currency
								)
									return getLocalizedPrice({
										price: yearlyPrice?.valueWithVat,
										currency: yearlySubscription?.currency,
									});
							})(),
						}
					)}
				</p>
			)}

			{existingSubscription &&
				existingSubscription.state !== SubscriptionState.Inactive && (
					<h2
						className={cx(
							userSectionStyles.userSectionMainHeader,
							styles.mainHeader
						)}
					>
						{t(
							{ id: 'userSection.vinistoplus.advantages' },
							{
								subscriptionState: (
									<span
										className={cx(styles.greenText, styles.subscriptionType)}
										key={'SubscriptionState.Active'}
									>
										{t({ id: 'vinistoPlus.state.Active' })}
									</span>
								),
							}
						)}
					</h2>
				)}

			{inactiveSubscription && (
				<p className={styles.infoText}>
					{t(
						{ id: 'userSection.vinistoPlus.member.endedDateInfo' },
						{
							vinistoPlus: (
								<strong>
									{t({
										id: 'userSection.vinistoPlus.member.endedDateInfo.vinistoPlus',
									})}
								</strong>
							),
							endDate: dayjs(inactiveSubscription.endDate).format('D. M. YYYY'),
							vinistoPlus2: (
								<Link
									className={styles.greenText}
									href={'/vinistoplus'}
								>
									{t(
										{
											id: 'userSection.vinistoPlus.member.endedDateInfo.vinistoPlus2',
										},
										{
											vinistoPlus: (
												<strong>
													{t({
														id: 'userSection.vinistoPlus.member.endedDateInfo.vinistoPlus',
													})}
												</strong>
											),
										}
									)}
								</Link>
							),
						}
					)}
				</p>
			)}

			{!nonInactiveSubscription && !inactiveSubscription && (
				<p className={styles.infoText}>
					{t(
						{
							id: 'userSection.vinistoplus.becomeMember.info',
						},
						{
							vinistoplus: (
								<span
									className="fw-bolder"
									key="vinistoPlus"
								>
									{t({
										id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
									})}
								</span>
							),

							benefits: (
								<Link
									href={'/vinistoplus'}
									className={styles.greenText}
									key="benefits"
								>
									{t(
										{
											id: 'userSection.vinistoplus.becomeMember.info.benefits',
										},
										{
											vinistoplus: (
												<span
													className={styles.greenVinistoPlus}
													key="vinistoPlus2"
												>
													{t({
														id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
													})}
												</span>
											),
										}
									)}
								</Link>
							),
						}
					)}
				</p>
			)}

			{shouldShowVinistoPlusCards && (
				<VinistoPlusCardsHeader
					monthlySubscription={vinistoPlusQuery.data?.monthlySubscription}
					yearlySubscription={vinistoPlusQuery.data?.yearlySubscription}
					isLoading={vinistoPlusQuery.isLoading}
					shouldShowVinistoPlusCards={shouldShowVinistoPlusCards}
					inactiveSubscriptions={inactiveSubscriptions}
				/>
			)}

			{vinistoPlusDeliveries.data && (
				<section>
					<h3 className={styles.header}>
						{shouldShowVinistoPlusCards
							? t({ id: 'userSection.vinistoplus.delivery.title' })
							: t(
									{ id: 'userSection.vinistoplus.delivery.title.bought' },
									{
										subscriptionState: (
											<span
												className={cx(
													styles.greenText,
													styles.subscriptionType
												)}
												key={'SubscriptionState.Active'}
											>
												{t({ id: 'vinistoPlus.state.Active' })}
											</span>
										),
									}
							  )}
					</h3>
					<p className={styles.info}>
						{t(
							{
								id: shouldShowVinistoPlusCards
									? 'userSection.vinistoplus.delivery.benefits'
									: 'userSection.vinistoplus.delivery.benefits.bought',
							},
							{
								subscriptionName: (
									<strong key="subscriptionName">
										{t({
											id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
										})}
									</strong>
								),
								benefit: (
									<strong key="benefit">
										{t({
											id: 'userSection.vinistoplus.delivery.freeAccusative',
										})}
									</strong>
								),
							}
						)}
					</p>
					<div className={styles.deliveryCards}>
						{vinistoPlusDeliveries.data?.map((delivery) => (
							<DeliveryCard
								delivery={delivery}
								key={delivery.id}
							/>
						))}
					</div>
				</section>
			)}

			{nonInactiveSubscription && nonInactiveSubscription?.card && (
				<section>
					<h2 className={styles.header}>
						{t({ id: 'userSection.vinistoplus.paymentInfo.title' })}
					</h2>
					<PaymentCard cardData={nonInactiveSubscription.card}></PaymentCard>
				</section>
			)}

			{(userSubscriptionsQuery.data?.subscriptions ?? []).length > 0 && (
				<section>
					<h2 className={styles.header}>
						{t({ id: 'userSection.vinistoplus.billing.title' })}
					</h2>
					<Billings
						subscriptions={
							userSubscriptionsQuery.data?.subscriptions?.map((sub) => sub) ??
							[]
						}
					/>
				</section>
			)}
			{!!nonInactiveSubscription &&
				!nonInactiveSubscription.isRenewDisabled && (
					<section>
						<h2 className={styles.header}>
							{t({ id: 'userSection.vinistoplus.info' })}
						</h2>
						<Button
							className={styles.cancelButton}
							onClick={() => cancelModalRef.current?.open()}
						>
							{t({ id: 'userSection.vinistoplus.cancel' })}
						</Button>
						<CancelSubscriptionModal
							ref={cancelModalRef}
							subscriptionToCancel={nonInactiveSubscription}
							refetchSubscriptions={userSubscriptionsQuery.refetch}
						/>
					</section>
				)}
		</>
	);
};

export default VinistoPlus;
