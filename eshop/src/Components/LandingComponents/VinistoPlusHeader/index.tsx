'use client';

import { VinistoPlusCards } from 'vinisto_ui';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { LOGIN_MODAL, QUICK_PURCHASE_MODAL } from 'Components/Modal/constants';
import useGetSubscriptionAddons from 'Hooks/useGetSubscriptionAddons';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useGetUserSubscriptions from 'Hooks/useGetUserSubscriptions';

import styles from './styles.module.css';

import { AddonResponse } from '@/api-types/addons-api';
import {
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';

const VinistoPlusHeader = () => {
	const modalContext = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isLoggedIn, vinistoUser } = useContext(AuthenticationContext);
	const userId = vinistoUser?.id;

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

	const handleAuth = (subscription: AddonResponse | undefined) =>
		setTimeout(
			() =>
				modalContext.handleOpenModal(QUICK_PURCHASE_MODAL, {
					subscription,
				}),
			200
		);

	return (
		<VinistoPlusCards
			monthlySubscription={vinistoPlusQuery.data?.monthlySubscription}
			yearlySubscription={vinistoPlusQuery.data?.yearlySubscription}
			translations={{
				youSave: t({ id: 'vinistoPlus.header.youSave' }),
				withoutVat: t({ id: 'vinistoPlus.header.withoutVat' }),
				totalYearlyPrice: t({
					id: 'vinistoPlus.header.totalYearlyPrice',
				}),
				monthly: t({ id: 'vinistoPlus.header.monthly' }),
				active: t({ id: 'vinistoPlus.state.Active' }),
				activate: t({ id: 'vinistoPlus.header.activate' }),
				renew: t({ id: 'vinistoPlus.header.renew' }),
			}}
			onActivateClick={() => (subscription) => {
				if (isLoggedIn) {
					return modalContext.handleOpenModal(QUICK_PURCHASE_MODAL, {
						subscription,
					});
				}
				return modalContext.handleOpenModal(LOGIN_MODAL, {
					onLogin: () => handleAuth(subscription),
					onRegister: () => handleAuth(subscription),
				});
			}}
			isLoading={
				vinistoPlusQuery.isLoading ||
				!!(userId && userSubscriptionsQuery.isLoading)
			}
			nonInactiveSubscription={nonInactiveSubscription}
			subscriptionsClassName={styles.landingSubscriptions}
		/>
	);
};

export default VinistoPlusHeader;
