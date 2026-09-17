'use client';

import { lazy, Suspense, useContext, useMemo } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';
import Link from 'next/link';
import { AddressesApiHooks } from 'Services/Addresses/hooks';
import { UserAvatar } from 'Components/Avatar';
import { VinistoAuthDllModelsApiAddressAddress } from 'vinisto_api_client/src/api-types/user-api';
import { useIsClient } from '@uidotdev/usehooks';
import useGetUserSubscriptions from 'Hooks/useGetUserSubscriptions';

import styles from './styles.module.css';

import {
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';

const LogoutIcon = lazy(() => import('Components/Icons/Logout'));

const UserHeader = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOnLogOut, vinistoUser, isLoggedIn } = useContext(
		AuthenticationContext
	);
	const addressesData = AddressesApiHooks.useGetAll();

	const address: VinistoAuthDllModelsApiAddressAddress | undefined = useMemo(
		() =>
			!addressesData.isFetching
				? addressesData.data?.addresses?.[0]
				: undefined,
		[addressesData]
	);

	const isClient = useIsClient();

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

	const name = address && address.name + ' ' + address.surname;

	return isClient && isLoggedIn ? (
		<div className={styles.userHeaderWrap}>
			<Link
				href={`/${t({ id: 'routes.user-section.route' })}`}
				className={styles.userGrid}
			>
				<div className={styles.nickname}>
					<UserAvatar
						size="md"
						fw="light"
						hasActiveVinistoPlus={!!nonInactiveSubscription}
					/>
				</div>
				<div className={styles.name}>{name}</div>
				<div className={styles.email}>{vinistoUser.email ?? ''}</div>
			</Link>
			<button onClick={() => handleOnLogOut()}>
				<Suspense fallback={<Loader blank />}>
					<LogoutIcon
						title={t({ id: 'navbar.actionButton.logOut' })}
						alt={t({ id: 'navbar.actionButton.logOut' })}
						className={styles.logOutIcon}
					/>
				</Suspense>
			</button>
		</div>
	) : null;
};

export default UserHeader;
