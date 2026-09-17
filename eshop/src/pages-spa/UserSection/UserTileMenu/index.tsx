'use client';

import { useContext } from 'react';
import cx from 'classnames';
import { UserSectionLink } from 'pages-spa/UserSection/interfaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useUserSectionLinks from 'pages-spa/UserSection/hooks';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { useIsClient } from '@uidotdev/usehooks';
import useGetUserSubscriptions from 'Hooks/useGetUserSubscriptions';

import styles from './styles.module.css';

import {
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';

const UserTileMenu = () => {
	const { isLoggedIn, vinistoUser } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const pathname = usePathname();

	const userSection = `${t({ id: 'routes.user-section.route' })}`;
	const pathnameWithoutUserSection = pathname.substring(
		pathname.lastIndexOf(userSection) + userSection.length + 1
	);

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

	const isClient = useIsClient();
	const links: UserSectionLink[] = useUserSectionLinks(
		isClient && isLoggedIn,
		!!nonInactiveSubscription
	);

	return (
		<div className={styles.userTileMenuWrap}>
			{links.map((link, index) => (
				<Link
					href={`/${userSection}/` + (link.route || '')}
					key={'ustileli' + index}
					className={cx(styles.userTileMenuLink, {
						[styles.clubCoupons]: link.flags?.includes('clubCoupons'),
						[styles.active]:
							pathnameWithoutUserSection == (link.route ?? '') ||
							(pathnameWithoutUserSection === '' && index === 0),
						[styles.highlighted]: link.highlighted,
					})}
				>
					{link.icon ?? null}
					{link.name ?? ''}
				</Link>
			))}
		</div>
	);
};

export default UserTileMenu;
